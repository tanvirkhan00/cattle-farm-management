import React, { useState } from 'react';
import { 
  Boxes, Plus, Search, Filter, Edit, Trash2, 
  Eye, Heart, Activity, Scale, ChevronRight, X, 
  Check, Calendar, ArrowUpRight, Upload, Image as ImageIcon,
  Loader2, ShieldAlert
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { useAuth } from '../context/AuthContext';
import { Cattle, CattleHealthStatus, CattlePurpose } from '../types';
import { BREEDS_DATABASE } from '../data/breedsData';
import { uploadFileToStorage } from '../services/firestoreService';

export const CattleManagement: React.FC = () => {
  const { language } = useLanguage();
  const { cattleList, addCattle, updateCattle, deleteCattle, addWeightRecord } = useFarm();
  const { role } = useAuth();

  // Search & filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');

  // Modal states
  const [viewingCattle, setViewingCattle] = useState<Cattle | null>(null);
  const [editingCattle, setEditingCattle] = useState<Cattle | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isAddingWeight, setIsAddingWeight] = useState<string | null>(null);
  const [newWeightVal, setNewWeightVal] = useState('450');

  // Photo upload states
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // New Cattle Form state
  const [formData, setFormData] = useState({
    tagId: '',
    name: '',
    breedId: 'b-sahiwal',
    gender: 'female' as const,
    purpose: 'dairy' as CattlePurpose,
    currentWeightKg: 380,
    bodyConditionScore: 3.5,
    purchasePrice: 150000,
    transportCost: 3500,
    housingPen: 'Main Shed Pen 1',
    pregnancyStatus: 'not_pregnant' as const,
    healthStatus: 'healthy' as CattleHealthStatus,
    photoUrl: '',
    notes: ''
  });

  // Filtered cattle
  const filteredCattle = cattleList.filter(cattle => {
    const matchesSearch = 
      cattle.tagId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cattle.name && cattle.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cattle.breedName && cattle.breedName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'all' || cattle.healthStatus === selectedStatus;
    const matchesPurpose = selectedPurpose === 'all' || cattle.purpose === selectedPurpose;

    return matchesSearch && matchesStatus && matchesPurpose;
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    setUploadingPhoto(true);
    try {
      const url = await uploadFileToStorage('cattle_photos', file, `${formData.tagId || 'cattle'}_${Date.now()}`);
      setFormData(prev => ({ ...prev, photoUrl: url }));
    } catch (err) {
      console.error('Photo upload failed:', err);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tagId) return;

    const breedObj = BREEDS_DATABASE.find(b => b.id === formData.breedId);

    addCattle({
      ...formData,
      breedName: breedObj ? (language === 'bn' ? breedObj.nameBn : breedObj.nameEn) : 'Crossbreed',
      purchaseDate: new Date().toISOString().split('T')[0]
    });

    setIsAddingNew(false);
    setPhotoPreview(null);
    setFormData({
      tagId: '',
      name: '',
      breedId: 'b-sahiwal',
      gender: 'female',
      purpose: 'dairy',
      currentWeightKg: 380,
      bodyConditionScore: 3.5,
      purchasePrice: 150000,
      transportCost: 3500,
      housingPen: 'Main Shed Pen 1',
      pregnancyStatus: 'not_pregnant',
      healthStatus: 'healthy',
      photoUrl: '',
      notes: ''
    });
  };

  const handleDeleteCattle = (cattleId: string) => {
    if (window.confirm(language === 'bn' ? 'আপনি কি এই গবাদিপশুর রেকর্ড মুছে ফেলতে চান?' : 'Are you sure you want to delete this cattle record?')) {
      deleteCattle(cattleId);
    }
  };

  const handleWeightSubmit = (cattleId: string) => {
    const wt = parseFloat(newWeightVal);
    if (!wt) return;
    addWeightRecord(cattleId, wt, new Date().toISOString().split('T')[0], 'Regular scale measurement');
    setIsAddingWeight(null);
  };

  const getStatusBadge = (status: CattleHealthStatus) => {
    switch (status) {
      case 'healthy':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">{language === 'bn' ? 'সুস্থ' : 'Healthy'}</span>;
      case 'under_observation':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">{language === 'bn' ? 'পর্যবেক্ষণে' : 'Observation'}</span>;
      case 'under_treatment':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">{language === 'bn' ? 'চিকিৎসাধীন' : 'Under Care'}</span>;
      case 'quarantined':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">{language === 'bn' ? 'কোয়ারেন্টাইন' : 'Quarantined'}</span>;
      case 'sold':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">{language === 'bn' ? 'বিক্রিত' : 'Sold'}</span>;
      case 'deceased':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-900">{language === 'bn' ? 'মৃত' : 'Deceased'}</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
            <Boxes size={14} />
            <span>{language === 'bn' ? 'ব্যক্তিগত গবাদিপশু রেজিস্টার' : 'Cattle Inventory & Master Records'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'bn' ? 'গবাদিপশু ব্যবস্থাপনা ও প্রোফাইল' : 'Cattle Management & Herd Registry'}
          </h2>
          <p className="text-xs md:text-sm text-stone-600 mt-1">
            {language === 'bn' 
              ? `খামারে বর্তমানে মোট ${cattleList.length}টি পশু নথিবদ্ধ আছে। প্রতিটি পশুর ওজন, ছবি, টিকা ও স্বাস্থ্য ইতিহাস সংরক্ষিত।` 
              : `Tracking ${cattleList.length} registered head with weight history, cloud photos, reproductive status, and health logs.`}
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন গরু যোগ করুন' : 'Add New Cattle'}</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
          <input
            type="text"
            placeholder={language === 'bn' ? 'ট্যাগ নং, নাম বা জাত দিয়ে খুঁজুন...' : 'Search tag ID, name, or breed...'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-500 bg-stone-50/50"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto text-xs">
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 bg-white font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            <option value="all">{language === 'bn' ? 'সকল স্বাস্থ্য অবস্থা' : 'All Health Status'}</option>
            <option value="healthy">{language === 'bn' ? 'সুস্থ (Healthy)' : 'Healthy'}</option>
            <option value="under_observation">{language === 'bn' ? 'পর্যবেক্ষণে' : 'Under Observation'}</option>
            <option value="under_treatment">{language === 'bn' ? 'চিকিৎসাধীন' : 'Under Treatment'}</option>
          </select>

          <select
            value={selectedPurpose}
            onChange={e => setSelectedPurpose(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 bg-white font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            <option value="all">{language === 'bn' ? 'সকল উদ্দেশ্য' : 'All Purposes'}</option>
            <option value="dairy">{language === 'bn' ? 'দুগ্ধ (Dairy)' : 'Dairy'}</option>
            <option value="beef_fattening">{language === 'bn' ? 'মোটাতাজাকরণ' : 'Beef Fattening'}</option>
            <option value="heifer">{language === 'bn' ? 'বকনা বাছুর' : 'Heifer'}</option>
          </select>
        </div>
      </div>

      {/* Cattle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCattle.map(cattle => (
          <div
            key={cattle.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-soft hover:shadow-card transition overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Photo & Badge Header */}
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={cattle.photoUrl || 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80'}
                  alt={cattle.name || cattle.tagId}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl shadow-xs border border-stone-200 text-xs font-bold text-stone-900">
                  {cattle.tagId}
                </div>
                <div className="absolute top-3 right-3">
                  {getStatusBadge(cattle.healthStatus)}
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-stone-900 text-base">
                    {cattle.name || 'Unnamed'}
                  </h3>
                  <span className="text-xs font-semibold text-stone-500 capitalize">
                    {cattle.gender} • {cattle.purpose.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-forest-800 font-semibold truncate">
                  {cattle.breedName || cattle.breedId}
                </p>

                {/* Metric Quick Stats */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-center text-xs">
                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-[10px] text-stone-400 block">{language === 'bn' ? 'ওজন' : 'Weight'}</span>
                    <strong className="text-stone-800 text-xs">{cattle.currentWeightKg} kg</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-[10px] text-stone-400 block">{language === 'bn' ? 'অবস্থা' : 'BCS'}</span>
                    <strong className="text-stone-800 text-xs">{cattle.bodyConditionScore || 3.5}/5.0</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-[10px] text-stone-400 block">{language === 'bn' ? 'স্থান' : 'Pen'}</span>
                    <strong className="text-stone-800 text-xs truncate block">{cattle.housingPen || 'Pen 1'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={() => setIsAddingWeight(cattle.id)}
                className="font-semibold text-forest-700 hover:text-forest-900 flex items-center space-x-1"
              >
                <Scale size={14} />
                <span>{language === 'bn' ? 'ওজন রেকর্ড' : 'Log Weight'}</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewingCattle(cattle)}
                  className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition"
                  title="View Detail Profile"
                >
                  <Eye size={15} />
                </button>
                <button
                  onClick={() => handleDeleteCattle(cattle.id)}
                  className="p-2 rounded-xl bg-white border border-stone-200 text-rose-600 hover:bg-rose-50 transition"
                  title={language === 'bn' ? 'রেকর্ড মুছুন' : 'Delete Record'}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Log Weight Modal */}
      {isAddingWeight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200 max-w-sm w-full space-y-4 text-xs">
            <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
              <Scale size={16} className="text-forest-700" />
              <span>{language === 'bn' ? 'নতুন ওজন পরিমাপ লিপিবদ্ধ করুন' : 'Log Weight Measurement'}</span>
            </h3>
            <div>
              <label className="block text-stone-600 mb-1 font-semibold">{language === 'bn' ? 'পরিমাপকৃত ওজন (কেজি)' : 'Measured Weight (kg)'}</label>
              <input
                type="number"
                value={newWeightVal}
                onChange={e => setNewWeightVal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setIsAddingWeight(null)} className="px-3 py-1.5 rounded-xl border border-stone-300">
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={() => handleWeightSubmit(isAddingWeight)}
                className="px-4 py-1.5 rounded-xl bg-forest-700 text-white font-semibold"
              >
                {language === 'bn' ? 'সংরক্ষণ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Individual Cattle Detail Profile Modal */}
      {viewingCattle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 overflow-hidden flex items-center justify-center font-bold text-forest-700 border border-stone-200">
                  {viewingCattle.photoUrl ? (
                    <img src={viewingCattle.photoUrl} alt={viewingCattle.tagId} className="w-full h-full object-cover" />
                  ) : (
                    '🐄'
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">{viewingCattle.tagId} - {viewingCattle.name || 'Unnamed'}</h3>
                  <p className="text-stone-500">{viewingCattle.breedName}</p>
                </div>
              </div>
              <button onClick={() => setViewingCattle(null)} className="p-1.5 rounded-full text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-stone-400 block text-[10px]">{language === 'bn' ? 'বর্তমান ওজন' : 'Weight'}</span>
                <strong className="text-stone-900 text-sm">{viewingCattle.currentWeightKg} kg</strong>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-stone-400 block text-[10px]">{language === 'bn' ? 'ক্রয়মূল্য' : 'Purchase Price'}</span>
                <strong className="text-stone-900 text-sm">৳{viewingCattle.purchasePrice?.toLocaleString() || 0}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-stone-400 block text-[10px]">{language === 'bn' ? 'শেড কলম' : 'Pen Location'}</span>
                <strong className="text-stone-900 text-sm">{viewingCattle.housingPen || 'Pen 1'}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50">
                <span className="text-stone-400 block text-[10px]">{language === 'bn' ? 'স্বাস্থ্য অবস্থা' : 'Status'}</span>
                <div className="mt-0.5">{getStatusBadge(viewingCattle.healthStatus)}</div>
              </div>
            </div>

            {/* Weight Progression History Table */}
            <div className="space-y-2">
              <h4 className="font-bold text-stone-900">{language === 'bn' ? 'ঐতিহাসিক ওজন বৃদ্ধির রেকর্ড' : 'Weight Gain Progression Log'}</h4>
              <div className="border border-stone-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-stone-500 border-b border-stone-200">
                    <tr>
                      <th className="py-2 px-3">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                      <th className="py-2 px-3">{language === 'bn' ? 'ওজন (কেজি)' : 'Weight (kg)'}</th>
                      <th className="py-2 px-3">{language === 'bn' ? 'দৈনিক প্রবৃদ্ধি' : 'Daily Gain (ADG)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {viewingCattle.weightHistory?.map(w => (
                      <tr key={w.id}>
                        <td className="py-2 px-3">{w.recordedDate}</td>
                        <td className="py-2 px-3 font-bold text-stone-800">{w.weightKg} kg</td>
                        <td className="py-2 px-3 text-emerald-700 font-semibold">{w.averageDailyGainGrams ? `${w.averageDailyGainGrams} g/day` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-700 leading-relaxed">
              <strong>{language === 'bn' ? 'বিশেষ খামার নোট:' : 'Veterinary / Breeding Notes:'} </strong>
              {viewingCattle.notes || (language === 'bn' ? 'কোনো নোট নেই।' : 'No notes available.')}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setViewingCattle(null)}
                className="px-5 py-2 rounded-xl bg-forest-800 text-white font-semibold"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Cattle Full Modal with Firebase Storage Image Upload */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'নতুন গবাদিপশু অন্তর্ভুক্তি' : 'Register New Cattle'}
              </h3>
              <button onClick={() => setIsAddingNew(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="space-y-3">
              {/* Photo Upload Box */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'পশুর ছবি (Firebase Cloud Storage)' : 'Cattle Photo (Firebase Storage)'}
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-stone-300 flex items-center justify-center overflow-hidden bg-stone-50">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} className="text-stone-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 font-semibold text-stone-700 transition">
                      <Upload size={13} className="text-forest-700" />
                      <span>{uploadingPhoto ? (language === 'bn' ? 'আপলোড হচ্ছে...' : 'Uploading...') : (language === 'bn' ? 'ছবি নির্বাচন' : 'Choose Photo')}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                        disabled={uploadingPhoto} 
                      />
                    </label>
                    <p className="text-[10px] text-stone-400 mt-1">PNG, JPG or WebP up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'ট্যাগ আইডি *' : 'Tag ID *'}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BD-GZP-109"
                    value={formData.tagId}
                    onChange={e => setFormData({ ...formData, tagId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'নাম' : 'Name'}</label>
                  <input
                    type="text"
                    placeholder="e.g. Lalmoni"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'জাত' : 'Breed'}</label>
                  <select
                    value={formData.breedId}
                    onChange={e => setFormData({ ...formData, breedId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    {BREEDS_DATABASE.map(b => (
                      <option key={b.id} value={b.id}>{language === 'bn' ? b.nameBn : b.nameEn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'উদ্দেশ্য' : 'Purpose'}</label>
                  <select
                    value={formData.purpose}
                    onChange={e => setFormData({ ...formData, purpose: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="dairy">{language === 'bn' ? 'দুগ্ধ গাভী' : 'Dairy'}</option>
                    <option value="beef_fattening">{language === 'bn' ? 'কুরবানি ষাঁড়' : 'Beef Fattening'}</option>
                    <option value="heifer">{language === 'bn' ? 'বকনা' : 'Heifer'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'ওজন (কেজি)' : 'Weight (kg)'}</label>
                  <input
                    type="number"
                    value={formData.currentWeightKg}
                    onChange={e => setFormData({ ...formData, currentWeightKg: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'ক্রয়মূল্য (টাকা)' : 'Purchase Price (BDT)'}</label>
                  <input
                    type="number"
                    value={formData.purchasePrice}
                    onChange={e => setFormData({ ...formData, purchasePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'নোট' : 'Notes'}</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Purchased from Mawna Haat, active and alert..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 font-medium"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={uploadingPhoto}
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
