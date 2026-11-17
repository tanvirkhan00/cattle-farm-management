import React from 'react';
import { 
  BarChart3, TrendingUp, Scale, Droplet, DollarSign, 
  ShieldCheck, ArrowUpRight, Download, Calendar 
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';

export const ReportsAnalytics: React.FC = () => {
  const { language } = useLanguage();
  const { metrics, cattleList, transactions } = useFarm();

  // Average milk production history (Liters/day)
  const milkProductionHistory = [
    { month: 'Jun', rani: 16.5, shundori: 8.8, moni: 11.2 },
    { month: 'Jul', rani: 17.0, shundori: 9.0, moni: 11.8 },
    { month: 'Aug', rani: 17.8, shundori: 9.2, moni: 12.0 },
    { month: 'Sep', rani: 18.2, shundori: 9.1, moni: 12.2 },
    { month: 'Oct', rani: 17.9, shundori: 9.3, moni: 11.5 },
    { month: 'Nov', rani: 17.5, shundori: 9.2, moni: 10.8 },
  ];

  // Feed cost per liter of milk vs market selling price (BDT)
  const feedCostPerLiterHistory = [
    { month: 'Jun', costPerLiter: 42, salePrice: 72 },
    { month: 'Jul', costPerLiter: 44, salePrice: 72 },
    { month: 'Aug', costPerLiter: 45, salePrice: 75 },
    { month: 'Sep', costPerLiter: 43, salePrice: 75 },
    { month: 'Oct', costPerLiter: 44, salePrice: 75 },
    { month: 'Nov', costPerLiter: 42.5, salePrice: 75 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
            <BarChart3 size={14} />
            <span>{language === 'bn' ? 'কার্যক্ষমতা ও রূপান্তর পরিসংখ্যান' : 'Performance Trends & Conversion Ratios'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'bn' ? 'খামার প্রতিবেদন ও বিশ্লেষণ (Reports & Analytics)' : 'Farm Reports & Performance Analytics'}
          </h2>
          <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'দুধ উৎপাদনশীলতা বক্ররেখা, প্রতি লিটার দুধে খাদ্য ব্যয়, ষাঁড়ের দৈনিক ওজন রূপান্তর (ADG) এবং আর্থিক মার্জিন।'
              : 'Feed Conversion Ratios (FCR), cost per liter of milk, weight gain trajectories, and composite economic returns.'}
          </p>
        </div>
      </div>

      {/* KPI Performance Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft">
          <span className="text-xs text-stone-500 font-medium block mb-1">
            {language === 'bn' ? 'প্রতি লিটার দুধে খাদ্য খরচ' : 'Feed Cost per Liter Milk'}
          </span>
          <div className="text-2xl font-black text-forest-800">৳৪২.৫০ / L</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {language === 'bn' ? 'মার্জিন: ৳৩২.৫০ / লিটার (বিক্রি ৳৭৫)' : 'Margin: BDT 32.50 / Liter'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft">
          <span className="text-xs text-stone-500 font-medium block mb-1">
            {language === 'bn' ? 'গড় দৈনিক ওজন বৃদ্ধি (ADG)' : 'Avg Daily Weight Gain (ADG)'}
          </span>
          <div className="text-2xl font-black text-amber-600">৯১৫ g / day</div>
          <p className="text-[11px] text-stone-500 mt-1">Brahman & Sahiwal bulls</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft">
          <span className="text-xs text-stone-500 font-medium block mb-1">
            {language === 'bn' ? 'খাদ্য ব্যয় অনুপাত (Feed Ratio)' : 'Feed-to-Revenue Ratio'}
          </span>
          <div className="text-2xl font-black text-stone-900">৫৬.৫%</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Healthy threshold (&lt;65%)</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft">
          <span className="text-xs text-stone-500 font-medium block mb-1">
            {language === 'bn' ? 'হার্ড সুস্থতা হার' : 'Herd Health Index'}
          </span>
          <div className="text-2xl font-black text-emerald-600">
            {Math.round((metrics.healthyCattle / (metrics.totalCattle || 1)) * 100)}%
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Active veterinary compliance</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milk Production Curves */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'গাভীভিত্তিক দুধ উৎপাদন পারফরম্যান্স (L/day)' : 'Individual Cow Daily Milk Yield Trends'}
              </h3>
              <p className="text-xs text-stone-500">Lactation curves for Rani, Shundori & Moni</p>
            </div>
            <Droplet size={18} className="text-blue-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={milkProductionHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis domain={[5, 22]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} unit="L" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Line type="monotone" dataKey="rani" name="Rani (HF Cross)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="shundori" name="Shundori (Sahiwal)" stroke="#d97706" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="moni" name="Moni (Jersey)" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Milk Margin vs Feed Cost */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'প্রতি লিটার দুধে খাদ্য খরচ বনাম বিক্রয়মূল্য' : 'Feed Cost per Liter vs Bulk Selling Price'}
              </h3>
              <p className="text-xs text-stone-500">Margin sustainability check (BDT per Liter)</p>
            </div>
            <DollarSign size={18} className="text-emerald-700" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feedCostPerLiterHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis domain={[0, 90]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} unit="৳" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar dataKey="salePrice" name={language === 'bn' ? 'বিক্রয়মূল্য' : 'Sale Price (BDT/L)'} fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="costPerLiter" name={language === 'bn' ? 'খাদ্য খরচ' : 'Feed Cost (BDT/L)'} fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
