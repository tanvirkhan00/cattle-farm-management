import React from 'react';
import { 
  Boxes, Heart, Activity, AlertTriangle, Baby, 
  DollarSign, TrendingUp, TrendingDown, Package, 
  Syringe, CheckSquare, Calendar, ArrowUpRight, 
  ShieldAlert, Sparkles, Scale 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { NavLink } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const { metrics, cattleList, transactions, tasks, vaccinations } = useFarm();

  // Color constants for charts
  const COLORS = {
    healthy: '#10b981',
    observation: '#f59e0b',
    treatment: '#ef4444',
    forest: '#2d6a4f',
    gold: '#eab308'
  };

  // Health distribution data for Pie Chart
  const healthDistributionData = [
    { name: language === 'bn' ? 'সুস্থ (Healthy)' : 'Healthy', value: metrics.healthyCattle, color: '#10b981' },
    { name: language === 'bn' ? 'চিকিৎসাধীন (Treatment)' : 'Under Treatment', value: metrics.underTreatmentCattle, color: '#ef4444' },
    { name: language === 'bn' ? 'অসুস্থ (Sick)' : 'Sick', value: metrics.sickCattle, color: '#f59e0b' }
  ].filter(d => d.value > 0);

  // Monthly financial cashflow trend
  const financialData = [
    { month: language === 'bn' ? 'আগস্ট' : 'Aug', income: 125000, expense: 98000 },
    { month: language === 'bn' ? 'সেপ্টেম্বর' : 'Sep', income: 142000, expense: 110000 },
    { month: language === 'bn' ? 'অক্টোবর' : 'Oct', income: 146250, expense: 104500 },
    { month: language === 'bn' ? 'নভেম্বর' : 'Nov', income: metrics.monthlyRevenue, expense: metrics.monthlyExpenses },
  ];

  // Weight growth trend of prime cattle
  const weightGrowthData = [
    { period: 'Day 0', bahubali: 420, raja: 390, rani: 430 },
    { period: 'Day 30', bahubali: 450, raja: 410, rani: 442 },
    { period: 'Day 60', bahubali: 485, raja: 432, rani: 454 },
    { period: 'Day 90', bahubali: 535, raja: 460, rani: 465 },
  ];

  // Feed consumption estimate per day by category (kg)
  const feedConsumptionData = [
    { category: language === 'bn' ? 'সবুজ নেপিয়ার' : 'Green Napier', kg: 185 },
    { category: language === 'bn' ? 'ভুট্টা সাইলেজ' : 'Corn Silage', kg: 60 },
    { category: language === 'bn' ? 'শুকনো খড়' : 'Paddy Straw', kg: 38 },
    { category: language === 'bn' ? 'দানাদার মিশ্রণ' : 'Concentrate', kg: 32 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner Alert / Greeting */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-white p-6 shadow-card">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-700/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-700/80 border border-forest-600 text-xs font-semibold text-emerald-200 mb-2">
              <Sparkles size={14} />
              <span>{language === 'bn' ? 'লাইভ ফার্ম ইন্টেলিজেন্স' : 'Live Farm Intelligence'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              {language === 'bn' ? 'খামার সারসংক্ষেপ ও অপারেশন ড্যাশবোর্ড' : 'Farm Operations & Intelligence Overview'}
            </h2>
            <p className="text-xs md:text-sm text-forest-100/90 mt-1 max-w-2xl">
              {language === 'bn' 
                ? 'বাস্তব খামার তথ্যের ভিত্তিতে তৈরি স্বয়ংক্রিয় অর্থনৈতিক, স্বাস্থ্য ও পুষ্টি পরিসংখ্যান।'
                : 'Real-time herd analytics, health metrics, financial cashflow, and seasonal risk alerts.'}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <NavLink
              to="/advisor"
              className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs shadow-glow flex items-center space-x-2 transition"
            >
              <Sparkles size={16} />
              <span>{language === 'bn' ? 'এআই উপদেষ্টাকে জিজ্ঞাসা করুন' : 'Ask AI Advisor'}</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Row 1: Primary Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Cattle */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">{language === 'bn' ? 'মোট গরু' : 'Total Cattle'}</span>
            <div className="w-7 h-7 rounded-lg bg-forest-50 text-forest-700 flex items-center justify-center">
              <Boxes size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900 tracking-tight">{metrics.totalCattle}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {metrics.healthyCattle} {language === 'bn' ? 'টি শতভাগ সুস্থ' : 'fully healthy'}
          </p>
        </div>

        {/* Healthy Cattle */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">{language === 'bn' ? 'সুস্থ গরু' : 'Healthy'}</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight">{metrics.healthyCattle}</div>
          <p className="text-[11px] text-stone-500 mt-1">
            {Math.round((metrics.healthyCattle / (metrics.totalCattle || 1)) * 100)}% {language === 'bn' ? 'হার্ড সুস্থতা' : 'herd rate'}
          </p>
        </div>

        {/* Under Treatment */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">{language === 'bn' ? 'চিকিৎসাধীন' : 'Under Care'}</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Activity size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 tracking-tight">{metrics.underTreatmentCattle}</div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">
            {language === 'bn' ? 'ভেটেরিনারি মনিটরিং' : 'vet follow-up'}
          </p>
        </div>

        {/* Pregnant Cattle */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">{language === 'bn' ? 'গর্ভবতী গাভী' : 'Pregnant'}</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Baby size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo-600 tracking-tight">{metrics.pregnantCattle}</div>
          <p className="text-[11px] text-stone-500 mt-1">
            {language === 'bn' ? 'বাছুর প্রত্যাশিত' : 'calving expected'}
          </p>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">{language === 'bn' ? 'মাসিক আয়' : 'Monthly Income'}</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-xl font-black text-stone-900 tracking-tight">
            ৳{metrics.monthlyRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            {language === 'bn' ? 'দুধ ও উপজাত বিক্রয়' : 'milk & byproduct'}
          </p>
        </div>

        {/* Estimated Profit/Loss */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">{language === 'bn' ? 'নীট লাভ/ঘাটতি' : 'Net Margin'}</span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${metrics.estimatedProfitLoss >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              <DollarSign size={16} />
            </div>
          </div>
          <div className={`text-xl font-black tracking-tight ${metrics.estimatedProfitLoss >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            ৳{metrics.estimatedProfitLoss.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            {metrics.estimatedProfitLoss >= 0 ? (language === 'bn' ? 'চলতি মাসে লাভজনক' : 'profitable') : (language === 'bn' ? 'সাময়িক ঘাটতি' : 'negative')}
          </p>
        </div>
      </div>

      {/* Row 2: Secondary Operation Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Package size={22} />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium">
              {language === 'bn' ? 'মোট খাদ্য মজুদ' : 'Total Feed Stock'}
            </span>
            <div className="text-lg font-bold text-stone-900">
              {metrics.totalFeedInventoryKg.toLocaleString()} kg
            </div>
            <p className="text-[10px] text-stone-500">
              {metrics.lowStockItemsCount} {language === 'bn' ? 'টি উপাদান কম স্টকে' : 'items low threshold'}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center flex-shrink-0">
            <Syringe size={22} />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium">
              {language === 'bn' ? 'আসন্ন টিকা রিমাইন্ডার' : 'Upcoming Vaccines'}
            </span>
            <div className="text-lg font-bold text-stone-900">
              {metrics.upcomingVaccinationsCount} {language === 'bn' ? 'টি নির্ধারিত' : 'scheduled'}
            </div>
            <p className="text-[10px] text-forest-700 font-semibold">
              {language === 'bn' ? 'পোস্ট-মনসুন কৃমিনাশক' : 'post-monsoon deworming'}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
            <CheckSquare size={22} />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium">
              {language === 'bn' ? 'আজকের অসমাপ্ত কাজ' : 'Pending Tasks'}
            </span>
            <div className="text-lg font-bold text-stone-900">
              {metrics.pendingTasksCount} {language === 'bn' ? 'টি কাজ বাকি' : 'tasks remaining'}
            </div>
            <p className="text-[10px] text-stone-500">
              {language === 'bn' ? 'বিকালের শিফট ও পরিচর্যা' : 'afternoon routine'}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-soft flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <DollarSign size={22} />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium">
              {language === 'bn' ? 'মোট গবাদিপশু বিনিয়োগ' : 'Cattle Asset Value'}
            </span>
            <div className="text-lg font-bold text-stone-900">
              ৳{metrics.totalInvestment.toLocaleString()}
            </div>
            <p className="text-[10px] text-stone-500">
              {metrics.totalCattle} {language === 'bn' ? 'টি গরুর ক্রয়মূল্য' : 'head acquisition value'}
            </p>
          </div>
        </div>
      </div>

      {/* Row 3: Charts Grid (Financial Trend + Herd Health Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Cash Flow Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'মাসিক আয় বনাম পরিচালন ব্যয় (Cash Flow Trend)' : 'Monthly Revenue vs Operating Costs'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'দুধ বিক্রি আয় এবং খাদ্য ও বেতন ব্যয়' : 'Milk revenue vs feed & labor expenses'}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-semibold">
              <span className="flex items-center text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mr-1.5" />
                {language === 'bn' ? 'আয় (Income)' : 'Income'}
              </span>
              <span className="flex items-center text-rose-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5" />
                {language === 'bn' ? 'ব্যয় (Expense)' : 'Expense'}
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickFormatter={v => `৳${v/1000}k`} />
                <Tooltip 
                  formatter={(val: any) => [`৳${val.toLocaleString()}`, '']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#incomeGrad)" />
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#expenseGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Herd Health Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-sm">
              {language === 'bn' ? 'গবাদিপশুর স্বাস্থ্য অবস্থা' : 'Herd Health Status'}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'bn' ? 'সুস্থ বনাম চিকিৎসাধীন অনুপাত' : 'Healthy vs treatment breakdown'}
            </p>
          </div>

          <div className="h-52 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {healthDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
            {healthDistributionData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-stone-800">{item.value} {language === 'bn' ? 'টি' : 'head'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Weight Growth Curve & Daily Feed Consumption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Growth Performance */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'কুরবানি ষাঁড়ের ওজন বৃদ্ধি চার্ট (Weight Gain ADG)' : 'Sacrificial Bull Weight Gain Trend'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'ব্রাহমা ও শাহীওয়াল ষাঁড়ের ৯০ দিনের প্রবৃদ্ধি' : 'Live weight trajectory for Bahubali, Raja & Rani'}
              </p>
            </div>
            <Scale size={18} className="text-forest-600" />
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightGrowthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis domain={[350, 560]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} unit="kg" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="bahubali" name="Bahubali (ব্রাহমা)" stroke="#2d6a4f" fill="#2d6a4f" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="raja" name="Raja (শাহীওয়াল)" stroke="#d97706" fill="#d97706" fillOpacity={0.08} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feed Consumption Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'দৈনিক খাদ্য ব্যবহারের অনুপাত (কেজি)' : 'Daily Feed Consumption Breakdown (kg)'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'কাঁচা ঘাস, সাইলেজ, খড় ও দানাদারের সমতা' : 'Roughage vs concentrate daily distribution'}
              </p>
            </div>
            <Package size={18} className="text-amber-600" />
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feedConsumptionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} unit="kg" />
                <Tooltip 
                  formatter={(val: any) => [`${val} kg / day`, 'Consumption']}
                  contentStyle={{ borderRadius: 12, fontSize: 12 }} 
                />
                <Bar dataKey="kg" fill="#439564" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 5: Upcoming Farm Activities & Immediate Health Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Farm Tasks checklist */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'আজকের খামার কার্যক্রম ও রুটিন' : 'Daily Farm Operations Checklist'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'সকাল, দুপুর ও সন্ধ্যার নিয়মিত তদারকি' : 'Milking, feeding and cleaning duties'}
              </p>
            </div>
            <NavLink to="/operations" className="text-xs font-semibold text-forest-700 hover:underline flex items-center">
              {language === 'bn' ? 'সব কাজ দেখুন' : 'View all'}
              <ArrowUpRight size={14} className="ml-0.5" />
            </NavLink>
          </div>

          <div className="space-y-2.5">
            {tasks.slice(0, 4).map(task => (
              <div 
                key={task.id} 
                className={`p-3 rounded-2xl border flex items-center justify-between transition
                  ${task.isCompleted ? 'bg-stone-50/60 border-stone-200/60 text-stone-400' : 'bg-white border-stone-200 shadow-xs text-stone-800'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${task.isCompleted ? 'bg-stone-300' : 'bg-forest-600'}`} />
                  <div>
                    <p className={`text-xs font-semibold ${task.isCompleted ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                      {language === 'bn' ? task.titleBn : task.titleEn}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      {task.scheduledTime} • {task.assignedWorker || 'Unassigned'}
                    </p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                  ${task.priority === 'urgent' ? 'bg-rose-100 text-rose-800' : task.priority === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'}
                `}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Health Follow-ups & Withdrawals */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'জরুরি স্বাস্থ্য ও প্রত্যাহার (Withdrawal) সতর্কতা' : 'Health Alerts & Withdrawal Guardrails'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'অ্যান্টিবায়োটিক দুধ ও মাংস উইথড্রয়াল সময়' : 'Active veterinary prescription tracking'}
              </p>
            </div>
            <ShieldAlert size={18} className="text-rose-600" />
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-900">Cow BD-GZP-105 (Moni)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-800">
                  {language === 'bn' ? 'দুধ উইথড্রয়াল চলমান' : 'Milk Withheld'}
                </span>
              </div>
              <p className="text-amber-800 text-[11px]">
                {language === 'bn' 
                  ? 'সাবক্লিনিক্যাল ওলান ফোলা শনাক্ত হয়েছে। ১৭ নভেম্বর পর্যন্ত বাম পেছনের বাটের দুধ বিক্রি বা পান করা থেকে বিরত থাকুন।'
                  : 'Subclinical mastitis under herbal protocol. Keep milk separated until CMT test clearance.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-forest-50 border border-forest-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-forest-900">Cow BD-GZP-107 (Padma)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-200 text-forest-800">
                  {language === 'bn' ? 'উন্নতি লক্ষ্যণীয়' : 'Improving'}
                </span>
              </div>
              <p className="text-forest-800 text-[11px]">
                {language === 'bn'
                  ? 'পায়ের খুর পচা ক্ষত শুকিয়ে আসছে। দিনে একবার টেট্রাসাইক্লিন স্প্রে ও শুকনো মেঝের ব্যবস্থা বহাল রাখুন।'
                  : 'Interdigital lesion resolving. Continue dry lime bedding and topical antiseptic spray.'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between">
              <span>{language === 'bn' ? 'আসন্ন পোস্ট-মনসুন কৃমিনাশক ক্যাম্পেইন:' : 'Next Deworming Target:'}</span>
              <span className="font-bold text-stone-800">25 Nov 2026 (Albendazole / Triclabendazole)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
