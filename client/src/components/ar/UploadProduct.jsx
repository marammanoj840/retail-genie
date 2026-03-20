import React, { useState } from 'react';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';

/**
 * UploadProduct - Component for users to bring their own product PNGs into the AR engine
 */
export default function UploadProduct({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState('face');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'image/png') {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please upload a transparent PNG for the best result.");
    }
  };

  const handleApply = () => {
    if (!preview) return;
    onUpload({
      id: 'custom-' + Date.now(),
      name: 'Custom Upload',
      type: type,
      url: preview,
      description: 'User-uploaded custom product asset.'
    });
  };

  const clear = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-on-surface">Custom Try-On</h3>
        {preview && (
          <button onClick={clear} className="text-on-surface-variant hover:text-red-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {!preview ? (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-outline-variant rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary/50 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 text-on-surface-variant group-hover:text-primary mb-3" />
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Upload Transparent PNG</p>
          </div>
          <input type="file" className="hidden" accept="image/png" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="w-full h-40 bg-white/50 rounded-2xl border border-outline-variant flex items-center justify-center p-4">
             <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain filter drop-shadow-xl" />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">Select Placement Type</p>
            <div className="grid grid-cols-3 gap-2">
              {['face', 'head', 'body'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    type === t 
                      ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleApply}
            className="w-full py-4 bg-primary text-on-primary rounded-2xl font-black tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> APPLY CUSTOM PRODUCT
          </button>
        </div>
      )}
    </div>
  );
}
