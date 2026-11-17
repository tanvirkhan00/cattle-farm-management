import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, Download, 
  Plus, Filter, Calendar, FileText, ArrowUpRight, 
  Trash2, X, CheckCircle2 
} from 'lucide-react';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { FinancialTransaction, TransactionCategory } from '../types';

export const FinancialManagement: React.FC = () => {
  const { language } = useLanguage();
  const { transactions, addTransaction, deleteTransaction, metrics } = useFarm();

  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [txType, setTxType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState<TransactionCategory>('feed_purchase');
  const [amountBdt, setAmountBdt] = useState('15000');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank_transfer' | 'bkash'>('cash');
  const [vendorBuyer, setVendorBuyer] = useState('');
  const [description, setDescription] = useState('');

  const filteredTransactions = transactions.filter(t => {
    const matchesType = filterType === 'all' || t.transactionType === filterType;
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchesType && matchesCategory;
  });

  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amountBdt);
    if (!amt || amt <= 0) return;

    addTransaction({
      transactionType: txType,
      category,
      amountBdt: amt,
      transactionDate: date,
      paymentMethod,
      vendorBuyerName: vendorBuyer || undefined,
      description: description || 'Routine farm operation expense/income'
    });

    setIsAdding(false);
  };

  // Export to CSV function
  const handleExportCsv = () => {
    const headers = ['Date', 'Type', 'Category', 'Amount (BDT)', 'Payment Method', 'Description'];
    const rows = transactions.map(t => [
      t.transactionDate,
      t.transactionType.toUpperCase(),
      t.category,
      t.amountBdt,
      t.paymentMethod,
      `"${t.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `smart_cattle_farm_financial_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Category breakdown for expenses
  const expenseByCategory = transactions
    .filter(t => t.transactionType === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amountBdt;
      return acc;
    }, {} as Record<string, number>);

  const categoryChartData = Object.entries(expenseByCategory).map(([cat, amount]) => ({
    category: cat.replace('_', ' '),
    amount
  }));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
            <DollarSign size={14} />
            <span>{language === 'bn' ? 'খামার হিসাববিজ্ঞান ও ক্যাশফ্লো' : 'Farm Accounting & Cashflow Ledger'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'bn' ? 'আর্থিক ব্যবস্থাপনা ও লাভ-ক্ষতির খতিয়ান' : 'Financial Management & P&L Analysis'}
          </h2>
          <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'দুধ ও পশুর বিক্রয় আয়, খাদ্য ও চিকিৎসা ব্যয়, শ্রমিক বেতন এবং পশুভিত্তিক ব্যয়ের নির্ভুল স্বয়ংক্রিয় হিসাব।'
              : 'Complete ledger accounting distinguishing operating cashflow from capital cattle asset investments.'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-2xl border border-stone-300 hover:bg-stone-50 font-bold text-xs text-stone-700 transition flex items-center space-x-1.5 shadow-xs"
          >
            <Download size={15} />
            <span>{language === 'bn' ? 'সিএসভি রিপোর্ট ডাউনলোড' : 'Export CSV'}</span>
          </button>

          <button
            onClick={() => setIsAdding(true)}
            className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>{language === 'bn' ? 'নতুন হিসাব এন্ট্রি' : 'Add Transaction'}</span>
          </button>
        </div>
      </div>

      {/* Financial Scoreboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft">
          <span className="text-xs text-stone-500 font-medium block mb-1">
            {language === 'bn' ? 'চলতি মাসে মোট আয়' : 'Total Revenue'}
          </span>
          <div className="text-2xl font-black text-emerald-700">
            ৳{metrics.monthlyRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Milk collections & byproduct sales</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft">
          <span className="text-xs text-stone-500 font-medium block mb-1">
            {language === 'bn' ? 'চলতি পরিচালন ব্যয়' : 'Total Operating Costs'}
          </span>
          <div className="text-2xl font-black text-rose-600">
            ৳{metrics.monthlyExpenses.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Feeds, wages & medical overheads</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft">
          <span className="text-xs text-stone-500 font-medium block mb-1">
            {language === 'bn' ? 'কার্যকরী নীট মার্জিন' : 'Net Operating Profit'}
          </span>
          <div className={`text-2xl font-black ${metrics.estimatedProfitLoss >= 0 ? 'text-forest-900' : 'text-rose-600'}`}>
            ৳{metrics.estimatedProfitLoss.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            {metrics.estimatedProfitLoss >= 0 ? 'Cash positive operating margin' : 'Deficit'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft">
          <span className="text-xs text-stone-500 font-medium block mb-1">
            {language === 'bn' ? 'গবাদিপশু সম্পদ মূলধন' : 'Cattle Asset Value'}
          </span>
          <div className="text-2xl font-black text-stone-900">
            ৳{metrics.totalInvestment.toLocaleString()}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Acquisition capital held in herd</p>
        </div>
      </div>

      {/* Expense Categories Chart */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
        <h3 className="font-bold text-stone-900 text-sm">
          {language === 'bn' ? 'ব্যয়ের খাতভিত্তিক বিভাজন (Expense Breakdown)' : 'Expense Breakdown by Category'}
        </h3>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickFormatter={v => `৳${v/1000}k`} />
              <Tooltip formatter={(val: any) => [`৳${val.toLocaleString()}`, 'Amount']} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="amount" fill="#32794f" radius={[8, 8, 0, 0]} barSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter and Transaction Ledger Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden space-y-3 p-6 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <h3 className="font-bold text-stone-900 text-sm">
            {language === 'bn' ? 'দৈনিক লেনদেন রেজিস্টার (Ledger)' : 'Daily Ledger Transactions'}
          </h3>

          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 font-medium"
            >
              <option value="all">{language === 'bn' ? 'সকল লেনদেন' : 'All Types'}</option>
              <option value="income">{language === 'bn' ? 'আয় (Income)' : 'Income'}</option>
              <option value="expense">{language === 'bn' ? 'ব্যয় (Expense)' : 'Expense'}</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-bold">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                <th className="py-3 px-4 font-bold">{language === 'bn' ? 'ধরণ' : 'Type'}</th>
                <th className="py-3 px-4 font-bold">{language === 'bn' ? 'খাত' : 'Category'}</th>
                <th className="py-3 px-4 font-bold">{language === 'bn' ? 'পরিমাণ (টাকা)' : 'Amount'}</th>
                <th className="py-3 px-4 font-bold">{language === 'bn' ? 'মাধ্যম' : 'Method'}</th>
                <th className="py-3 px-4 font-bold">{language === 'bn' ? 'বিবরণ' : 'Description'}</th>
                <th className="py-3 px-4 font-bold text-right">{language === 'bn' ? 'পদক্ষেপ' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-stone-50/60 transition">
                  <td className="py-3 px-4 font-medium text-stone-600">{tx.transactionDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px]
                      ${tx.transactionType === 'income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}
                    `}>
                      {tx.transactionType.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-900 capitalize">{tx.category.replace('_', ' ')}</td>
                  <td className="py-3 px-4 font-black text-stone-900">৳{tx.amountBdt.toLocaleString()}</td>
                  <td className="py-3 px-4 text-stone-500 uppercase">{tx.paymentMethod}</td>
                  <td className="py-3 px-4 text-stone-600 max-w-xs truncate">{tx.description}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-1 rounded-lg text-stone-400 hover:text-rose-600 transition"
                      title="Delete Entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-md p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'নতুন আয় বা ব্যয় এন্ট্রি' : 'Add Financial Transaction'}
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTransaction} className="space-y-3">
              <div className="flex rounded-xl p-1 bg-stone-100">
                <button
                  type="button"
                  onClick={() => setTxType('expense')}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-center transition
                    ${txType === 'expense' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-600'}
                  `}
                >
                  {language === 'bn' ? 'ব্যয় (Expense)' : 'Expense'}
                </button>
                <button
                  type="button"
                  onClick={() => setTxType('income')}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-center transition
                    ${txType === 'income' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-600'}
                  `}
                >
                  {language === 'bn' ? 'আয় (Income)' : 'Income'}
                </button>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'খাত (Category)' : 'Category'}</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  {txType === 'expense' ? (
                    <>
                      <option value="feed_purchase">Feed Purchase (খাদ্য ক্রয়)</option>
                      <option value="labor_wages">Labor Wages (শ্রমিক বেতন)</option>
                      <option value="veterinary_medicine">Veterinary & Medicine (ওষুধ ও সেবা)</option>
                      <option value="electricity_utility">Electricity & Utility (বিল)</option>
                      <option value="farm_maintenance">Farm Maintenance (মেরামত)</option>
                    </>
                  ) : (
                    <>
                      <option value="milk_sale">Milk Sale (দুধ বিক্রি)</option>
                      <option value="cattle_sale">Cattle Sale (গরু বিক্রি)</option>
                      <option value="manure_vermicompost_sale">Organic Compost Sale (সার বিক্রি)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'পরিমাণ (টাকা) *' : 'Amount (BDT) *'}</label>
                  <input
                    type="number"
                    required
                    value={amountBdt}
                    onChange={e => setAmountBdt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'তারিখ' : 'Date'}</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'বিবরণ' : 'Description'}</label>
                <input
                  type="text"
                  placeholder="e.g. 10 bags crushed corn payment"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
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
