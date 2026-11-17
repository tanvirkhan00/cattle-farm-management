import React, { useState } from 'react';
import { X, Plus, Boxes, Stethoscope, DollarSign, Apple, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarm } from '../../context/FarmContext';
import { BREEDS_DATABASE } from '../../data/breedsData';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { addCattle, addTransaction, addHealthRecord, cattleList } = useFarm();
  const [activeTab, setActiveTab] = useState<'cattle' | 'transaction' | 'health'>('cattle');

  // Form states
  const [tagId, setTagId] = useState('');
  const [name, setName] = useState('');
  const [breedId, setBreedId] = useState('b-sahiwal');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [purpose, setPurpose] = useState<'dairy' | 'beef_fattening' | 'heifer'>('beef_fattening');
  const [weightKg, setWeightKg] = useState('320');
  const [purchasePrice, setPurchasePrice] = useState('110000');

  // Transaction form state
  const [txType, setTxType] = useState<'income' | 'expense'>('income');
  const [txCategory, setTxCategory] = useState<any>('milk_sale');
  const [txAmount, setTxAmount] = useState('5000');
  const [txDescription, setTxDescription] = useState('');

  // Health form state
  const [healthCattleId, setHealthCattleId] = useState(cattleList[0]?.id || '');
  const [symptoms, setSymptoms] = useState('');
  const [vetName, setVetName] = useState('Dr. Mahmudul Hasan, DVM');
  const [observation, setObservation] = useState('');
  const [treatment, setTreatment] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCreateCattle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagId) return;

    const breedObj = BREEDS_DATABASE.find(b => b.id === breedId);

    addCattle({
      tagId,
      name: name || undefined,
      breedId,
      breedName: breedObj ? (language === 'bn' ? breedObj.nameBn : breedObj.nameEn) : 'Crossbreed',
      gender,
      purpose,
      currentWeightKg: parseFloat(weightKg) || 250,
      purchasePrice: parseFloat(purchasePrice) || 0,
      transportCost: 3000,
      purchaseDate: new Date().toISOString().split('T')[0],
      pregnancyStatus: 'not_pregnant',
      healthStatus: 'healthy',
      housingPen: 'Main Shed Pen 1'
    });

    triggerSuccess();
  };

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(txAmount);
    if (!amount || amount <= 0) return;

    addTransaction({
      transactionType: txType,
      category: txCategory,
      amountBdt: amount,
      transactionDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash',
      description: txDescription || (txType === 'income' ? 'Daily milk or animal sale' : 'Farm supplies expense')
    });

    triggerSuccess();
  };

  const handleCreateHealth = (e: React.FormEvent) => {
    e.preventDefault();
    const target = cattleList.find(c => c.id === healthCattleId) || cattleList[0];
    if (!target) return;

    addHealthRecord({
      cattleId: target.id,
      cattleTagId: target.tagId,
      examinationDate: new Date().toISOString().split('T')[0],
      attendingVeterinarian: vetName,
      clinicalObservations: observation || 'Routine health and physical examination',
      prescribedTreatment: treatment || 'Prescribed oral vitamins and observation',
      symptomsObserved: symptoms ? symptoms.split(',').map(s => s.trim()) : ['Physical checkup'],
      prescribedMedicines: [],
      treatmentStartDate: new Date().toISOString().split('T')[0],
      recoveryStatus: 'under_treatment'
    });

    triggerSuccess();
  };

  const triggerSuccess = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-bold text-stone-900 text-sm">
              {language === 'bn' ? 'দ্রুত খামার এন্ট্রি' : 'Quick Farm Entry'}
            </h3>
            <p className="text-[11px] text-stone-500">
              {language === 'bn' ? 'নতুন গরু, হিসাব বা চিকিৎসা রেকর্ড করুন' : 'Record new cattle, financial tx, or vet care'}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition">
            <X size={18} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-stone-200 bg-stone-100/50 p-1.5 space-x-1">
          <button
            onClick={() => setActiveTab('cattle')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition
              ${activeTab === 'cattle' ? 'bg-white text-forest-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'}
            `}
          >
            <Boxes size={14} />
            <span>{language === 'bn' ? 'গরু যোগ' : 'Add Cattle'}</span>
          </button>
          <button
            onClick={() => setActiveTab('transaction')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition
              ${activeTab === 'transaction' ? 'bg-white text-forest-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'}
            `}
          >
            <DollarSign size={14} />
            <span>{language === 'bn' ? 'আয়/ব্যয়' : 'Finance'}</span>
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition
              ${activeTab === 'health' ? 'bg-white text-forest-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'}
            `}
          >
            <Stethoscope size={14} />
            <span>{language === 'bn' ? 'চিকিৎসা' : 'Health Record'}</span>
          </button>
        </div>

        {/* Success message overlay */}
        {savedSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Check size={28} />
            </div>
            <h4 className="text-sm font-bold text-stone-900">
              {language === 'bn' ? 'সফলভাবে সংরক্ষিত হয়েছে!' : 'Successfully Saved!'}
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'bn' ? 'ডাটাবেস ও মেট্রিক্স হালনাগাদ করা হয়েছে।' : 'Database and dashboard metrics updated.'}
            </p>
          </div>
        ) : (
          <div className="p-6">
            {activeTab === 'cattle' && (
              <form onSubmit={handleCreateCattle} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'ট্যাগ নং *' : 'Tag ID *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BD-GZP-108"
                      value={tagId}
                      onChange={e => setTagId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'ডাকনাম (ঐচ্ছিক)' : 'Name (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Manik"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'জাত (Breed)' : 'Breed'}
                    </label>
                    <select
                      value={breedId}
                      onChange={e => setBreedId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                    >
                      {BREEDS_DATABASE.map(b => (
                        <option key={b.id} value={b.id}>
                          {language === 'bn' ? b.nameBn : b.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'লিঙ্গ' : 'Gender'}
                    </label>
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                    >
                      <option value="male">{language === 'bn' ? 'ষাঁড় (Male)' : 'Male Bull'}</option>
                      <option value="female">{language === 'bn' ? 'গাভী (Female)' : 'Female Cow'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'উদ্দেশ্য' : 'Purpose'}
                    </label>
                    <select
                      value={purpose}
                      onChange={e => setPurpose(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                    >
                      <option value="beef_fattening">{language === 'bn' ? 'মোটাতাজাকরণ' : 'Beef Fattening'}</option>
                      <option value="dairy">{language === 'bn' ? 'দুগ্ধ উৎপাদন' : 'Dairy Milk'}</option>
                      <option value="heifer">{language === 'bn' ? 'বকনা বাছুর' : 'Heifer'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'বর্তমান ওজন (কেজি)' : 'Weight (kg)'}
                    </label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={e => setWeightKg(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'ক্রয়মূল্য (টাকা)' : 'Price (BDT)'}
                    </label>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={e => setPurchasePrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold shadow-xs"
                  >
                    {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Cattle'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'transaction' && (
              <form onSubmit={handleCreateTransaction} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'লেনদেনের ধরন' : 'Type'}
                    </label>
                    <div className="flex rounded-xl p-1 bg-stone-100">
                      <button
                        type="button"
                        onClick={() => setTxType('income')}
                        className={`flex-1 py-1.5 rounded-lg font-bold text-center transition
                          ${txType === 'income' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600'}
                        `}
                      >
                        {language === 'bn' ? 'আয় (Income)' : 'Income'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setTxType('expense')}
                        className={`flex-1 py-1.5 rounded-lg font-bold text-center transition
                          ${txType === 'expense' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-600'}
                        `}
                      >
                        {language === 'bn' ? 'ব্যয় (Expense)' : 'Expense'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      {language === 'bn' ? 'পরিমাণ (টাকা) *' : 'Amount (BDT) *'}
                    </label>
                    <input
                      type="number"
                      required
                      value={txAmount}
                      onChange={e => setTxAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'খাত (Category)' : 'Category'}
                  </label>
                  <select
                    value={txCategory}
                    onChange={e => setTxCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                  >
                    {txType === 'income' ? (
                      <>
                        <option value="milk_sale">{language === 'bn' ? 'দুধ বিক্রি (Milk Sale)' : 'Milk Sale'}</option>
                        <option value="cattle_sale">{language === 'bn' ? 'গরু বিক্রি (Cattle Sale)' : 'Cattle Sale'}</option>
                        <option value="manure_vermicompost_sale">{language === 'bn' ? 'গোবর ও সার বিক্রি (Manure/Compost)' : 'Manure/Compost Sale'}</option>
                        <option value="other_income">{language === 'bn' ? 'অন্যান্য আয়' : 'Other Income'}</option>
                      </>
                    ) : (
                      <>
                        <option value="feed_purchase">{language === 'bn' ? 'খাদ্য ও ভুসি ক্রয় (Feed Purchase)' : 'Feed Purchase'}</option>
                        <option value="labor_wages">{language === 'bn' ? 'শ্রমিক মজুরি (Labor Wages)' : 'Labor Wages'}</option>
                        <option value="veterinary_medicine">{language === 'bn' ? 'ওষুধ ও চিকিৎসা (Veterinary)' : 'Veterinary Medicine'}</option>
                        <option value="electricity_utility">{language === 'bn' ? 'বিদ্যুৎ ও পানি বিল (Utility)' : 'Electricity / Utility'}</option>
                        <option value="transportation">{language === 'bn' ? 'পরিবহন খরচ (Transport)' : 'Transport'}</option>
                        <option value="farm_maintenance">{language === 'bn' ? 'শেড মেরামত ও রক্ষণাবেক্ষণ' : 'Maintenance'}</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'বিবরণ' : 'Description'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 bags wheat bran purchase"
                    value={txDescription}
                    onChange={e => setTxDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold shadow-xs"
                  >
                    {language === 'bn' ? 'রেকর্ড সংরক্ষণ' : 'Record Transaction'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'health' && (
              <form onSubmit={handleCreateHealth} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'আক্রান্ত গরু নির্বাচন করুন' : 'Select Cattle'}
                  </label>
                  <select
                    value={healthCattleId}
                    onChange={e => setHealthCattleId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                  >
                    {cattleList.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.tagId} - {c.name || 'Unnamed'} ({c.breedName || c.breedId})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'উপসর্গসমূহ (কমা দিয়ে লিখুন)' : 'Observed Symptoms'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Loss of appetite, mild fever, nasal discharge"
                    value={symptoms}
                    onChange={e => setSymptoms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'চিকিৎসক ভেটেরিনারিয়ানের নাম' : 'Attending Veterinarian'}
                  </label>
                  <input
                    type="text"
                    value={vetName}
                    onChange={e => setVetName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'প্রেসক্রিপশন ও চিকিৎসার বিবরণ' : 'Prescribed Treatment Plan'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Meloxicam anti-inflammatory, electrolyte water, 5-day withdrawal period"
                    value={treatment}
                    onChange={e => setTreatment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold shadow-xs"
                  >
                    {language === 'bn' ? 'চিকিৎসা সংরক্ষণ' : 'Save Health Record'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
