import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { AtcApplication } from "@/models/AtcApplication";
import { AtcUser } from "@/models/AtcUser";
import { cookies } from "next/headers";
import { resolveAffiliationFeeForPersist } from "@/lib/affiliationFee";
import { isValidIsoDate, normalizeIsoDate } from "@/lib/isoDate";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function verifyAdmin(request: Request) {
  const cookieStore = await cookies();
  let token = cookieStore.get("admin_token")?.value ?? "";
  if (!token) {
    const auth = request.headers.get("Authorization") ?? "";
    token = auth.replace("Bearer ", "");
  }
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
    return decoded.role === "admin" ? decoded : null;
  } catch {
    return null;
  }
}

// GET /api/admin/applications/[id] — fetch full application details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  await connectDB();

  const application = await AtcApplication.findById(id).lean();
  if (!application) {
    return NextResponse.json({ message: "Application not found." }, { status: 404 });
  }

  // Find associated user for tpCode and userStatus
  const user = await AtcUser.findOne({ applicationId: id }).lean();
  
  const enrichedApp = {
    ...application,
    tpCode: application.tpCode || user?.tpCode || null,
    userStatus: user?.status || "active",
  };

  return NextResponse.json({ application: enrichedApp });
}

// PATCH /api/admin/applications/[id] — approve or reject or edit
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await verifyAdmin(request);
    if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    const { id } = await params;
    await connectDB();

    const contentType = request.headers.get("content-type") ?? "";
    let action: "approve" | "reject" | "toggleStatus" | null = null;
    let formData: FormData | null = null;
    let body: {
      action?: "approve" | "reject" | "toggleStatus";
      update?: Record<string, unknown>;
    } | null = null;

    if (contentType.includes("multipart/form-data")) {
      formData = await request.formData();
      const maybeAction = String(formData.get("action") ?? "").trim();
      if (maybeAction === "approve" || maybeAction === "reject" || maybeAction === "toggleStatus") {
        action = maybeAction;
      }
    } else {
      body = (await request.json()) as {
        action?: "approve" | "reject" | "toggleStatus";
        update?: Record<string, unknown>;
      };
      action = body.action ?? null;
    }

    // Handle Edit/Update via FormData (AdminAtcForm uses this)
    if (!action && formData) {
      const application = await AtcApplication.findById(id);
      if (!application) {
        return NextResponse.json({ message: "Application not found." }, { status: 404 });
      }

      const defaultFallbacks: Record<string, string> = {
        affiliationYear: "1",
        trainingPartnerName: "Not Provided",
        trainingPartnerAddress: "Not Provided",
        district: "Not Provided",
        state: "Delhi",
        pin: "110001",
        mobile: "0000000000",
        email: `atc-admin-${Date.now()}@example.com`,
        statusOfInstitution: "Trust",
        yearOfEstablishment: "2024",
        chiefName: "Not Provided",
        designation: "Director",
        educationQualification: "Not Provided",
        professionalExperience: "Not Provided",
        dob: "1990-01-01",
        paymentMode: "offline",
      };

      for (const field of Object.keys(defaultFallbacks)) {
        const val = String(formData.get(field) ?? "").trim();
        if (!val) {
          formData.set(field, defaultFallbacks[field]);
        }
      }

      const mobile = String(formData.get("mobile") ?? "");
      const pin = String(formData.get("pin") ?? "");
      const email = String(formData.get("email") ?? "").toLowerCase().trim();

      if (!/^\d{10}$/.test(mobile)) {
        return NextResponse.json({ message: "Mobile number must be 10 digits." }, { status: 400 });
      }
      if (!/^\d{6}$/.test(pin)) {
        return NextResponse.json({ message: "PIN must be 6 digits." }, { status: 400 });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
      }

      const dobNormalized = normalizeIsoDate(formData.get("dob"));
      if (!isValidIsoDate(dobNormalized)) {
        return NextResponse.json(
          { message: "Date of birth must be a valid date (YYYY-MM-DD, year exactly 4 digits)." },
          { status: 400 },
        );
      }

      const feeResolved = await resolveAffiliationFeeForPersist(
        formData.get("zones"),
        formData.get("affiliationYear"),
      );
      if (!feeResolved.ok) {
        return NextResponse.json({ message: feeResolved.error }, { status: feeResolved.status });
      }

      const infraString = String(formData.get("infrastructure") ?? application.infrastructure ?? "{}");
      
      // Helper to read and check size
      const toBase64 = async (name: string, maxSizeKB: number) => {
        const file = formData.get(name) as File | null;
        if (!file || file.size === 0) return "";
        if (file.size > maxSizeKB * 1024) {
          throw new Error(`${name} exceeds ${maxSizeKB}KB limit.`);
        }
        const buffer = await file.arrayBuffer();
        return `data:${file.type};base64,${Buffer.from(buffer).toString("base64")}`;
      };

      try {
        const photoBase64 = await toBase64("photo", 100);
        const ssBase64 = await toBase64("paymentScreenshot", 100);
        const docBase64 = await toBase64("instituteDocument", 500);
        const logoBase64 = await toBase64("logo", 100);
        const sigBase64 = await toBase64("signature", 100);
        const aadharBase64 = await toBase64("aadharDoc", 500);
        const marksheetBase64 = await toBase64("marksheetDoc", 500);
        const otherBase64 = await toBase64("otherDocs", 500);

        application.photo = photoBase64 || application.photo;
        application.logo = logoBase64 || application.logo;
        application.signature = sigBase64 || application.signature;
        application.aadharDoc = aadharBase64 || application.aadharDoc;
        application.marksheetDoc = marksheetBase64 || application.marksheetDoc;
        application.otherDocs = otherBase64 || application.otherDocs;
        application.paymentScreenshot = ssBase64 || application.paymentScreenshot;
        application.instituteDocument = docBase64 || application.instituteDocument;
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Invalid request.";
        return NextResponse.json({ message }, { status: 400 });
      }

      application.processFee = feeResolved.processFee;
      application.affiliationPlanYear = feeResolved.affiliationPlanYear;
      application.feeCalculation = feeResolved.feeCalculation;
      application.trainingPartnerName = String(formData.get("trainingPartnerName") ?? "");
      application.trainingPartnerAddress = String(formData.get("trainingPartnerAddress") ?? "");
      application.postalAddressOffice = String(formData.get("postalAddressOffice") ?? application.postalAddressOffice ?? "");
      application.zones = feeResolved.zones;
      application.totalName = String(formData.get("totalName") ?? application.totalName ?? "");
      application.district = String(formData.get("district") ?? "");
      application.state = String(formData.get("state") ?? "");
      application.pin = pin;
      application.country = String(formData.get("country") ?? application.country ?? "INDIA");
      application.mobile = mobile;
      application.email = email;
      application.statusOfInstitution = String(formData.get("statusOfInstitution") ?? "");
      application.yearOfEstablishment = String(formData.get("yearOfEstablishment") ?? "");
      application.chiefName = String(formData.get("chiefName") ?? "");
      application.designation = String(formData.get("designation") ?? "");
      application.educationQualification = String(formData.get("educationQualification") ?? "");
      application.professionalExperience = String(formData.get("professionalExperience") ?? "");
      application.dob = dobNormalized;
      application.paymentMode = String(formData.get("paymentMode") ?? "");
      application.infrastructure = infraString;
      application.paidAmount = String(formData.get("paidAmount") ?? application.paidAmount ?? "");
      application.transactionNo = String(formData.get("transactionNo") ?? application.transactionNo ?? "");
      application.city = String(formData.get("city") ?? application.city ?? "");
      application.postOffice = String(formData.get("postOffice") ?? application.postOffice ?? "");
      application.classRoom = String(formData.get("classRoom") ?? application.classRoom ?? "");
      application.officeRoom = String(formData.get("officeRoom") ?? application.officeRoom ?? "");
      application.institutePhone = String(formData.get("institutePhone") ?? application.institutePhone ?? "");
      application.instituteStd = String(formData.get("instituteStd") ?? application.instituteStd ?? "");
      application.instituteCell = String(formData.get("instituteCell") ?? application.instituteCell ?? "");
      application.website = String(formData.get("website") ?? application.website ?? "");
      application.directorAddress = String(formData.get("directorAddress") ?? application.directorAddress ?? "");
      application.directorCity = String(formData.get("directorCity") ?? application.directorCity ?? "");
      application.directorPostOffice = String(formData.get("directorPostOffice") ?? application.directorPostOffice ?? "");
      application.directorPinCode = String(formData.get("directorPinCode") ?? application.directorPinCode ?? "");
      application.directorDistrict = String(formData.get("directorDistrict") ?? application.directorDistrict ?? "");
      application.directorState = String(formData.get("directorState") ?? application.directorState ?? "");
      application.directorCountry = String(formData.get("directorCountry") ?? application.directorCountry ?? "");
      application.directorPhone = String(formData.get("directorPhone") ?? application.directorPhone ?? "");
      application.directorStd = String(formData.get("directorStd") ?? application.directorStd ?? "");
      application.directorCell = String(formData.get("directorCell") ?? application.directorCell ?? "");
      application.govPresident = String(formData.get("govPresident") ?? application.govPresident ?? "");
      application.govVicePresident = String(formData.get("govVicePresident") ?? application.govVicePresident ?? "");
      application.govSecretary = String(formData.get("govSecretary") ?? application.govSecretary ?? "");
      application.govAssistantSecretary = String(formData.get("govAssistantSecretary") ?? application.govAssistantSecretary ?? "");
      application.govTreasurer = String(formData.get("govTreasurer") ?? application.govTreasurer ?? "");
      application.govMember1 = String(formData.get("govMember1") ?? application.govMember1 ?? "");
      application.govMember2 = String(formData.get("govMember2") ?? application.govMember2 ?? "");
      application.applicationDate = String(formData.get("applicationDate") ?? application.applicationDate ?? "");

      await application.save();

      // Sync with AtcUser
      const user = await AtcUser.findOne({ applicationId: application._id });
      if (user) {
        user.trainingPartnerName = application.trainingPartnerName;
        user.mobile = application.mobile;
        user.email = application.email;
        user.zones = application.zones;
        
        const newPass = String(formData.get("password") || formData.get("customPassword") || "").trim();
        if (newPass) {
          user.password = await bcrypt.hash(newPass, 10);
        }
        
        await user.save();
      }

      return NextResponse.json({ message: "Application updated successfully.", application });
    }

    if (action === "toggleStatus") {
      const user = await AtcUser.findOne({ applicationId: id });
      if (!user) return NextResponse.json({ message: "Center account not found." }, { status: 404 });
      user.status = user.status === "active" ? "disabled" : "active";
      await user.save();
      return NextResponse.json({ 
        message: `Center ${user.status === "active" ? "enabled" : "disabled"} successfully.`, 
        status: user.status 
      });
    }

    const application = await AtcApplication.findById(id);
    if (!application) return NextResponse.json({ message: "Application not found." }, { status: 404 });

    if (action === "reject") {
      application.status = "rejected";
      await application.save();
      return NextResponse.json({ message: "Application rejected." });
    }

    if (action === "approve") {
      if (application.status !== "pending") {
        return NextResponse.json({ message: "Application is already processed." }, { status: 400 });
      }
      application.status = "approved";

      const existingUser = await AtcUser.findOne({ email: application.email });
      let tpCode = application.tpCode;

      if (!existingUser) {
        const { generateNextId } = await import("@/lib/idGenerator");
        tpCode = await generateNextId("reg_format_center");

        await AtcUser.create({
          tpCode,
          trainingPartnerName: application.trainingPartnerName,
          email: application.email,
          mobile: application.mobile,
          password: await bcrypt.hash(application.mobile, 10),
          applicationId: application._id,
          zones: application.zones,
          status: "active",
        });
      } else {
        tpCode = existingUser.tpCode;
      }

      application.tpCode = tpCode;
      await application.save();

      return NextResponse.json({ message: "Application approved.", tpCode, defaultPassword: application.mobile });
    }

    return NextResponse.json({ message: "Invalid action." }, { status: 400 });

  } catch (error: unknown) {
    console.error("[ATC PATCH Error]", error);
    const message = error instanceof Error ? error.message : "Internal server error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// DELETE /api/admin/applications/[id] — delete an application
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  await connectDB();

  await AtcUser.deleteMany({ applicationId: id });
  await AtcApplication.findByIdAndDelete(id);
  return NextResponse.json({ message: "Application deleted." });
}
