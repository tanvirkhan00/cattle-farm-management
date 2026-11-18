import React, { useState } from 'react';
import { 
  Stethoscope, ShieldAlert, Plus, AlertTriangle, 
  CheckCircle2, FileText, Calendar, Clock, 
  UserCheck, Thermometer, ChevronRight, X,
  Upload, ExternalLink, Paperclip, Loader2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { HealthRecord } from '../types';
import { uploadFileToStorage } from '../services/firestoreService';

export const HealthVeterinary: React.FC = () => {
  const { language } = useLanguage();
  const { healthRecords, cattleList, addHealthRecord, updateHealthRecord } = useFarm();

  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  // New Record Form state
  const [formCattleId, setFormCattleId] = useState(cattleList[0]?.id || '');
  const [formVetName, setFormVetName] = useState('Dr. Mahmudul Hasan, DVM, MS (Sur)');
  const [formVetReg, setFormVetReg] = useState('BVC-Reg-5421');
  const [formSymptoms, setFormSymptoms] = useState('');
  const [formTemp, setFormTemp] = useState('102.5');
  const [formObservations, setFormObservations] = useState('');
  const [formTreatment, setFormTreatment] = useState('');
  const [formRecovery, setFormRecovery] = useState<'under_treatment' | 'improved' | 'recovered'>('under_treatment');
  const [formMilkWithdrawal, setFormMilkWithdrawal] = useState('');
  const [formMeatWithdrawal, setFormMeatWithdrawal] = useState('');

  // Prescription file upload state
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docFileUrl, setDocFileUrl] = useState<string>('');
  const [docFileName, setDocFileName] = useState<string>('');

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDocFileName(file.name);
    setUploadingDoc(true);
    try {
      const url = await uploadFileToStorage('vet_documents', file, `rx_${Date.now()}`);
      setDocFileUrl(url);
    } catch (err) {
      console.error('Prescription upload failed:', err);
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleSaveHealthRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCattle = cattleList.find(c => c.id === formCattleId) || cattleList[0];
    if (!targetCattle) return;

    addHealthRecord({
      cattleId: targetCattle.id,
      cattleTagId: targetCattle.tagId,
      examinationDate: new Date().toISOString().split('T')[0],
      attendingVeterinarian: formVetName,
      vetRegNumber: formVetReg,
      symptomsObserved: formSymptoms ? formSymptoms.split(',').map(s => s.trim()) : ['Physical checkup'],
      bodyTemperatureF: parseFloat(formTemp) || 102.0,
      clinicalObservations: formObservations,
      prescribedTreatment: formTreatment,
      prescribedMedicines: [],
      treatmentStartDate: new Date().toISOString().split('T')[0],
      followUpDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      recoveryStatus: formRecovery,
      milkWithdrawalUntil: formMilkWithdrawal || undefined,
      meatWithdrawalUntil: formMeatWithdrawal || undefined,
      vetPrescriptionFileUrl: docFileUrl || undefined
    });

    setIsAddingRecord(false);
    // Reset
    setFormSymptoms('');
    setFormObservations('');
    setFormTreatment('');
    setDocFileUrl('');
    setDocFileName('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
            <Stethoscope size={14} />
            <span>{language === 'bn' ? 'ভেটেরিনারি প্রেসক্রিপশন ও চিকিৎসা রেজিস্টার' : 'Clinical Health & Veterinary Registry'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'bn' ? 'চিকিৎসা ও ভেটেরিনারি স্বাস্থ্য ব্যবস্থাপনা' : 'Health & Veterinary Management'}
          </h2>
          <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'রেজিস্টার্ড ভেটেরিনারি সার্জনের চিকিৎসাপত্র, প্রেসক্রিপশন ফাইল ও দুধ-মাংসের উইথড্রয়াল সময়সীমা ক্লাউড স্টোরেজে সংরক্ষণ করুন।'
              : 'Record veterinarian-supervised clinical observations, prescribed medications, Cloud prescription documents, and mandatory food-safety withdrawal periods.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddingRecord(true)}
          className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন প্রেসক্রিপশন যোগ' : 'Log Vet Examination'}</span>
        </button>
      </div>

      {/* Strict Veterinary Safety Rules Disclaimer Banner */}
      <div className="bg-amber-50 border-2 border-amber-200/90 p-4 rounded-3xl text-xs space-y-1.5">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
          <ShieldAlert size={18} className="text-amber-600 flex-shrink-0" />
          <span>{language === 'bn' ? 'কঠোর ভেটেরিনারি নিরাপত্তা অনুশাসন (Mandatory Safety Guardrails):' : 'Strict Veterinary Safety Rules'}</span>
        </div>
        <p className="text-amber-800 leading-relaxed text-[11px]">
          {language === 'bn'
            ? '• এআই কখনো উপসর্গ দেখে স্বয়ংক্রিয়ভাবে ক্লিনিক্যাল রোগ নির্ণয় করে না এবং কোনো অ্যান্টিবায়োটিক বা প্রেসক্রিপশন ওষুধ প্রেসক্রাইব করে না।\n• মানুষের ওষুধ কখনো গরুর জন্য ব্যবহার করবেন না।\n• জরুরি লক্ষণ (অতিরিক্ত লালা ঝরা, রক্ত প্রস্রাব, পেট ফোলা বা হঠাৎ মৃত্যু) দেখা দিলে তৎক্ষণাৎ উপজেলা প্রাণিসম্পদ কর্মকর্তা বা রেজিস্টার্ড ভেটেরিনারিয়ানকে ডাকুন।'
            : '• The AI system NEVER prescribes antibiotics, injections, or controlled substances.\n• Never administer human medicines to cattle.\n• In case of emergency signs (bloody urine, sudden prostration, severe bloat), contact your registered Upazila Livestock Officer immediately.'}
        </p>
      </div>

      {/* Health Records Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {healthRecords.map(record => (
          <div
            key={record.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft hover:shadow-card transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Record Top Bar */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200">
                    {record.cattleTagId}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm mt-1.5">
                    {record.diseaseName || (language === 'bn' ? 'ক্লিনিক্যাল স্বাস্থ্য পরীক্ষা' : 'Clinical Examination')}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {record.examinationDate}
                  </p>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    record.recoveryStatus === 'recovered' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : record.recoveryStatus === 'improved'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {record.recoveryStatus.replace('_', ' ')}
                  </span>
                  {record.bodyTemperatureF && (
                    <span className="block text-[11px] font-bold text-stone-600 mt-1 flex items-center justify-end space-x-0.5">
                      <Thermometer size={12} className="text-rose-500" />
                      <span>{record.bodyTemperatureF}°F</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Symptoms Observed */}
              <div className="flex flex-wrap gap-1.5">
                {record.symptomsObserved.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-700 text-[10px] font-medium">
                    {s}
                  </span>
                ))}
              </div>

              {/* Clinical Observations */}
              <div className="text-xs text-stone-700 leading-relaxed">
                <strong className="text-stone-900">{language === 'bn' ? 'চিকিৎসকের পর্যবেক্ষণ:' : 'Clinical Findings:'} </strong>
                {record.clinicalObservations}
              </div>

              {/* Prescribed Treatment */}
              <div className="p-3.5 rounded-2xl bg-forest-50/70 border border-forest-200 text-xs text-forest-950 space-y-1.5">
                <span className="font-bold block flex items-center space-x-1 text-forest-900">
                  <Stethoscope size={13} className="text-forest-700" />
                  <span>{language === 'bn' ? 'চিকিৎসা পরিকল্পনা ও প্রেসক্রিপশন:' : 'Prescribed Treatment Plan:'}</span>
                </span>
                <p className="leading-relaxed">{record.prescribedTreatment}</p>
              </div>

              {/* Prescription Document Link if uploaded */}
              {record.vetPrescriptionFileUrl && (
                <div className="pt-1">
                  <a
                    href={record.vetPrescriptionFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 border border-forest-200 text-forest-800 text-[11px] font-semibold transition"
                  >
                    <FileText size={13} className="text-forest-700" />
                    <span>{language === 'bn' ? 'প্রেসক্রিপশন নথি দেখুন (Cloud)' : 'View Prescription Document'}</span>
                    <ExternalLink size={11} className="text-forest-600" />
                  </a>
                </div>
              )}

              {/* Withdrawal Period Guardrail Pill */}
              {(record.milkWithdrawalUntil || record.meatWithdrawalUntil) && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium flex items-center space-x-2">
                  <Clock size={14} className="text-amber-600 flex-shrink-0" />
                  <span>
                    {language === 'bn' 
                      ? `নিরাপত্তা প্রত্যাহার: ${record.milkWithdrawalUntil ? `দুধ (${record.milkWithdrawalUntil} পর্যন্ত)` : ''} ${record.meatWithdrawalUntil ? `মাংস (${record.meatWithdrawalUntil} পর্যন্ত)` : ''}`
                      : `Withdrawal Safety: ${record.milkWithdrawalUntil ? `Milk withheld until ${record.milkWithdrawalUntil}` : ''} ${record.meatWithdrawalUntil ? `Meat withheld until ${record.meatWithdrawalUntil}` : ''}`}
                  </span>
                </div>
              )}
            </div>

            {/* Footer with Attending Veterinarian */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center space-x-1 font-medium">
                <UserCheck size={13} className="text-forest-700" />
                <span>{record.attendingVeterinarian} {record.vetRegNumber ? `(${record.vetRegNumber})` : ''}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Health Record Modal */}
      {isAddingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg p-6 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'নতুন ভেটেরিনারি চিকিৎসা রেকর্ড' : 'Log Veterinary Examination'}
              </h3>
              <button onClick={() => setIsAddingRecord(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveHealthRecord} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'গরু নির্বাচন করুন' : 'Select Cattle'}
                </label>
                <select
                  value={formCattleId}
                  onChange={e => setFormCattleId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium"
                >
                  {cattleList.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.tagId} - {c.name || 'Unnamed'} ({c.breedName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'চিকিৎসক ভেটেরিনারিয়ান' : 'Veterinarian Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formVetName}
                    onChange={e => setFormVetName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'শরীরের তাপমাত্রা (°F)' : 'Body Temp (°F)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formTemp}
                    onChange={e => setFormTemp(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'উপসর্গসমূহ (কমা দিয়ে লিখুন)' : 'Symptoms Observed'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cough, nasal discharge, fever, reduced intake"
                  value={formSymptoms}
                  onChange={e => setFormSymptoms(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'ক্লিনিক্যাল পর্যবেক্ষণ' : 'Clinical Observations'}
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Lungs auscultation clear, early pharyngitis..."
                  value={formObservations}
                  onChange={e => setFormObservations(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'চিকিৎসা পরিকল্পনা ও প্রেসক্রিপশন' : 'Prescribed Treatment'}
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Oral mucolytic, meloxicam anti-inflammatory, warm water..."
                  value={formTreatment}
                  onChange={e => setFormTreatment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              {/* Prescription Document Upload to Firebase Storage */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <label className="block text-stone-700 font-semibold text-[11px]">
                  {language === 'bn' ? 'প্রেসক্রিপশন নথি / ছবি (Firebase Storage)' : 'Prescription Document / Photo (Firebase Storage)'}
                </label>
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 font-semibold text-stone-700 transition">
                    <Paperclip size={13} className="text-forest-700" />
                    <span>{uploadingDoc ? (language === 'bn' ? 'আপলোড হচ্ছে...' : 'Uploading...') : (language === 'bn' ? 'ফাইল নির্বাচন' : 'Attach Document')}</span>
                    <input 
                      type="file" 
                      accept=".pdf,image/*" 
                      onChange={handleDocUpload} 
                      className="hidden" 
                      disabled={uploadingDoc} 
                    />
                  </label>
                  {docFileName && (
                    <span className="text-[11px] text-forest-800 font-medium truncate max-w-[200px]">
                      {docFileName} {docFileUrl && '✓'}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'দুধ উইথড্রয়াল শেষ' : 'Milk Withheld Until'}
                  </label>
                  <input
                    type="date"
                    value={formMilkWithdrawal}
                    onChange={e => setFormMilkWithdrawal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'পুনরুদ্ধার অবস্থা' : 'Recovery Status'}
                  </label>
                  <select
                    value={formRecovery}
                    onChange={e => setFormRecovery(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="under_treatment">{language === 'bn' ? 'চিকিৎসাধীন' : 'Under Treatment'}</option>
                    <option value="improved">{language === 'bn' ? 'উন্নত' : 'Improved'}</option>
                    <option value="recovered">{language === 'bn' ? 'সম্পূর্ণ সুস্থ' : 'Recovered'}</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddingRecord(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 font-medium"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={uploadingDoc}
                  className="px-5 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 disabled:opacity-50 text-white font-semibold transition"
                >
                  {language === 'bn' ? 'সংরক্ষণ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
