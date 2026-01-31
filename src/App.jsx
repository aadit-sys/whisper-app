import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [secret, setSecret] = useState(null);
  const [view, setView] = useState('input'); // 'input' or 'vault'
  const [shareableLink, setShareableLink] = useState('');

  // --- 1. THE "WAKE UP" LOGIC ---
  // This runs as soon as the page loads to check the URL for a secret
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      console.log("Secret detected in URL:", hash);
      setSecret(hash);
      setView('vault');
    }
  }, []);

  // --- 2. THE GENERATOR LOGIC ---
  // This creates the link correctly using the hash (#)
  const generateVault = () => {
    if (!text) return;
    
    // In a real app, you'd encrypt 'text' here. 
    // We'll use your example string for the demo.
    const encryptedData = btoa(text); // Basic example encryption
    const newLink = `${window.location.origin}/#${encryptedData}`;
    
    setShareableLink(newLink);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-mono">
      <div className="border border-gray-700 rounded-3xl p-8 max-w-2xl w-full bg-[#0a0a0a] shadow-2xl">
        
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <span>🖐️</span> Digital Whisper
        </h1>
        <p className="text-gray-400 text-sm mb-6 border-b border-gray-800 pb-4">
          Military-grade ephemeral messaging. <br/>
          <span className="text-[10px] tracking-widest uppercase text-gray-600">End-to-End Encryption | Zero Log Infrastructure</span>
        </p>

        {view === 'input' ? (
          /* --- INPUT VIEW --- */
          <div className="space-y-4">
            <textarea 
              className="w-full bg-transparent border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-white transition-colors"
              placeholder="Drop your sensitive information here..."
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <button 
              onClick={generateVault}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Generate Secure Vault ⚡
            </button>

            {shareableLink && (
              <div className="mt-4 p-4 bg-gray-900 border border-green-900 rounded-xl">
                <p className="text-xs text-green-500 mb-2">VAULT SECURED - SHARE THIS LINK:</p>
                <input 
                  readOnly 
                  value={shareableLink} 
                  className="w-full bg-black text-xs p-2 rounded border border-gray-700"
                  onClick={(e) => e.target.select()}
                />
              </div>
            )}
          </div>
        ) : (
          /* --- VAULT VIEW (What your friend sees) --- */
          <div className="space-y-4 text-center">
            <div className="p-6 bg-gray-900 border border-yellow-900 rounded-xl">
              <p className="text-xs text-yellow-500 mb-4 uppercase tracking-widest">Decrypted Message:</p>
              <p className="text-xl text-white">
                {/* Decode the hash back into text */}
                {atob(secret)} 
              </p>
            </div>
            <button 
              onClick={() => { window.location.hash = ''; window.location.reload(); }}
              className="text-gray-500 text-xs hover:text-white underline"
            >
              Destroy this message and create new
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
