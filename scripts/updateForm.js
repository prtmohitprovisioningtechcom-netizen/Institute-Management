const fs = require('fs');

let content = fs.readFileSync('src/components/affiliation/BecomeAtcForm.tsx', 'utf8');

const newFormState = `type FormState = {
  affiliationYear: string; trainingPartnerName: string; trainingPartnerAddress: string;
  postalAddressOffice: string; zones: string[];
  totalName: string; district: string; state: string; pin: string; country: string;
  mobile: string; email: string; statusOfInstitution: string; yearOfEstablishment: string;
  chiefName: string; designation: string; educationQualification: string;
  professionalExperience: string; dob: string; aadharNo: string; paymentMode: string;
  paidAmount: string; transactionNo: string;
  city: string; postOffice: string; classRoom: string; officeRoom: string;
  institutePhone: string; instituteStd: string; instituteCell: string; website: string;
  directorAddress: string; directorCity: string; directorPostOffice: string;
  directorPinCode: string; directorDistrict: string; directorState: string;
  directorCountry: string; directorPhone: string; directorStd: string; directorCell: string;
  govPresident: string; govVicePresident: string; govSecretary: string;
  govAssistantSecretary: string; govTreasurer: string; govMember1: string; govMember2: string;
  applicationDate: string;
};

const initialFormState: FormState = {
  affiliationYear: "", trainingPartnerName: "", trainingPartnerAddress: "", postalAddressOffice: "", zones: [],
  totalName: "", district: "", state: "", pin: "", country: "INDIA", mobile: "", email: "",
  statusOfInstitution: "Trust", yearOfEstablishment: "2024", chiefName: "", designation: "Director",
  educationQualification: "", professionalExperience: "", dob: "1990-01-01", aadharNo: "000000000000", paymentMode: "gpay",
  paidAmount: "", transactionNo: "",
  city: "", postOffice: "", classRoom: "", officeRoom: "", institutePhone: "", instituteStd: "", instituteCell: "", website: "",
  directorAddress: "", directorCity: "", directorPostOffice: "", directorPinCode: "", directorDistrict: "", directorState: "",
  directorCountry: "INDIA", directorPhone: "", directorStd: "", directorCell: "",
  govPresident: "", govVicePresident: "", govSecretary: "", govAssistantSecretary: "", govTreasurer: "", govMember1: "", govMember2: "",
  applicationDate: "",
};`;

content = content.replace(/type FormState = \{[\s\S]*?\};\n\nconst initialFormState: FormState = \{[\s\S]*?\};/m, newFormState);

const renderMatch = content.indexOf('return (\n    <div className="mx-auto w-full max-w-5xl">');
if (renderMatch !== -1) {
  const newRender = `return (
    <div className="mx-auto w-full max-w-4xl p-2 sm:p-4 font-sans text-xs sm:text-sm">
      
      {/* HEADER SECTION (Matching image) */}
      <div className="border-2 border-black p-4 mb-6 flex items-start gap-4 bg-white relative">
        <div className="w-24 h-24 shrink-0 flex items-center justify-center border border-slate-200 p-1">
           {/* Replace with actual logo if needed */}
           <div className="w-full h-full rounded-full border-2 border-blue-800 flex items-center justify-center text-center text-[8px] font-bold text-blue-900 leading-tight p-2">
             SUNIL GROUP OF EDUCATION<br/>FASHION AND<br/>TECHNOLOGY TRUST
           </div>
        </div>
        
        <div className="flex-1 text-center space-y-1">
          <div className="inline-block bg-red-600 text-white font-bold px-2 py-0.5 text-sm sm:text-base border border-black">
            SUNIL GROUP OF EDUCATION FASHION AND TECHNOLOGY TRUST
          </div>
          <p className="text-[10px] sm:text-xs">
            REGD BY-NCT GOVT.OF DELHI, MSME, NITI AAYOG, MCA GOVT. OF INDIA<br/>
            AN ISO-9001-2015 CERTIFIED INSTITUTE<br/>
            HQ - SHUHASH BIHAR DELHI, RO ARYA NAGAR, FIROZABAD, U.P
          </p>
          <p className="text-[10px] sm:text-xs text-blue-700 underline">
            EMAIL-goodlucksunil212@gmail.com
          </p>
          <p className="text-[10px] sm:text-xs text-green-700 font-bold">
            MOB. 9258410701, WEBSITE: sgeftskillindia.com
          </p>
          <div className="mt-2 inline-block bg-red-600 text-white font-bold px-4 py-1 text-lg border border-black">
            AFFILIATION FORM
          </div>
          <p className="text-xs font-bold mt-1">Please fill in Block letter</p>
        </div>
        
        <div className="w-28 shrink-0 flex flex-col">
          <label className="border-2 border-black w-full h-32 flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden bg-white">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={URL.createObjectURL(photo)} alt="Photo" className="w-full h-full object-cover" />
            ) : (
              <span className="font-bold text-black tracking-widest text-sm">PHOTO</span>
            )}
            <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
          </label>
        </div>
      </div>

      <form onSubmit={onSubmit} onReset={onReset} className="space-y-0 border-2 border-black bg-white">
        
        {/* ROW: INSTITUTE NAME */}
        <div className="flex border-b border-black">
          <div className="w-40 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">
            INSTITUTE NAME
          </div>
          <div className="flex-1 bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase font-bold" value={form.trainingPartnerName} onChange={e => setField('trainingPartnerName', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* SECTION: INSTITUTE'S OFFICE ADDRESS */}
        <div className="bg-red-600 text-white text-center font-bold py-1 border-b border-black text-sm uppercase tracking-wider">
          INSTITUTE'S OFFICE ADDRESS
        </div>

        {/* FULL ADDRESS */}
        <div className="flex border-b border-black">
          <div className="w-32 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">FULL ADDRESS</div>
          <div className="flex-1 bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.trainingPartnerAddress} onChange={e => setField('trainingPartnerAddress', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* CITY & POST OFFICE */}
        <div className="flex border-b border-black">
          <div className="w-16 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">CITY</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.city} onChange={e => setField('city', e.target.value.toUpperCase())} />
          </div>
          <div className="w-24 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">POST OFFICE</div>
          <div className="flex-[2] bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.postOffice} onChange={e => setField('postOffice', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* PIN CODE & DISTRICT */}
        <div className="flex border-b border-black">
          <div className="w-24 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">PIN CODE</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.pin} onChange={e => setField('pin', e.target.value.toUpperCase())} />
          </div>
          <div className="w-24 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">DISTRICT</div>
          <div className="flex-[2] bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.district} onChange={e => setField('district', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* STATE & COUNTRY */}
        <div className="flex border-b border-black">
          <div className="w-16 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">STATE</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.state} onChange={e => setField('state', e.target.value.toUpperCase())} />
          </div>
          <div className="w-24 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">COUNTRY</div>
          <div className="flex-[2] bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.country} onChange={e => setField('country', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* CLASS ROOM, OFFICE ROOM, PHONE, STD */}
        <div className="flex border-b border-black">
          <div className="w-24 shrink-0 border-r border-black p-1 font-bold text-[10px] flex items-center">CLASS ROOM</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-1 bg-transparent outline-none uppercase" value={form.classRoom} onChange={e => setField('classRoom', e.target.value.toUpperCase())} />
          </div>
          <div className="w-24 shrink-0 border-r border-black p-1 font-bold text-[10px] flex items-center justify-center">OFFICE ROOM</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-1 bg-transparent outline-none uppercase" value={form.officeRoom} onChange={e => setField('officeRoom', e.target.value.toUpperCase())} />
          </div>
          <div className="w-16 shrink-0 border-r border-black p-1 font-bold text-[10px] flex items-center justify-center">PHONE</div>
          <div className="flex-[1.5] bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-1 bg-transparent outline-none uppercase" value={form.institutePhone} onChange={e => setField('institutePhone', e.target.value.toUpperCase())} />
          </div>
          <div className="w-12 shrink-0 border-r border-black p-1 font-bold text-[10px] flex items-center justify-center">STD</div>
          <div className="flex-1 bg-[#fffbe6]">
            <input className="w-full h-full px-1 bg-transparent outline-none uppercase" value={form.instituteStd} onChange={e => setField('instituteStd', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* CELL, E-MAIL, Website */}
        <div className="flex border-b border-black">
          <div className="w-16 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">CELL</div>
          <div className="flex-[1.5] bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.mobile} onChange={e => setField('mobile', e.target.value.toUpperCase())} />
          </div>
          <div className="w-16 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">E-MAIL</div>
          <div className="flex-[2] bg-[#fffbe6] border-r border-black">
            <input type="email" className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.email} onChange={e => setField('email', e.target.value.toUpperCase())} />
          </div>
          <div className="w-20 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">Website</div>
          <div className="flex-[2] bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none" value={form.website} onChange={e => setField('website', e.target.value)} />
          </div>
        </div>


        {/* SECTION: DIRECTOR'S NAME & ADDRESS */}
        <div className="bg-red-600 text-white text-center font-bold py-1 border-b border-black text-sm uppercase tracking-wider">
          DIRECTOR'S NAME & ADDRESS
        </div>

        {/* DIRECTOR'S NAME */}
        <div className="flex border-b border-black">
          <div className="w-36 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">DIRECTOR'S NAME</div>
          <div className="flex-1 bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.chiefName} onChange={e => setField('chiefName', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* QUALIFICATION */}
        <div className="flex border-b border-black">
          <div className="w-36 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">QUALIFICATION</div>
          <div className="flex-1 bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.educationQualification} onChange={e => setField('educationQualification', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* OCCUPATION */}
        <div className="flex border-b border-black">
          <div className="w-36 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">OCCUPATION</div>
          <div className="flex-1 bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.professionalExperience} onChange={e => setField('professionalExperience', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* FULL ADDRESS */}
        <div className="flex border-b border-black">
          <div className="w-36 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">FULL ADDRESS</div>
          <div className="flex-1 bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorAddress} onChange={e => setField('directorAddress', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* CITY & POST OFFICE */}
        <div className="flex border-b border-black">
          <div className="w-16 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">CITY</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorCity} onChange={e => setField('directorCity', e.target.value.toUpperCase())} />
          </div>
          <div className="w-24 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">POST OFFICE</div>
          <div className="flex-[2] bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorPostOffice} onChange={e => setField('directorPostOffice', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* PIN CODE & DISTRICT */}
        <div className="flex border-b border-black">
          <div className="w-24 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">PIN CODE</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorPinCode} onChange={e => setField('directorPinCode', e.target.value.toUpperCase())} />
          </div>
          <div className="w-24 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">DISTRICT</div>
          <div className="flex-[2] bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorDistrict} onChange={e => setField('directorDistrict', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* STATE & COUNTRY */}
        <div className="flex border-b border-black">
          <div className="w-16 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">STATE</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorState} onChange={e => setField('directorState', e.target.value.toUpperCase())} />
          </div>
          <div className="w-24 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">COUNTRY</div>
          <div className="flex-[2] bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorCountry} onChange={e => setField('directorCountry', e.target.value.toUpperCase())} />
          </div>
        </div>

        {/* PHONE, STD, CELL */}
        <div className="flex border-b border-black">
          <div className="w-16 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">PHONE</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorPhone} onChange={e => setField('directorPhone', e.target.value.toUpperCase())} />
          </div>
          <div className="w-12 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">STD</div>
          <div className="flex-1 bg-[#fffbe6] border-r border-black">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorStd} onChange={e => setField('directorStd', e.target.value.toUpperCase())} />
          </div>
          <div className="w-12 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center justify-center">CELL</div>
          <div className="flex-[2] bg-[#fffbe6]">
            <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={form.directorCell} onChange={e => setField('directorCell', e.target.value.toUpperCase())} />
          </div>
        </div>


        {/* SECTION: GOVERNING BODY */}
        <div className="bg-red-600 text-white text-center font-bold py-1 border-b border-black text-sm uppercase tracking-wider">
          GOVERNING BODY (IF YES, FILL THE BLANKS)
        </div>

        {/* GOVERNING BODY MEMBERS */}
        {[
          { label: "PRESIDENT", field: "govPresident" },
          { label: "VICE-PRESIDENT", field: "govVicePresident" },
          { label: "SECRETARY", field: "govSecretary" },
          { label: "ASSISTANT SECRETARY", field: "govAssistantSecretary" },
          { label: "TREASURER", field: "govTreasurer" },
          { label: "MEMBER", field: "govMember1" },
          { label: "MEMBER", field: "govMember2" }
        ].map((item) => (
          <div className="flex border-b border-black" key={item.field}>
            <div className="w-40 shrink-0 border-r border-black p-1.5 font-bold text-[11px] flex items-center">{item.label}</div>
            <div className="flex-1 bg-[#fffbe6]">
              <input className="w-full h-full px-2 bg-transparent outline-none uppercase" value={(form as any)[item.field]} onChange={e => setField(item.field as keyof FormState, e.target.value.toUpperCase())} />
            </div>
          </div>
        ))}


        {/* SECTION: APPLY FOR */}
        <div className="bg-red-600 text-white text-center font-bold py-1 border-b border-black text-sm uppercase tracking-wider">
          APPLY FOR
        </div>

        {/* YEARS & ZONES */}
        <div className="flex py-2 px-2 border-b border-black items-center gap-4">
           <div className="font-bold text-[11px]">YEARS</div>
           <div className="w-16 h-6 border border-black bg-[#fffbe6]">
             <input className="w-full h-full px-1 text-center outline-none bg-transparent" value={form.affiliationYear} onChange={e => setField('affiliationYear', e.target.value.replace(/\\D/g, ''))} />
           </div>
           
           <div className="ml-auto flex items-center gap-2 text-[10px]">
             {zoneCatalog.length > 0 && <div className="font-bold">ZONES:</div>}
             {zoneCatalog.map(row => (
               <label key={row.name} className="flex items-center gap-1 cursor-pointer bg-slate-100 px-1 py-0.5 border">
                  <input type="checkbox" checked={form.zones.includes(row.name)} onChange={e => {
                    const next = e.target.checked ? [...form.zones, row.name] : form.zones.filter(v => v !== row.name);
                    setForm(c => ({...c, zones: next}));
                  }} />
                  {row.name}
               </label>
             ))}
           </div>
        </div>

        {/* DATE & SIGNATURE */}
        <div className="flex p-4 justify-between items-end border-b border-black pb-8">
           <div className="flex items-center gap-2">
             <span className="font-bold text-[11px]">DATE :</span>
             <input type="date" className="border border-black px-2 py-1 outline-none text-xs" value={form.applicationDate} onChange={e => setField('applicationDate', e.target.value)} />
           </div>
           
           <div className="w-48 text-center">
             <label className="block w-full h-12 border border-black mb-1 cursor-pointer bg-white relative overflow-hidden flex items-center justify-center hover:bg-slate-50">
                {signature ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={URL.createObjectURL(signature)} alt="Signature" className="h-full object-contain" />
                ) : (
                  <span className="text-[10px] text-slate-400">Upload Signature</span>
                )}
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => setSignature(e.target.files?.[0] ?? null)} />
             </label>
             <div className="text-[10px]">Signature of Applicant</div>
           </div>
        </div>

        {/* SECTION: OFFICE USE ONLY */}
        <div className="bg-red-600 text-white text-center font-bold py-1 border-b border-black text-sm uppercase tracking-wider">
          OFFICE USE ONLY
        </div>
        
        <div className="p-4 bg-pink-50 relative pointer-events-none opacity-80">
           <div className="flex items-center gap-2 mb-2">
             <span className="font-bold text-[11px] w-40">APPROVED INSTITUTE CODE</span>
             <div className="w-32 h-6 border border-black bg-[#fffbe6]"></div>
           </div>
           <div className="flex items-center gap-2 mb-4">
             <span className="font-bold text-[11px] w-40">APPROVED YEARS</span>
             <div className="w-16 h-6 border border-black bg-[#fffbe6]"></div>
           </div>
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <span className="font-bold text-[11px]">DATE :</span>
               <div className="flex gap-1">
                 <div className="w-4 h-5 border border-black bg-white"></div><div className="w-4 h-5 border border-black bg-white"></div>
                 <div className="w-4 h-5 border border-black bg-white"></div><div className="w-4 h-5 border border-black bg-white"></div>
                 <div className="w-4 h-5 border border-black bg-white"></div><div className="w-4 h-5 border border-black bg-white"></div>
                 <div className="w-4 h-5 border border-black bg-white"></div><div className="w-4 h-5 border border-black bg-white"></div>
               </div>
             </div>
             
             <div className="w-48 text-center mt-6">
               <div className="w-full border-b border-black"></div>
               <div className="text-[10px] mt-1">Signature</div>
             </div>
           </div>
        </div>
      </form>

      {/* --- INVISIBLE/BOTTOM REQUIRED FIELDS (System dependencies) --- */}
      <div className="mt-8 p-4 border-2 border-slate-300 bg-slate-50 space-y-4">
         <h3 className="font-bold text-slate-700 uppercase">Payment & System Verification (Required)</h3>
         
         <div className="flex flex-wrap gap-4 items-center">
            <label className="text-xs font-bold text-slate-700">Aadhar Card (PDF)*</label>
            <input type="file" accept="application/pdf" className="text-xs" onChange={(e) => setAadharDoc(e.target.files?.[0] ?? null)} />
         </div>
         
         <div className="flex gap-4 items-center">
            <label className="text-xs font-bold text-slate-700">Payment Mode*</label>
            <select className="border px-2 py-1 text-xs" value={form.paymentMode} onChange={e => setField('paymentMode', e.target.value)}>
              <option value="gpay">Google Pay / UPI</option>
              <option value="online">Online Payment</option>
            </select>
         </div>
         
         {form.paymentMode === "gpay" && (
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input placeholder="Paid Amount" className="border px-2 py-1 text-xs" value={form.paidAmount} onChange={e => setField('paidAmount', e.target.value)} />
              <input placeholder="Transaction / UTR" className="border px-2 py-1 text-xs" value={form.transactionNo} onChange={e => setField('transactionNo', e.target.value)} />
              <div>
                <span className="text-xs text-slate-500 block mb-1">Payment Screenshot</span>
                <input type="file" accept="image/*,application/pdf" className="text-xs" onChange={e => setScreenshot(e.target.files?.[0] ?? null)} />
              </div>
           </div>
         )}
         
         {error && <div className="text-red-600 font-bold text-sm bg-red-50 p-2 rounded">{error}</div>}
         
         <div className="flex justify-end mt-4">
           <button type="submit" disabled={loading} onClick={e => { e.preventDefault(); onSubmit(e as any); }} className="bg-red-600 text-white font-bold px-8 py-3 text-lg uppercase tracking-wider hover:bg-red-700 transition">
              {loading ? "Submitting..." : "Submit Form"}
           </button>
         </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a2e]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-8 text-center shadow-2xl">
             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
             <h3 className="text-xl font-black uppercase mb-2">Success</h3>
             <p className="text-sm text-slate-500 mb-6">Application Submitted! Ref: {lastRefNumber}</p>
             <button onClick={() => setShowSuccessModal(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl">Close</button>
          </div>
        </div>
      )}
    </div>
  );`;

  content = content.substring(0, renderMatch) + newRender + '\n}\n';
  fs.writeFileSync('src/components/affiliation/BecomeAtcForm.tsx', content);
  console.log('Successfully updated the file!');
} else {
  console.error('Could not find the render block to replace.');
  process.exit(1);
}
