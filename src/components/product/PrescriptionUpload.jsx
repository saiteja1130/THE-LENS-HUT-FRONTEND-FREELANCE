import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, X, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { uploadApi } from '../../services/uploadApi';

export const PrescriptionUpload = ({
  prescriptionFile,
  onUploadSuccess,
  onRemoveFile
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  // Check if a file is already uploaded and available
  const hasUploadedFile = Boolean(
    prescriptionFile &&
    (prescriptionFile.fileUrl || prescriptionFile.fileName || (prescriptionFile.method === 'upload' && prescriptionFile.fileId))
  );

  const formatFileSize = (bytes) => {
    if (!bytes || isNaN(bytes)) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileBadge = (filename = '', fileType = '') => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'docx' || ext === 'doc' || fileType.includes('word') || fileType.includes('document')) {
      return { label: 'DOCX', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    }
    if (ext === 'pdf' || fileType.includes('pdf')) {
      return { label: 'PDF', color: 'bg-red-100 text-red-700 border-red-200' };
    }
    return { label: ext ? ext.toUpperCase() : 'IMG', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  };

  const handleFileProcess = async (file) => {
    setError(null);
    if (!file) return;

    // Validate allowed file extensions & MIME types (DOCX, DOC, PDF, JPG, PNG, WEBP)
    const validExtensions = ['.docx', '.doc', '.pdf', '.jpg', '.jpeg', '.png', '.webp'];
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const validMimes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp'
    ];

    const isExtensionValid = validExtensions.includes(ext);
    const isMimeValid = validMimes.includes(file.type) || file.type === '';

    if (!isExtensionValid && !isMimeValid) {
      setError('Please upload a valid document format (.docx, .doc, .pdf, .jpg, or .png).');
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds 15MB limit. Please upload a smaller document.');
      return;
    }

    setIsUploading(true);

    try {
      const res = await uploadApi.uploadPrescription(file);

      if (res?.success && res.data) {
        onUploadSuccess({
          fileId: res.data.fileId || `rx-${Date.now().toString(36)}`,
          fileName: res.data.fileName || file.name,
          fileType: res.data.fileType || file.type,
          fileSize: res.data.fileSize || file.size,
          fileUrl: res.data.fileUrl || res.data.url,
          url: res.data.fileUrl || res.data.url
        });
      } else {
        setError(res?.message || 'Failed to upload document to optical server. Please try again.');
      }
    } catch (err) {
      console.error('[PrescriptionUpload] Error:', err);
      setError(err.message || 'Network error while uploading prescription. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const badge = getFileBadge(prescriptionFile?.fileName, prescriptionFile?.fileType);

  return (
    <div className="space-y-3">
      {hasUploadedFile ? (
        <div className="flex items-center justify-between p-3.5 bg-emerald-50/70 border border-emerald-200/90 rounded-xl transition-all shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            {/* Format Icon / Badge */}
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-extrabold text-[11px] shadow-2xs ${badge.color}`}>
              {badge.label}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-slate-800 truncate max-w-[220px] sm:max-w-[280px]" title={prescriptionFile.fileName}>
                  {prescriptionFile.fileName || 'Prescription Document'}
                </p>
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              </div>

              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                {prescriptionFile.fileSize > 0 && (
                  <span>{formatFileSize(prescriptionFile.fileSize)}</span>
                )}
                {prescriptionFile.fileSize > 0 && <span>•</span>}
                <span className="text-emerald-700 font-medium">Stored on optical server</span>
                {prescriptionFile.fileUrl && (
                  <>
                    <span>•</span>
                    <a
                      href={prescriptionFile.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#E4232C] hover:underline font-bold"
                    >
                      <span>View</span>
                      <ExternalLink size={10} />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onRemoveFile}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
            title="Remove prescription document"
            aria-label="Remove prescription"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div>
          <label
            onDragEnter={() => !isUploading && setDragActive(true)}
            onDragLeave={() => !isUploading && setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all ${
              isUploading
                ? 'border-slate-300 bg-slate-50 cursor-wait'
                : dragActive
                ? 'border-[#E4232C] bg-rose-50/40 cursor-pointer'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 cursor-pointer'
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-2">
                <Loader2 size={24} className="animate-spin text-[#E4232C]" />
                <p className="text-xs font-bold text-slate-700">
                  Uploading prescription document to server...
                </p>
                <p className="text-[10px] text-slate-400">
                  Storing securely for optometrist verification
                </p>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-slate-500 mb-2">
                  <Upload size={18} className="text-[#14232E]" />
                </div>
                <p className="text-xs font-bold text-[#14232E]">
                  Click to upload or drag & drop prescription
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Supports DOCX, DOC, PDF, JPG, or PNG (Max 15MB) · Stored securely
                </p>
                <input
                  type="file"
                  accept=".docx,.doc,.pdf,.jpg,.jpeg,.png,.webp"
                  onChange={handleChange}
                  disabled={isUploading}
                  className="hidden"
                />
              </>
            )}
          </label>

          {error && (
            <div className="flex items-center gap-1.5 text-rose-600 text-xs mt-2 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrescriptionUpload;
