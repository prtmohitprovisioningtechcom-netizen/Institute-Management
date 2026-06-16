/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AtcStudent } from "@/models/Student";
import { AtcUser } from "@/models/AtcUser";
import { AtcApplication } from "@/models/AtcApplication";
import { Course } from "@/models/Course";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

const normalizeIsoDate = (raw: unknown): string => {
  const cleaned = String(raw ?? "")
    .trim()
    .replace(/[^\d-]/g, "");
  const parts = cleaned.split("-");
  const year = (parts[0] || "").slice(0, 4);
  const month = (parts[1] || "").slice(0, 2);
  const day = (parts[2] || "").slice(0, 2);
  return [year, month, day].filter(Boolean).join("-");
};

const isValidIsoDate = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;
  return date.toISOString().slice(0, 10) === value;
};

const computeAgeFromDob = (dob: string): string => {
  const birth = new Date(`${dob}T00:00:00Z`);
  if (Number.isNaN(birth.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age > 0 ? String(age) : "";
};

const currentSession = (): string => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const startYear = month >= 3 ? year : year - 1;
  const endYear = startYear + 1;
  return `${startYear}-${String(endYear).slice(-2)}`;
};

const toBase64 = async (file: any) => {
  try {
    if (!file || typeof file === "string") return file || "";
    if (!file.size || file.size === 0) return "";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:${file.type || "application/octet-stream"};base64,${buffer.toString("base64")}`;
  } catch (e: any) {
    console.error("toBase64 conversion fail:", e.message);
    return "";
  }
};

async function resolveAtc(centerCode: string) {
  let atc = centerCode ? await AtcUser.findOne({ tpCode: centerCode }) : null;

  if (!atc) {
    atc = await AtcUser.findOne({ status: "active" }).sort({ createdAt: 1 });
  }

  if (!atc && centerCode) {
    const app = await AtcApplication.findOne({ tpCode: centerCode, status: "approved" });
    if (app) {
      atc = await AtcUser.create({
        tpCode: app.tpCode,
        trainingPartnerName: app.trainingPartnerName,
        email: String(app.email || "").toLowerCase().trim(),
        mobile: app.mobile || "0000000000",
        password: await bcrypt.hash(app.mobile || "0000000000", 10),
        applicationId: app._id,
        zones: (app as any).zones || [],
        status: "active",
      });
    }
  }

  return atc;
}

async function handleRegistrationSubmit(request: Request) {
  try {
    const formData = await request.formData();

    const requiredFields = [
      "name",
      "fatherName",
      "motherName",
      "dob",
      "education",
      "address",
      "mobile",
      "course",
      "courseDuration",
      "caste",
      "residence",
      "declarationAccepted",
    ];

    for (const field of requiredFields) {
      const value = String(formData.get(field) ?? "").trim();
      if (!value) {
        return NextResponse.json({ message: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (formData.get("declarationAccepted") !== "true") {
      return NextResponse.json({ message: "Please accept the declaration to proceed." }, { status: 400 });
    }

    const mobile = String(formData.get("mobile") ?? "").replace(/\D/g, "").slice(0, 10);
    const mobile2 = String(formData.get("mobile2") ?? "").replace(/\D/g, "").slice(0, 10);
    const aadharNo = String(formData.get("aadharNo") ?? "").replace(/\D/g, "").slice(0, 12);
    const centerCode = String(formData.get("centerCode") ?? "").trim();
    const dob = normalizeIsoDate(formData.get("dob"));
    const registrationDate = normalizeIsoDate(
      formData.get("registrationDate") || new Date().toISOString().split("T")[0],
    );

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json({ message: "Mob. No. 1 must be exactly 10 digits." }, { status: 400 });
    }
    if (mobile2 && !/^\d{10}$/.test(mobile2)) {
      return NextResponse.json({ message: "Mob. No. 2 must be exactly 10 digits." }, { status: 400 });
    }
    if (aadharNo && !/^\d{12}$/.test(aadharNo)) {
      return NextResponse.json({ message: "Aadhar No. must be exactly 12 digits." }, { status: 400 });
    }
    if (!isValidIsoDate(dob)) {
      return NextResponse.json({ message: "Date of birth must be a valid date." }, { status: 400 });
    }
    if (!isValidIsoDate(registrationDate)) {
      return NextResponse.json({ message: "Registration date must be a valid date." }, { status: 400 });
    }

    await connectDB();

    const atc = await resolveAtc(centerCode);
    if (!atc) {
      return NextResponse.json(
        { message: "No active study center is available. Please contact the institute." },
        { status: 400 },
      );
    }

    const courseName = String(formData.get("course")).trim();
    const courseDoc = await Course.findOne({ name: courseName, status: "active" }).lean();
    const ageInput = String(formData.get("age") ?? "").trim();
    const computedAge = ageInput || computeAgeFromDob(dob);
    const address = String(formData.get("address")).trim();
    const name = String(formData.get("name")).trim();

    const photo = await toBase64(formData.get("photo"));
    const studentSignature = await toBase64(formData.get("studentSignature"));

    const studentData: any = {
      atcId: atc._id,
      tpCode: atc.tpCode,
      name,
      fatherName: String(formData.get("fatherName")).trim(),
      husbandName: String(formData.get("husbandName") || "").trim(),
      motherName: String(formData.get("motherName")).trim(),
      dob,
      age: computedAge,
      gender: "Not Specified",
      mobile,
      parentsMobile: mobile2,
      email: "",
      currentAddress: address,
      permanentAddress: address,
      education: String(formData.get("education")).trim(),
      highestQualification: String(formData.get("education")).trim(),
      course: courseName,
      courseId: courseDoc?._id,
      courseDuration: String(formData.get("courseDuration")).trim(),
      aadharNo,
      caste: String(formData.get("caste")).trim(),
      residence: String(formData.get("residence")).trim(),
      declarationName: String(formData.get("declarationName") || name).trim(),
      declarationAge: String(formData.get("declarationAge") || computedAge).trim(),
      declarationCourse: String(formData.get("declarationCourse") || courseName).trim(),
      category: String(formData.get("caste") || "General").trim(),
      nationality: "Indian",
      session: currentSession(),
      examMode: "online",
      admissionDate: registrationDate,
      enrollmentNo: `REG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      password: mobile,
      status: "pending_atc",
      isDirectAdmission: true,
      admissionFees: "0",
      totalFee: courseDoc?.courseFee ?? 0,
      paidAmount: 0,
      duesAmount: courseDoc?.courseFee ?? 0,
      disability: false,
    };

    const mediaToSave = [
      { name: "photo", content: photo },
      { name: "studentSignature", content: studentSignature },
    ];

    const student = await AtcStudent.create(studentData);

    const { StudentMedia } = await import("@/models/StudentMedia");
    for (const m of mediaToSave) {
      if (m.content && String(m.content).startsWith("data:")) {
        await StudentMedia.findOneAndUpdate(
          { studentId: student._id, fieldName: m.name },
          { content: m.content },
          { upsert: true },
        );
      }
    }

    return NextResponse.json({
      message:
        "Registration form submitted successfully! Your Study Center will review your details soon.",
      success: true,
      enrollmentNo: student.enrollmentNo,
    });
  } catch (error: any) {
    console.error("Registration Process Error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return handleRegistrationSubmit(request);
}
