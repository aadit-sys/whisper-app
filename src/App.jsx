import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, Unlock, Zap, Trash2, 
  Copy, Check, Clock, EyeOff, Key, 
  RefreshCcw, ShieldAlert, Fingerprint
} from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CryptoJS from 'crypto-js';

/**
 * MACBOOK DESIGN SYSTEM CONSTANTS
 * These mimic the exact opacity and blur of macOS Sequoia.
 */
const STYLES = {
  glass: "bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] shadow-[0_22px_70px_rgba(0,0,0,0.5)]",
  innerGlow: "after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
  input: "bg-black/30 border border-white/5 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none",
};

export default function UltimateSecureWhisper() {
  // --- STATE ENGINE ---
  const [stage, setStage] = useState('editor'); // editor | encrypting | success | viewing
  const [content, setContent] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [expiry, setExpiry] = useState('once');
  const [finalUrl, setFinalUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [burning, setBurning] = useState(false);

  // --- ENCRYPTION LOGIC ---
  const executeSecureGeneration = () => {
    if (!content) return;
    setStage('encrypting');

    setTimeout(() => {
      // AES-256 Encryption with a salt
      const encryptedData = CryptoJS.AES.encrypt(content, secretKey || 'whisper-system-salt').toString();
      const mockId = Math.random().toString(36).substring(2, 15);
      
      // In a real app, you would POST to your database here
      setFinalUrl(`${window.location.origin}/vault/${mockId}#${secretKey}`);
      setStage('success');
    }, 2400); // Artificial delay for "Security Feeling"
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#E2E2E2] font-sans selection:bg-indigo-500/40 flex items-center justify-center p-6 overflow-hidden">
      
      {/* MAC-STYLE BACKGROUND GRADIENTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <AnimatePresence mode="wait">
        {/* STAGE 1: THE EDITOR */}
        {stage === 'editor' && (
          <motion.div 
            key="editor"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            className={`${STYLES.glass} ${STYLES.innerGlow} relative w-full max-w-[700px] rounded-[38px] p-10 overflow-hidden`}
          >
            {/* Header Area */}
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Fingerprint size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Digital Whisper</h1>
                  <p className="text-white/40 text-sm">Military-grade ephemeral messaging.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/5" />
                <div className="w-3 h-3 rounded-full bg-white/5" />
                <div className="w-3 h-3 rounded-full bg-white/5" />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-8">
              <div className="relative group">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`${STYLES.input} w-full h-56 rounded-[24px] p-6 text-lg placeholder:text-white/10 resize-none`}
                  placeholder="Drop your sensitive information here..."
                />
                <div className="absolute bottom-4 right-4 text-[10px] text-white/20 font-mono">
                  {content.length} CHARS / AES-256
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold px-1 flex items-center gap-2">
                    <Key size={12} /> Privacy Key
                  </label>
                  <input 
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Optional Password"
                    className={`${STYLES.input} w-full px-5 py-4 rounded-2xl text-sm`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-white/30 font-bold px-1 flex items-center gap-2">
                    <Clock size={12} /> Auto-Destruct
                  </label>
                  <select 
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className={`${STYLES.input} w-full px-5 py-4 rounded-2xl text-sm appearance-none cursor-pointer`}
                  >
                    <option value="once">Burn After Reading</option>
                    <option value="5m">5 Minutes</option>
                    <option value="1h">1 Hour</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={executeSecureGeneration}
                disabled={!content}
                className="w-full relative group h-16 bg-white text-black font-bold rounded-[22px] overflow-hidden transition-all active:scale-[0.98] disabled:opacity-30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Generate Secure Vault <Zap size={18} fill="currentColor" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: ENCRYPTING ANIMATION */}
        {stage === 'encrypting' && (
          <motion.div 
            key="encrypting"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full mx-auto mb-8"
            />
            <h2 className="text-xl font-medium text-white/80 animate-pulse">Scrambling Data Fragments...</h2>
          </motion.div>
        )}

        {/* STAGE 3: SUCCESS & SHARING */}
        {stage === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${STYLES.glass} w-full max-w-[500px] rounded-[40px] p-12 text-center relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="text-green-400" size={48} />
            </div>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">Vault Secured</h2>
            <p className="text-white/40 mb-10 leading-relaxed">The link below will only work once. After it is accessed, the data is wiped from existence.</p>

            <div className="bg-black/40 border border-white/5 p-2 rounded-[22px] flex items-center mb-10">
              <span className="flex-1 px-4 text-left font-mono text-sm text-indigo-300 truncate">{finalUrl}</span>
              <CopyToClipboard text={finalUrl} onCopy={() => setIsCopied(true)}>
                <button className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-black hover:bg-indigo-100 transition-colors">
                  {isCopied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </CopyToClipboard>
            </div>

            <button 
              onClick={() => { setStage('editor'); setContent(''); }}
              className="text-white/30 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCcw size={14} /> Create New Secret
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER SECURITY BADGE */}
      <footer className="fixed bottom-10 flex items-center gap-8 text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          End-to-End Encryption
        </div>
        <div className="w-1 h-1 bg-white/10 rounded-full" />
        <div className="flex items-center gap-2">
          <ShieldAlert size={12} /> Zero Log Infrastructure
        </div>
      </footer>
    </div>
  );
}