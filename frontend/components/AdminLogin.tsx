import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // ⚠️ SECURITY NOTE: In a real production app with a backend, 
  // this validation should happen on the server, not in the browser code.
  // For this client-side prototype, this prevents casual access.
  const ADMIN_PASSWORD = "TechFlow2025"; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin(true);
      setError(false);
    } else {
      setError(true);
      // Shake animation trigger could go here
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-500">
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-950 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Admin Access</h2>
          <p className="text-slate-500 text-sm mt-2 text-center">
            Enter the secure passphrase to access the <br/> TechFlow Studio & Editor.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter Password"
              className={`w-full px-5 py-4 rounded-xl border-2 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none transition-all font-bold placeholder-slate-400 ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500'}`}
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center text-red-500 text-xs font-bold animate-pulse">
              <ShieldAlert className="w-3 h-3 mr-1" />
              Access Denied: Incorrect Password
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-xl flex items-center justify-center group"
          >
            Authenticate <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Restricted Area • Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;