import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react';

export const PrescriptionUpload = ({
  prescriptionFile,
  onUploadSuccess,
  onRemoveFile
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  const handleFileProcess = (file) => {
    setError(null);
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid file format (JPG, PNG, or PDF).');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onUploadSuccess({
        fileId: `rx-${Date.now().toString(36)}`,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileUrl: e.target?.result // In-memory secure preview
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      {prescriptionFile ? (
        <div className="flex items-center justify-between p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {prescriptionFile.fileName}
                </p>
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              </div>
              <p className="text-[10px] text-slate-500">
                Uploaded successfully · Our optical team will verify this Rx
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemoveFile}
            className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            title="Remove prescription"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div>
          <label
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-[#E4232C] bg-rose-50/30'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-slate-500 mb-2">
              <Upload size={18} className="text-[#14232E]" />
            </div>
            <p className="text-xs font-bold text-[#14232E]">
              Click to upload or drag & drop prescription
            </p>
            <p className="text-[10px] text-slate-500 mt-1">
              Supports JPG, PNG or PDF (Max 5MB) · Stored securely
            </p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {error && (
            <div className="flex items-center gap-1.5 text-rose-600 text-xs mt-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
