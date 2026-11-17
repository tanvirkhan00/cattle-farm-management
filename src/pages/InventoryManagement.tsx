import React, { useState } from 'react';
import { 
  Package, Plus, AlertTriangle, CheckCircle2, 
  Search, Filter, ArrowUpRight, ShieldAlert, X 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { FeedInventoryItem, FeedCategory } from '../types';

export const InventoryManagement: React.FC = () => {
  const { language } = useLanguage();
  const { feedInventory, updateFeedStock, addFeedInventoryItem, metrics } = useFarm();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  // New Item form
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [category, setCategory] = useState<FeedCategory>('concentrate');
  const [stockKg, setStockKg] = useState('500');
  const [thresholdKg, setThresholdKg] = useState('150');
  const [unitCost, setUnitCost] = useState('45');
  const [supplier, setSupplier] = useState('');
  const [storageLoc, setStorageLoc] = useState('Main Store');

  const filteredInventory = feedInventory.filter(item => {
    const matchesSearch = 
      item.feedNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedNameBn.includes(searchTerm);
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn && !nameBn) return;

    addFeedInventoryItem({
      feedTypeId: `ft-${Date.now()}`,
      feedNameEn: nameEn || nameBn,
      feedNameBn: nameBn || nameEn,
      category,
      currentStockKg: parseFloat(stockKg) || 100,
      minimumThresholdKg: parseFloat(thresholdKg) || 50,
      unitCostBdt: parseFloat(unitCost) || 30,
      supplierName: supplier || 'Local Grain Supplier',
      storageLocation: storageLoc
    });

    setIsAddingItem(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
            <Package size={14} />
            <span>{language === 'bn' ? 'খাদ্য, ওষুধ ও ফার্ম সামগ্রী গুদাম' : 'Feed, Medicine & Supplies Inventory'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'bn' ? 'খাদ্য ও ফার্ম ইনভেন্টরি ব্যবস্থাপনা' : 'Feed Stock & Farm Inventory'}
          </h2>
          <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'কাঁচা ঘাস, সাইলেজ, খড়, গমের ভুসি, খৈল এবং ভেটেরিনারি ওষুধের বর্তমান মজুদ ও রিস্টক সতর্কতা।'
              : 'Track on-farm feed stocks, silage bunkers, minimum safety thresholds, and supply replenishment logs.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddingItem(true)}
          className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন উপাদান যোগ করুন' : 'Add Inventory Item'}</span>
        </button>
      </div>

      {/* Low Stock Warning Banner if any items low */}
      {metrics.lowStockItemsCount > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-3xl text-xs flex items-center space-x-3 text-amber-950">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
          <div>
            <p className="font-bold">
              {metrics.lowStockItemsCount} {language === 'bn' ? 'টি উপাদানের মজুদ ন্যূনতম সীমার নিচে নেমে গেছে!' : 'inventory items have hit minimum safety thresholds!'}
            </p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              {language === 'bn' ? 'গরুর দৈনিক খাদ্যের ব্যত্যয় এড়াতে অবিলম্বে রিস্টক নিশ্চিত করুন।' : 'Order replenishments promptly to prevent ration disruptions.'}
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
          <input
            type="text"
            placeholder={language === 'bn' ? 'খাদ্য বা ওষুধের নাম...' : 'Search inventory item...'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-stone-50/50"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'green_fodder', 'dry_fodder', 'concentrate', 'silage', 'mineral_premix'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize whitespace-nowrap transition
                ${categoryFilter === cat ? 'bg-forest-800 text-white shadow-xs' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}
              `}
            >
              {cat === 'all' ? (language === 'bn' ? 'সকল' : 'All') : cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredInventory.map(item => {
          const isLowStock = item.currentStockKg <= item.minimumThresholdKg;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border p-5 shadow-soft space-y-4 flex flex-col justify-between transition
                ${isLowStock ? 'border-amber-300 ring-2 ring-amber-400/20' : 'border-stone-200'}
              `}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">
                      {language === 'bn' ? item.feedNameBn : item.feedNameEn}
                    </h3>
                    <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider capitalize">
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>

                  {isLowStock ? (
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-rose-100 text-rose-800 border border-rose-300 flex items-center space-x-1">
                      <AlertTriangle size={11} />
                      <span>Low Stock</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                      <CheckCircle2 size={11} />
                      <span>Adequate</span>
                    </span>
                  )}
                </div>

                {/* Stock Level Bar */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">{language === 'bn' ? 'বর্তমান মজুদ:' : 'Current Stock:'}</span>
                    <strong className={`font-black ${isLowStock ? 'text-rose-600' : 'text-stone-900'}`}>
                      {item.currentStockKg} kg
                    </strong>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-2 rounded-full ${isLowStock ? 'bg-rose-500' : 'bg-forest-600'}`}
                      style={{ width: `${Math.min(100, (item.currentStockKg / (item.minimumThresholdKg * 3)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-400 text-right">
                    {language === 'bn' ? 'ন্যূনতম সতর্কতা সীমা:' : 'Alert Threshold:'} {item.minimumThresholdKg} kg
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 text-[11px] space-y-1 text-stone-600">
                  <div className="flex justify-between">
                    <span>{language === 'bn' ? 'একক মূল্য:' : 'Unit Cost:'}</span>
                    <strong className="text-stone-900">৳{item.unitCostBdt} / kg</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'bn' ? 'সংরক্ষণ স্থান:' : 'Storage:'}</span>
                    <span className="text-stone-800">{item.storageLocation || 'Feed Store'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'bn' ? 'সরবরাহকারী:' : 'Supplier:'}</span>
                    <span className="text-stone-800 truncate max-w-[150px]">{item.supplierName || 'Local'}</span>
                  </div>
                </div>
              </div>

              {/* Adjust Stock Controls */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 text-[11px]">{language === 'bn' ? 'মজুদ সমন্বয়:' : 'Quick Adjust:'}</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => updateFeedStock(item.id, item.currentStockKg - 50)}
                    className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    -50 kg
                  </button>
                  <button
                    onClick={() => updateFeedStock(item.id, item.currentStockKg + 100)}
                    className="px-2.5 py-1 rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-800 font-bold"
                  >
                    +100 kg
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Item Modal */}
      {isAddingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-md p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'নতুন খাদ্য বা সামগ্রী যুক্তকরণ' : 'Add Inventory Item'}
              </h3>
              <button onClick={() => setIsAddingItem(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'নাম (বাংলা)' : 'Name (Bengali)'}</label>
                <input
                  type="text"
                  placeholder="e.g. গম ভুসি (City)"
                  value={nameBn}
                  onChange={e => setNameBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'নাম (English)' : 'Name (English)'}</label>
                <input
                  type="text"
                  placeholder="e.g. Wheat Bran"
                  value={nameEn}
                  onChange={e => setNameEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'ক্যাটাগরি' : 'Category'}</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="concentrate">Concentrate (দানাদার)</option>
                    <option value="green_fodder">Green Fodder (কাঁচা ঘাস)</option>
                    <option value="dry_fodder">Dry Fodder (খড়)</option>
                    <option value="silage">Silage (সাইলেজ)</option>
                    <option value="mineral_premix">Mineral (খনিজ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'একক মূল্য (টাকা/কেজি)' : 'Unit Cost (BDT/kg)'}</label>
                  <input
                    type="number"
                    value={unitCost}
                    onChange={e => setUnitCost(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'বর্তমান মজুদ (কেজি)' : 'Initial Stock (kg)'}</label>
                  <input
                    type="number"
                    value={stockKg}
                    onChange={e => setStockKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'ন্যূনতম সতর্কতা সীমা (কেজি)' : 'Threshold (kg)'}</label>
                  <input
                    type="number"
                    value={thresholdKg}
                    onChange={e => setThresholdKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddingItem(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-700 text-white font-semibold"
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
