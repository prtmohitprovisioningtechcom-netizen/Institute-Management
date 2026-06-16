const fs = require('fs');

let content = fs.readFileSync('src/components/affiliation/BecomeAtcForm.tsx', 'utf8');

const renderMatch = content.indexOf('return (\n    <div className="mx-auto w-full max-w-4xl p-2 sm:p-4 font-sans text-xs sm:text-sm">');
if (renderMatch !== -1) {
  const newRender = `return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-[#0a0aa1] p-8 text-white flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 shrink-0 bg-white rounded-2xl p-1 shadow-lg shadow-black/20">
             <div className="w-full h-full rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center text-center text-[10px] font-bold text-blue-900 leading-tight p-2 bg-blue-50">
               SUNIL GROUP<br/>OF EDUCATION<br/>TRUST
             </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-blue-50">SUNIL GROUP OF EDUCATION FASHION AND TECHNOLOGY TRUST</h1>
            <p className="text-xs sm:text-sm text-blue-200 font-medium leading-relaxed">
              REGD BY-NCT GOVT.OF DELHI, MSME, NITI AAYOG, MCA GOVT. OF INDIA<br/>
              AN ISO-9001-2015 CERTIFIED INSTITUTE<br/>
              HQ - SHUHASH BIHAR DELHI, RO ARYA NAGAR, FIROZABAD, U.P
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bold mt-2">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">goodlucksunil212@gmail.com</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">MOB. 9258410701</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">sgeftskillindia.com</span>
            </div>
          </div>
          
          <div className="w-32 shrink-0 flex flex-col">
            <label className="border-2 border-dashed border-white/40 rounded-2xl w-full h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition relative overflow-hidden bg-white/5 backdrop-blur-sm group">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={URL.createObjectURL(photo)} alt="Photo" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-white/60 group-hover:text-white mb-2 transition" />
                  <span className="font-bold tracking-widest text-xs text-white/80 group-hover:text-white transition">PHOTO</span>
                </>
              )}
              <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
            </label>
          </div>
        </div>

        <div className="bg-amber-50 border-b border-amber-100 p-4 text-center">
          <h2 className="text-lg font-black text-amber-900 uppercase tracking-widest">Affiliation Form</h2>
          <p className="text-xs text-amber-700 font-medium">Please fill in block letters</p>
        </div>

        <form onSubmit={onSubmit} onReset={onReset} className="p-6 sm:p-10 space-y-12">
          
          {/* SECTION 1: INSTITUTE'S OFFICE ADDRESS */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight border-b-2 border-blue-600 pb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">1</span> 
              INSTITUTE'S OFFICE ADDRESS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Institute Name</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase font-bold text-slate-800" placeholder="Enter Institute Name" value={form.trainingPartnerName} onChange={e => setField('trainingPartnerName', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Address</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" placeholder="Enter Full Address" value={form.trainingPartnerAddress} onChange={e => setField('trainingPartnerAddress', e.target.value.toUpperCase())} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.city} onChange={e => setField('city', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Post Office</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.postOffice} onChange={e => setField('postOffice', e.target.value.toUpperCase())} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pin Code</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.pin} onChange={e => setField('pin', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">District</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.district} onChange={e => setField('district', e.target.value.toUpperCase())} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">State</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.state} onChange={e => setField('state', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Country</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.country} onChange={e => setField('country', e.target.value.toUpperCase())} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Class Room</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.classRoom} onChange={e => setField('classRoom', e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Office Room</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.officeRoom} onChange={e => setField('officeRoom', e.target.value.toUpperCase())} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.institutePhone} onChange={e => setField('institutePhone', e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">STD</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.instituteStd} onChange={e => setField('instituteStd', e.target.value.toUpperCase())} />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cell (Mobile)</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.mobile} onChange={e => setField('mobile', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.email} onChange={e => setField('email', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Website</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-slate-800" value={form.website} onChange={e => setField('website', e.target.value)} />
              </div>
            </div>
          </section>

          {/* SECTION 2: DIRECTOR'S NAME & ADDRESS */}
          <section className="space-y-6 pt-4">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight border-b-2 border-amber-500 pb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm">2</span> 
              DIRECTOR'S NAME & ADDRESS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Director's Name</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase font-bold text-slate-800" value={form.chiefName} onChange={e => setField('chiefName', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Qualification</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.educationQualification} onChange={e => setField('educationQualification', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Occupation</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.professionalExperience} onChange={e => setField('professionalExperience', e.target.value.toUpperCase())} />
              </div>
              
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Address</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorAddress} onChange={e => setField('directorAddress', e.target.value.toUpperCase())} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorCity} onChange={e => setField('directorCity', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Post Office</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorPostOffice} onChange={e => setField('directorPostOffice', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pin Code</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorPinCode} onChange={e => setField('directorPinCode', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">District</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorDistrict} onChange={e => setField('directorDistrict', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">State</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorState} onChange={e => setField('directorState', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Country</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorCountry} onChange={e => setField('directorCountry', e.target.value.toUpperCase())} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorPhone} onChange={e => setField('directorPhone', e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">STD</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorStd} onChange={e => setField('directorStd', e.target.value.toUpperCase())} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cell</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorCell} onChange={e => setField('directorCell', e.target.value.toUpperCase())} />
              </div>
            </div>
          </section>

          {/* SECTION 3: GOVERNING BODY */}
          <section className="space-y-6 pt-4">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight border-b-2 border-emerald-500 pb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">3</span> 
              GOVERNING BODY
              <span className="text-xs text-slate-400 font-normal ml-2 tracking-normal capitalize">(If applicable)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "PRESIDENT", field: "govPresident" },
                { label: "VICE-PRESIDENT", field: "govVicePresident" },
                { label: "SECRETARY", field: "govSecretary" },
                { label: "ASSISTANT SECRETARY", field: "govAssistantSecretary" },
                { label: "TREASURER", field: "govTreasurer" },
                { label: "MEMBER", field: "govMember1" },
                { label: "MEMBER", field: "govMember2" }
              ].map((item) => (
                <div className="space-y-1.5" key={item.field}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{item.label}</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition uppercase text-slate-800" value={(form as any)[item.field]} onChange={e => setField(item.field as keyof FormState, e.target.value.toUpperCase())} />
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: APPLY FOR & VERIFICATION */}
          <section className="space-y-6 pt-4">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight border-b-2 border-purple-500 pb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">4</span> 
              APPLICATION DETAILS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Apply For (Years)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Years:</span>
                  <input className="w-full pl-16 pr-4 py-3 rounded-xl bg-white border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-slate-800 font-bold" value={form.affiliationYear} onChange={e => setField('affiliationYear', e.target.value.replace(/\\D/g, ''))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Application Date</label>
                <input type="date" className="w-full px-4 py-3 rounded-xl bg-white border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-slate-800" value={form.applicationDate} onChange={e => setField('applicationDate', e.target.value)} />
              </div>
              
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Zones</label>
                <div className="flex flex-wrap gap-2 p-4 bg-white rounded-xl border border-purple-200">
                  {zoneCatalog.map(row => (
                    <label key={row.name} className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 hover:border-purple-400 transition select-none">
                       <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-slate-300" checked={form.zones.includes(row.name)} onChange={e => {
                         const next = e.target.checked ? [...form.zones, row.name] : form.zones.filter(v => v !== row.name);
                         setForm(c => ({...c, zones: next}));
                       }} />
                       <span className="text-sm font-bold text-slate-700">{row.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2">Signature of Applicant</label>
                <label className="w-full h-32 rounded-xl border-2 border-dashed border-purple-300 bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 hover:border-purple-400 transition relative overflow-hidden group">
                  {signature ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={URL.createObjectURL(signature)} alt="Signature" className="h-full object-contain p-2" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-purple-300 group-hover:text-purple-500 mb-2 transition" />
                      <span className="text-sm font-bold text-purple-500">Upload Signature</span>
                      <span className="text-xs text-purple-400/70 mt-1">PNG, JPG (Max 100KB)</span>
                    </>
                  )}
                  <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => setSignature(e.target.files?.[0] ?? null)} />
                </label>
              </div>
            </div>
          </section>

          {/* FINAL SUBMISSION & PAYMENT */}
          <div className="mt-8 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-6">Payment & Verification</h3>
            
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Aadhar Card (PDF) <span className="text-red-500">*</span></label>
                <input type="file" accept="application/pdf" className="w-full p-3 bg-white rounded-xl border border-slate-200 text-sm" onChange={(e) => setAadharDoc(e.target.files?.[0] ?? null)} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Payment Mode <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition font-bold text-slate-700" value={form.paymentMode} onChange={e => setField('paymentMode', e.target.value)}>
                  <option value="gpay">Google Pay / UPI</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>
              
              {form.paymentMode === "gpay" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-white rounded-2xl border border-blue-100 shadow-sm">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Paid Amount <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="0.00" value={form.paidAmount} onChange={e => setField('paidAmount', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Transaction No / UTR <span className="text-red-500">*</span></label>
                    <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="e.g. 123456789012" value={form.transactionNo} onChange={e => setField('transactionNo', e.target.value)} />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Payment Screenshot <span className="text-red-500">*</span></label>
                    <input type="file" accept="image/*,application/pdf" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm" onChange={e => setScreenshot(e.target.files?.[0] ?? null)} />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold text-sm flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">!</span>
                {error}
              </div>
            )}
            
            <button type="submit" disabled={loading} onClick={e => { e.preventDefault(); onSubmit(e as any); }} className="w-full mt-8 bg-gradient-to-r from-blue-700 to-[#0a0aa1] text-white font-black px-8 py-5 rounded-2xl text-lg uppercase tracking-widest hover:shadow-xl hover:shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-3">
               {loading ? <><span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span> Processing...</> : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl animate-in zoom-in-95">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
               <CheckCircle className="w-10 h-10 text-green-500" />
             </div>
             <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Success!</h3>
             <p className="text-sm text-slate-500 mb-6 leading-relaxed">Your application has been submitted successfully.<br/><span className="inline-block mt-2 font-mono bg-slate-100 px-3 py-1 rounded-lg text-slate-700 font-bold">Ref: {lastRefNumber}</span></p>
             <button onClick={() => setShowSuccessModal(false)} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-900/20">Close & Return</button>
          </div>
        </div>
      )}
    </div>
  );`;

  content = content.substring(0, renderMatch) + newRender + '\n}\n';
  fs.writeFileSync('src/components/affiliation/BecomeAtcForm.tsx', content);
  console.log('Successfully updated the file to modern layout!');
} else {
  console.error('Could not find the render block to replace.');
  process.exit(1);
}
