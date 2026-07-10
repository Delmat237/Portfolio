'use client';

import { useCallback, useRef, useState } from 'react';
import { Link2, Loader2, Upload } from 'lucide-react';

import { apiUpload } from '@/lib/api-client';

type ImageMode = 'url' | 'upload';

interface ImageInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  id?: string;
}

async function uploadImage(file: File): Promise<string> {
  return apiUpload(file);
}

export default function ImageInput({
  value,
  onChange,
  label = 'Image',
  id = 'image-input',
}: ImageInputProps) {
  const [mode, setMode] = useState<ImageMode>('url');
  const [urlInput, setUrlInput] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setIsUploading(true);

      try {
        const url = await uploadImage(file);
        onChange(url);
        setUrlInput(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload');
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) void handleFile(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setUrlInput(url);
    onChange(url);
    setError(null);
  };

  return (
    <div>
      <label className="block text-slate-700 dark:text-white mb-2">{label}</label>

      <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-white/20 mb-3">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
            mode === 'url'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          <Link2 size={16} />
          Lien URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
            mode === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          <Upload size={16} />
          Upload
        </button>
      </div>

      {mode === 'url' ? (
        <input
          type="url"
          value={urlInput}
          onChange={handleUrlChange}
          className="w-full px-4 py-2 bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          placeholder="https://exemple.com/image.jpg"
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-200 dark:border-white/20 hover:border-blue-400 dark:hover:border-white/40 bg-slate-50/50 dark:bg-white/5'
          } ${isUploading ? 'pointer-events-none opacity-70' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`${id}-upload`}
          />
          {isUploading ? (
            <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
              <Loader2 className="animate-spin mb-2" size={24} />
              <p className="text-sm">Upload en cours…</p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto mb-2 text-slate-400" size={24} />
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Glissez une image ou cliquez pour parcourir
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                JPEG, PNG, WebP, GIF — max 5 Mo
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {value && (
        <div className="mt-3 rounded-lg overflow-hidden border border-slate-200 dark:border-white/20 bg-slate-50/50 dark:bg-white/5">
          <p className="text-xs text-slate-500 dark:text-slate-400 px-3 py-2 border-b border-slate-200 dark:border-white/10">
            Aperçu
          </p>
          <img
            src={value}
            alt="Aperçu"
            className="w-full h-40 object-cover"
            onError={() => setError('Impossible de charger l\'aperçu de l\'image')}
          />
        </div>
      )}
    </div>
  );
}
