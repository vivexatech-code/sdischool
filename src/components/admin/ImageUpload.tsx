import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  ExternalLink,
  Link2
} from 'lucide-react';
import { 
  uploadToCloudinaryWithProgress, 
  validateImageFile,
  getOptimizedImageUrl 
} from '../../lib/cloudinary';
import { useSite } from '../../contexts/SiteContext';

export interface ImageUploadProps {
  label?: string;
  helperText?: string;
  value?: string;
  publicId?: string;
  onChange: (data: { imageUrl: string; cloudinaryPublicId?: string }) => void;
  folder?: string;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label = 'Upload Image',
  helperText = 'JPG, PNG, or WEBP (up to 10MB)',
  value = '',
  publicId = '',
  onChange,
  folder = 'schools/general',
  aspectRatio = 'video',
  className = '',
  disabled = false,
  required = false,
}) => {
  const { settings } = useSite();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isManualUrlOpen, setIsManualUrlOpen] = useState(false);
  const [manualUrlInput, setManualUrlInput] = useState('');

  const isUploading = uploadProgress !== null;

  // Aspect ratio classes
  const aspectClasses = {
    video: 'aspect-video max-h-56',
    square: 'aspect-square max-h-48',
    wide: 'aspect-[21/9] max-h-48',
    auto: 'min-h-[140px] max-h-60',
  }[aspectRatio];

  const handleFile = async (file: File) => {
    if (disabled || isUploading) return;

    // Reset feedback
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate
    const validation = validateImageFile(file, 10 * 1024 * 1024);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please upload a JPG, PNG or WEBP image.');
      return;
    }

    try {
      setUploadProgress(5);
      const result = await uploadToCloudinaryWithProgress(file, {
        cloudName: settings?.cloudinaryCloudName,
        uploadPreset: settings?.cloudinaryUploadPreset,
        folder,
        onProgress: (percent) => {
          setUploadProgress(percent);
        },
      });

      onChange({
        imageUrl: result.url,
        cloudinaryPublicId: result.publicId,
      });

      setSuccessMessage('Image processed and attached successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMessage(err?.message || 'Image processing failed. Please try again.');
    } finally {
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || isUploading) return;
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleFile(droppedFiles[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isUploading) return;
    onChange({ imageUrl: '', cloudinaryPublicId: '' });
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleTriggerBrowse = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  const handleManualUrlSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualUrlInput.trim()) {
      onChange({
        imageUrl: manualUrlInput.trim(),
        cloudinaryPublicId: '',
      });
      setIsManualUrlOpen(false);
      setManualUrlInput('');
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and Header */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {!value && (
          <button
            type="button"
            onClick={() => setIsManualUrlOpen(!isManualUrlOpen)}
            className="text-[11px] text-slate-500 hover:text-amber-700 transition-colors flex items-center gap-1"
          >
            <Link2 className="w-3 h-3" />
            <span>{isManualUrlOpen ? 'Hide URL input' : 'Paste URL instead'}</span>
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        onChange={handleInputChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {/* Fallback Manual URL input if toggled */}
      {isManualUrlOpen && !value && (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={manualUrlInput}
              onChange={(e) => setManualUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleManualUrlSave}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              Use URL
            </button>
          </div>
          <p className="text-[10px] text-slate-400">Direct image upload above is strongly recommended for optimized Cloudinary delivery.</p>
        </div>
      )}

      {/* Main Container: Preview or Dropzone */}
      {value ? (
        /* Image Preview Box */
        <div className="relative group rounded-2xl border border-slate-200 overflow-hidden bg-slate-900/5 shadow-xs">
          <div className={`w-full ${aspectClasses} overflow-hidden flex items-center justify-center bg-slate-950`}>
            <img
              src={getOptimizedImageUrl(value, { width: 800, height: 500, crop: 'fit' })}
              alt="Uploaded preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                // If optimized transform fails, fall back to direct value
                (e.target as HTMLImageElement).src = value;
              }}
            />
          </div>

          {/* Overlay Actions Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate text-slate-500">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] font-mono truncate max-w-[200px] sm:max-w-[280px]">
                {publicId || value}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleTriggerBrowse}
                disabled={disabled || isUploading}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
                    <span>Replacing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3 text-amber-600" />
                    <span>Replace Image</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled || isUploading}
                className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty / Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleTriggerBrowse}
          className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? 'border-amber-500 bg-amber-50/70 scale-[0.99]'
              : 'border-slate-300 hover:border-amber-400 bg-slate-50/50 hover:bg-slate-50'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            /* Uploading State */
            <div className="w-full py-4 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800 block">
                  Processing & optimizing image... {uploadProgress !== null ? `${uploadProgress}%` : ''}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Please keep this window open while processing
                </span>
              </div>
              <div className="w-full max-w-xs mx-auto bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-amber-600 h-full transition-all duration-200 rounded-full"
                  style={{ width: `${uploadProgress || 10}%` }}
                />
              </div>
            </div>
          ) : (
            /* Idle Ready to Browse State */
            <>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800">
                  <span className="text-amber-700 underline underline-offset-2">Click to browse</span> or drag and drop image
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {helperText}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Feedback Messages */}
      {errorMessage && (
        <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium flex-1">{errorMessage}</span>
          <button 
            type="button"
            onClick={() => setErrorMessage(null)} 
            className="text-rose-500 hover:text-rose-700 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}
    </div>
  );
};
