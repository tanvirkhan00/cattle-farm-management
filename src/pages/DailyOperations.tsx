import React, { useState } from 'react';
import { 
  CheckSquare, Plus, Clock, User, AlertCircle, 
  CheckCircle2, Trash2, Calendar, X 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { TaskCategory, TaskPriority } from '../types';

export const DailyOperations: React.FC = () => {
  const { language } = useLanguage();
  const { tasks, addTask, toggleTaskCompletion, deleteTask, metrics } = useFarm();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // New task form state
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [category, setCategory] = useState<TaskCategory>('feeding');
  const [assignedWorker, setAssignedWorker] = useState('Rafiqul Islam');
  const [scheduledTime, setScheduledTime] = useState('08:00');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [notes, setNotes] = useState('');

  const filteredTasks = tasks.filter(t => categoryFilter === 'all' || t.category === categoryFilter);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn && !titleBn) return;

    addTask({
      titleEn: titleEn || titleBn,
      titleBn: titleBn || titleEn,
      category,
      assignedWorker,
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime,
      isCompleted: false,
      priority,
      notes
    });

    setIsAddingTask(false);
    setTitleEn('');
    setTitleBn('');
    setNotes('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
            <CheckSquare size={14} />
            <span>{language === 'bn' ? 'দৈনিক কার্যতালিকা ও শিফট বণ্টন' : 'Daily Farm Operations & Shift Roster'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'bn' ? 'দৈনিক খামার কার্যক্রম ও কর্মী দায়িত্ব বণ্টন' : 'Daily Operations & Task Roster'}
          </h2>
          <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'সকাল ও সন্ধ্যার দুধ দোহন, কাঁচা ঘাস ও দানাদার বিতরণ, শেড জীবাণুমুক্তকরণ এবং অসুস্থ পশুর ওষুধ প্রয়োগের ট্র্যাকিং।'
              : 'Supervise morning/afternoon feeding shifts, teat disinfection, shed hygiene, and worker assignments.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddingTask(true)}
          className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>{language === 'bn' ? 'নতুন কাজ যোগ করুন' : 'Assign New Task'}</span>
        </button>
      </div>

      {/* Task Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <span className="text-stone-500 text-xs font-medium">{language === 'bn' ? 'মোট নির্ধারিত কাজ' : 'Total Tasks Today'}</span>
          <div className="text-2xl font-black text-stone-900 mt-1">{tasks.length}</div>
          <p className="text-[11px] text-stone-400">Routine schedule</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <span className="text-stone-500 text-xs font-medium">{language === 'bn' ? 'সম্পন্ন হয়েছে' : 'Completed Tasks'}</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {tasks.filter(t => t.isCompleted).length}
          </div>
          <p className="text-[11px] text-stone-400">Shift verified</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <span className="text-stone-500 text-xs font-medium">{language === 'bn' ? 'বাকি আছে' : 'Pending Remaining'}</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {metrics.pendingTasksCount}
          </div>
          <p className="text-[11px] text-stone-400">Afternoon & evening tasks</p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1 text-xs">
        {['all', 'milking', 'feeding', 'shed_cleaning', 'medication'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-2 rounded-xl font-semibold capitalize whitespace-nowrap transition
              ${categoryFilter === cat ? 'bg-forest-800 text-white shadow-xs' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}
            `}
          >
            {cat === 'all' ? (language === 'bn' ? 'সকল কাজ' : 'All') : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Task Checklist Cards */}
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`p-4 rounded-3xl border transition flex items-center justify-between text-xs
              ${task.isCompleted ? 'bg-stone-50/70 border-stone-200 text-stone-400' : 'bg-white border-stone-200 shadow-soft text-stone-900'}
            `}
          >
            <div className="flex items-center space-x-3.5">
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`w-6 h-6 rounded-xl flex items-center justify-center transition border
                  ${task.isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 hover:border-forest-600 text-transparent'}
                `}
                title="Mark Completed / Incomplete"
              >
                <CheckCircle2 size={16} />
              </button>

              <div className="space-y-0.5">
                <p className={`font-bold text-sm ${task.isCompleted ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                  {language === 'bn' ? task.titleBn : task.titleEn}
                </p>
                <div className="flex items-center space-x-3 text-[11px] text-stone-500">
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{task.scheduledTime || 'Shift'}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <User size={12} />
                    <span>{task.assignedWorker || 'Unassigned'}</span>
                  </span>
                  <span className="capitalize text-forest-800 font-semibold">{task.category.replace('_', ' ')}</span>
                </div>
                {task.notes && (
                  <p className="text-[11px] text-stone-600 italic pt-0.5">{task.notes}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px]
                ${task.priority === 'urgent' ? 'bg-rose-100 text-rose-800' : task.priority === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'}
              `}>
                {task.priority.toUpperCase()}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-stone-400 hover:text-rose-600 p-1"
                title="Delete Task"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isAddingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-md p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'নতুন খামার কাজ নির্ধারণ' : 'Assign Daily Task'}
              </h3>
              <button onClick={() => setIsAddingTask(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'কাজের নাম (বাংলা)' : 'Task Title (Bengali)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. বিকালের সাইলেজ ও দানাদার বিতরণ"
                  value={titleBn}
                  onChange={e => setTitleBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'কাজের নাম (English)' : 'Task Title (English)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Afternoon silage distribution"
                  value={titleEn}
                  onChange={e => setTitleEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="feeding">Feeding (খাদ্য)</option>
                    <option value="milking">Milking (দোহন)</option>
                    <option value="shed_cleaning">Shed Cleaning (পরিষ্কার)</option>
                    <option value="medication">Medication (ওষুধ)</option>
                    <option value="health_check">Health Check (স্বাস্থ্য)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'নির্ধারিত কর্মী' : 'Assigned Worker'}
                  </label>
                  <input
                    type="text"
                    value={assignedWorker}
                    onChange={e => setAssignedWorker(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'নির্ধারিত সময়' : 'Time'}
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={e => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {language === 'bn' ? 'অগ্রাধিকার' : 'Priority'}
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
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
