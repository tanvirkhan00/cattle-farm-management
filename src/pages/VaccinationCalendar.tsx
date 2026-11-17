import React, { useState } from 'react';
import { 
  Syringe, Calendar, CheckCircle2, Clock, 
  AlertTriangle, Plus, Filter, UserCheck, X 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { VaccinationRecord } from '../types';

export const VaccinationCalendar: React.FC = () => {
  const { language } = useLanguage();
  const { vaccinations, cattleList, addVaccination, toggleVaccinationStatus } = useFarm();

  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New Vaccination entry state
  const [targetCattleId, setTargetCattleId] = useState(cattleList[0]?.id || '');
  const [procedureType, setProcedureType] = useState<'vaccine' | 'deworming' | 'vitamin_mineral_booster'>('vaccine');
  const [vaccineName, setVaccineName] = useState('DLS Trivalent FMD Vaccine');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [administeredBy, setAdministeredBy] = useState('Dr. Mahmudul Hasan / Upazila Livestock Officer');
  const [notes, setNotes] = useState('');

  const filteredVaccinations = vaccinations.filter(v => {
    const matchesType = filterType === 'all' || v.procedureType === filterType;
    const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleSaveVaccination = (e: React.FormEvent) => {
    e.preventDefault();
    const targetCattle = cattleList.find(c => c.id === targetCattleId) || cattleList[0];
    if (!targetCattle) return;

    addVaccination({
      cattleId: targetCattle.id,
      cattleTagId: targetCattle.tagId,
      procedureType,
      medicineOrVaccineName: vaccineName,
      scheduledDate,
      nextDueDate: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
      status: 'scheduled',
      administeredBy,
      vetApprovalStatus: 'approved',
      notes
    });

    setIsAdding(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
            <Syringe size={14} />
            <span>{language === 'bn' ? 'জাতীয় প্রাণিসম্পদ টিকাদান সূচি' : 'National Cattle Immunization Schedule'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'bn' ? 'টিকা ও কৃমিনাশক ক্যালেন্ডার' : 'Vaccination & Deworming Calendar'}
          </h2>
          <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'এফএমডি, এলএসডি, তড়কা, গলাফুলা ও বাদলা টিকার নির্ধারিত তারিখ, বুস্টার ডোজ এবং পোস্ট-মনসুন কৃমিনাশক ট্র্যাকিং।'
              : 'Track animal immunization schedules, booster due dates, and DLS seasonal epidemic prevention protocols.'}
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন টিকা নির্ধারণ' : 'Schedule Vaccine'}</span>
        </button>
      </div>

      {/* DLS Standard Master Timeline Overview Card */}
      <div className="bg-forest-900 text-white p-6 rounded-3xl shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-forest-800 pb-3">
          <h3 className="font-bold text-sm text-emerald-300">
            {language === 'bn' ? 'বাংলাদেশে গবাদিপশুর সরকারি আদর্শ টিকাদান সময়সূচি (DLS Master Guidelines):' : 'Government Recommended Routine Cattle Vaccination Timeline (DLS):'}
          </h3>
          <span className="text-[10px] text-forest-300">Official Protocol</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-forest-800/80 border border-forest-700">
            <span className="text-emerald-300 font-bold block mb-1">১. ক্ষুরারোগ (FMD)</span>
            <p className="text-[11px] text-forest-200">প্রথম ডোজ: ৩-৪ মাস বয়সে।</p>
            <p className="text-[11px] text-forest-200 font-semibold mt-0.5">পুনঃটিকা: প্রতি ৬ মাস পর পর (মার্চ ও সেপ্টেম্বর)।</p>
          </div>

          <div className="p-3 rounded-2xl bg-forest-800/80 border border-forest-700">
            <span className="text-emerald-300 font-bold block mb-1">২. লাম্পি স্কিন (LSD)</span>
            <p className="text-[11px] text-forest-200">প্রথম ডোজ: ৪ মাস বয়সে।</p>
            <p className="text-[11px] text-forest-200 font-semibold mt-0.5">পুনঃটিকা: বছরে ১ বার (বর্ষা শুরুর পূর্বে - এপ্রিলে)।</p>
          </div>

          <div className="p-3 rounded-2xl bg-forest-800/80 border border-forest-700">
            <span className="text-emerald-300 font-bold block mb-1">৩. গলাফুলা (HS)</span>
            <p className="text-[11px] text-forest-200">প্রথম ডোজ: ৪-৬ মাস বয়সে।</p>
            <p className="text-[11px] text-forest-200 font-semibold mt-0.5">পুনঃটিকা: বছরে ১ বার (মে মাসে)।</p>
          </div>

          <div className="p-3 rounded-2xl bg-forest-800/80 border border-forest-700">
            <span className="text-emerald-300 font-bold block mb-1">৪. বাদলা রোগ (BQ)</span>
            <p className="text-[11px] text-forest-200">প্রথম ডোজ: ৬ মাস বয়সে।</p>
            <p className="text-[11px] text-forest-200 font-semibold mt-0.5">পুনঃটিকা: বছরে ১ বার (মে-জুনে)।</p>
          </div>

          <div className="p-3 rounded-2xl bg-forest-800/80 border border-forest-700">
            <span className="text-emerald-300 font-bold block mb-1">৫. তড়কা (Anthrax)</span>
            <p className="text-[11px] text-forest-200">প্রথম ডোজ: ৬ মাস বয়সে।</p>
            <p className="text-[11px] text-forest-200 font-semibold mt-0.5">পুনঃটিকা: বছরে ১ বার (গ্রীষ্মের শুরুতে)।</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft flex flex-wrap gap-3 items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-stone-700">{language === 'bn' ? 'ধরণ:' : 'Procedure:'}</span>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 font-medium"
          >
            <option value="all">{language === 'bn' ? 'সকল' : 'All Types'}</option>
            <option value="vaccine">{language === 'bn' ? 'টিকা (Vaccine)' : 'Vaccine'}</option>
            <option value="deworming">{language === 'bn' ? 'কৃমিনাশক (Deworming)' : 'Deworming'}</option>
            <option value="vitamin_mineral_booster">{language === 'bn' ? 'ভিটামিন/মিনারেল বুস্টার' : 'Booster'}</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-stone-700">{language === 'bn' ? 'অবস্থা:' : 'Status:'}</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 font-medium"
          >
            <option value="all">{language === 'bn' ? 'সকল অবস্থা' : 'All Statuses'}</option>
            <option value="scheduled">{language === 'bn' ? 'নির্ধারিত (Scheduled)' : 'Scheduled'}</option>
            <option value="administered">{language === 'bn' ? 'প্রয়োগ সম্পন্ন' : 'Administered'}</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">{language === 'bn' ? 'ট্যাগ আইডি' : 'Cattle Tag ID'}</th>
                <th className="py-3.5 px-4 font-bold">{language === 'bn' ? 'টিকা / স্বাস্থ্য সেবা' : 'Procedure'}</th>
                <th className="py-3.5 px-4 font-bold">{language === 'bn' ? 'নির্ধারিত তারিখ' : 'Scheduled Date'}</th>
                <th className="py-3.5 px-4 font-bold">{language === 'bn' ? 'পরবর্তী সম্ভাব্য ডোজ' : 'Next Due'}</th>
                <th className="py-3.5 px-4 font-bold">{language === 'bn' ? 'প্রয়োগকারী' : 'Administered By'}</th>
                <th className="py-3.5 px-4 font-bold">{language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                <th className="py-3.5 px-4 font-bold text-right">{language === 'bn' ? 'পদক্ষেপ' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredVaccinations.map(v => (
                <tr key={v.id} className="hover:bg-stone-50/60 transition">
                  <td className="py-3 px-4 font-bold text-stone-900">{v.cattleTagId}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-stone-900">{v.medicineOrVaccineName}</div>
                    <span className="text-[10px] text-stone-400 capitalize">{v.procedureType.replace('_', ' ')}</span>
                  </td>
                  <td className="py-3 px-4 text-stone-600 font-medium">{v.scheduledDate}</td>
                  <td className="py-3 px-4 text-forest-800 font-bold">{v.nextDueDate || '-'}</td>
                  <td className="py-3 px-4 text-stone-500">{v.administeredBy || 'Veterinarian'}</td>
                  <td className="py-3 px-4">
                    {v.status === 'administered' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 size={12} />
                        <span>{language === 'bn' ? 'সম্পন্ন' : 'Completed'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold text-[10px] bg-amber-100 text-amber-800 border border-amber-200">
                        <Clock size={12} />
                        <span>{language === 'bn' ? 'নির্ধারিত' : 'Scheduled'}</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleVaccinationStatus(v.id)}
                      className={`px-3 py-1 rounded-xl font-semibold text-[11px] transition
                        ${v.status === 'administered' ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'}
                      `}
                    >
                      {v.status === 'administered' ? (language === 'bn' ? 'পূর্বাবস্থায় ফেরান' : 'Undo') : (language === 'bn' ? 'টিকা সম্পন্ন মার্ক' : 'Mark Done')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Vaccine Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-md p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'নতুন টিকা বা কৃমিনাশক নির্ধারণ' : 'Schedule Vaccine or Deworming'}
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveVaccination} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'গরু নির্বাচন করুন' : 'Select Cattle'}
                </label>
                <select
                  value={targetCattleId}
                  onChange={e => setTargetCattleId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  {cattleList.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.tagId} - {c.name || 'Unnamed'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'সেবার ধরণ' : 'Procedure Type'}
                </label>
                <select
                  value={procedureType}
                  onChange={e => setProcedureType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="vaccine">{language === 'bn' ? 'টিকা (Vaccine)' : 'Vaccine'}</option>
                  <option value="deworming">{language === 'bn' ? 'কৃমিনাশক (Deworming)' : 'Deworming'}</option>
                  <option value="vitamin_mineral_booster">{language === 'bn' ? 'ভিটামিন বুস্টার' : 'Vitamin Booster'}</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'ওষুধ বা টিকার নাম' : 'Medicine / Vaccine Name'}
                </label>
                <input
                  type="text"
                  required
                  value={vaccineName}
                  onChange={e => setVaccineName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'নির্ধারিত তারিখ' : 'Scheduled Date'}
                </label>
                <input
                  type="date"
                  required
                  value={scheduledDate}
                  onChange={e => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-700 text-white font-semibold"
                >
                  {language === 'bn' ? 'নির্ধারণ সম্পন্ন' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
