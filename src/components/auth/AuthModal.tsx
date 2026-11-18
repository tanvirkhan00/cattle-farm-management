import React, { useState } from 'react';
import { 
  X, User, Lock, Mail, ShieldCheck, 
  UserCheck, LogIn, LogOut, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, role, isFirebaseActive, loginWithEmail, signupWithEmail, logout, switchDemoRole } = useAuth();
  const { language } = useLanguage();

  const [mode, setMode] = useState<'profile' | 'login' | 'signup'>('profile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('employee');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const res = await loginWithEmail(email, password);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage(language === 'bn' ? 'লগইন সফল হয়েছে!' : 'Login successful!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1000);
    } else {
      setErrorMessage(res.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const res = await signupWithEmail(email, password, displayName, selectedRole);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage(language === 'bn' ? 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!' : 'Account registered successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1000);
    } else {
      setErrorMessage(res.error || 'Signup failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-forest-800 text-white flex items-center justify-center font-bold text-xs">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'খামার লগইন ও অ্যাক্সেস কন্ট্রোল' : 'Farm Access & Authentication'}
              </h3>
              <p className="text-[11px] text-stone-500">
                {isFirebaseActive ? 'Firebase Auth Managed' : 'Local Role Engine'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-700">
            <X size={18} />
          </button>
        </div>

        {/* Success or Error Alert */}
        {successMessage && (
          <div className="m-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
            <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="m-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 text-xs space-y-4">
          {mode === 'profile' && (
            <div className="space-y-4">
              {/* Current Active User Card */}
              <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-200 flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-forest-800 text-white flex items-center justify-center font-bold text-sm">
                  {currentUser?.displayName?.substring(0, 2).toUpperCase() || 'US'}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{currentUser?.displayName || 'Farm User'}</h4>
                  <p className="text-[11px] text-stone-500">{currentUser?.email || 'local@farm.bd'}</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase
                      ${role === 'admin' ? 'bg-forest-100 text-forest-800 border border-forest-300' : 'bg-blue-100 text-blue-800 border border-blue-300'}
                    `}>
                      Role: {role}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {role === 'admin' ? '(Full Ownership Permissions)' : '(Operational Caretaker)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Role Switcher Button for Instant Testing */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="font-bold text-stone-700 block">
                  {language === 'bn' ? 'ভূমিকা পরীক্ষা করুন (Quick Role Switch):' : 'Switch Role Mode:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => switchDemoRole('admin')}
                    className={`py-2 px-3 rounded-xl font-bold text-center border transition flex items-center justify-center space-x-1.5
                      ${role === 'admin' ? 'bg-forest-700 text-white border-forest-700 shadow-xs' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'}
                    `}
                  >
                    <ShieldCheck size={14} />
                    <span>Admin (মালিক)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => switchDemoRole('employee')}
                    className={`py-2 px-3 rounded-xl font-bold text-center border transition flex items-center justify-center space-x-1.5
                      ${role === 'employee' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'}
                    `}
                  >
                    <UserCheck size={14} />
                    <span>Employee (কর্মী)</span>
                  </button>
                </div>
                <p className="text-[10px] text-stone-400 italic">
                  {role === 'admin' 
                    ? 'Admin has full access to financial balances, sales, purchases, and farm settings.' 
                    : 'Employee role is restricted to logging daily routines, feeding, milking, and reporting health checks.'}
                </p>
              </div>

              {/* Login/Signup Toggles if Firebase is Active */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-forest-700 hover:underline flex items-center space-x-1"
                >
                  <LogIn size={13} />
                  <span>{language === 'bn' ? 'ইমেইল দিয়ে লগইন' : 'Sign in with Email'}</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    onClose();
                  }}
                  className="font-semibold text-rose-600 hover:underline flex items-center space-x-1"
                >
                  <LogOut size={13} />
                  <span>{language === 'bn' ? 'লগআউট' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="email"
                    required
                    placeholder="owner@smartcattlefarm.bd"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-stone-500 hover:text-stone-800 underline"
                >
                  {language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create new account'}
                </button>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setMode('profile')}
                    className="px-3 py-1.5 rounded-xl border border-stone-300"
                  >
                    {language === 'bn' ? 'পিছনে' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 rounded-xl bg-forest-700 text-white font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? '...' : (language === 'bn' ? 'লগইন' : 'Sign In')}
                  </button>
                </div>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Md. Tariqul Islam"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email'}</label>
                <input
                  type="email"
                  required
                  placeholder="user@smartcattlefarm.bd"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)' : 'Password (min 6 chars)'}</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'ব্যবহারকারীর ভূমিকা (Role)' : 'Role'}</label>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold"
                >
                  <option value="admin">Admin (Farm Owner / Manager - Full Access)</option>
                  <option value="employee">Employee (Farm Worker / Attendant - Operations)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-stone-500 hover:text-stone-800 underline"
                >
                  {language === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন' : 'Already have account? Login'}
                </button>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setMode('profile')}
                    className="px-3 py-1.5 rounded-xl border border-stone-300"
                  >
                    {language === 'bn' ? 'পিছনে' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 rounded-xl bg-forest-700 text-white font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? '...' : (language === 'bn' ? 'রেজিস্ট্রেশন' : 'Register')}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
