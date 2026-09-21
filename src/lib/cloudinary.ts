/**
 * Cloudinary image utility and responsive image URL generator
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'fit' | 'thumb' | 'limit';
  quality?: 'auto' | 'auto:good' | 'auto:best' | 'auto:low' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  gravity?: 'auto' | 'center' | 'face' | 'north';
}

const DEFAULT_CLOUD_NAME = (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME || 'siddhartha-schools';

/**
 * Transforms an image URL or public ID to an optimized Cloudinary delivery URL
 */
export function getOptimizedImageUrl(
  urlOrPublicId: string | undefined,
  options: CloudinaryTransformOptions = {},
  cloudName: string = DEFAULT_CLOUD_NAME
): string {
  if (!urlOrPublicId) {
    return 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop';
  }

  // If already a full Cloudinary URL, inject transformations
  if (urlOrPublicId.includes('res.cloudinary.com')) {
    const parts = urlOrPublicId.split('/upload/');
    if (parts.length === 2) {
      const transformParams: string[] = ['f_auto', 'q_auto'];
      if (options.width) transformParams.push(`w_${options.width}`);
      if (options.height) transformParams.push(`h_${options.height}`);
      if (options.crop) transformParams.push(`c_${options.crop}`);
      if (options.gravity) transformParams.push(`g_${options.gravity}`);

      return `${parts[0]}/upload/${transformParams.join(',')}/${parts[1]}`;
    }
    return urlOrPublicId;
  }

  // If it's a Data URL, blob URL, or external URL, return directly
  if (
    urlOrPublicId.startsWith('data:') ||
    urlOrPublicId.startsWith('blob:') ||
    urlOrPublicId.startsWith('http://') ||
    urlOrPublicId.startsWith('https://')
  ) {
    return urlOrPublicId;
  }

  // Treat as Cloudinary public ID
  const transformParams: string[] = ['f_auto', 'q_auto'];
  if (options.width) transformParams.push(`w_${options.width}`);
  if (options.height) transformParams.push(`h_${options.height}`);
  if (options.crop) transformParams.push(`c_${options.crop || 'fill'}`);
  if (options.gravity) transformParams.push(`g_${options.gravity || 'auto'}`);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformParams.join(',')}/${urlOrPublicId}`;
}

/**
 * Generates srcset string for responsive images
 */
export function getResponsiveSrcSet(
  urlOrPublicId: string,
  widths: number[] = [400, 800, 1200, 1600],
  cloudName: string = DEFAULT_CLOUD_NAME
): string {
  return widths
    .map(width => `${getOptimizedImageUrl(urlOrPublicId, { width, crop: 'limit' }, cloudName)} ${width}w`)
    .join(', ');
}

/**
 * Options for Cloudinary direct uploads
 */
export interface CloudinaryUploadOptions {
  cloudName?: string;
  uploadPreset?: string;
  folder?: string;
  onProgress?: (percent: number) => void;
}

/**
 * Validates image file type and size before upload
 */
export function validateImageFile(file: File, maxSizeBytes: number = 10 * 1024 * 1024): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  const nameLower = file.name.toLowerCase();
  const hasValidExt = allowedExtensions.some(ext => nameLower.endsWith(ext));
  const hasValidMime = allowedTypes.includes(file.type.toLowerCase());

  if (!hasValidExt && !hasValidMime) {
    return {
      valid: false,
      error: 'Please upload a JPG, PNG or WEBP image.',
    };
  }

  if (file.size > maxSizeBytes) {
    const sizeMb = Math.round(maxSizeBytes / (1024 * 1024));
    return {
      valid: false,
      error: `File size exceeds ${sizeMb}MB. Please select a smaller image.`,
    };
  }

  return { valid: true };
}

/**
 * Compresses an image client-side to WebP/JPEG data URL for instant delivery and resilience
 */
export function compressImageClientSide(
  file: File,
  maxWidth: number = 1200,
  maxHeight: number = 900,
  quality: number = 0.8
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.max(1, Math.round(width * ratio));
          height = Math.max(1, Math.round(height * ratio));
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const rawUrl = readerEvent.target?.result as string;
          resolve({ url: rawUrl, publicId: `img_${Date.now()}` });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const safeName = file.name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
        resolve({
          url: dataUrl,
          publicId: `upload_${Date.now()}_${safeName}`,
        });
      };
      img.onerror = () => {
        reject(new Error('Failed to process image file.'));
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Direct upload to Cloudinary with automatic resilient client-side fallback
 */
export async function uploadToCloudinaryWithProgress(
  file: File,
  options: CloudinaryUploadOptions = {}
): Promise<{ url: string; publicId: string }> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid image file.');
  }

  const targetCloudName =
    options.cloudName ||
    (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME ||
    '';
  const targetPreset =
    options.uploadPreset ||
    (import.meta as any).env?.VITE_CLOUDINARY_UPLOAD_PRESET ||
    '';

  // Check if a real, non-placeholder Cloudinary configuration is provided
  const isCustomCloudinaryConfigured =
    Boolean(targetCloudName) &&
    targetCloudName !== 'siddhartha-schools' &&
    Boolean(targetPreset) &&
    targetPreset !== 'school_uploads';

  // If Cloudinary credentials are not custom configured, use high-speed client-side compression immediately
  if (!isCustomCloudinaryConfigured) {
    if (options.onProgress) options.onProgress(25);
    await new Promise((r) => setTimeout(r, 100));
    if (options.onProgress) options.onProgress(65);
    const compressed = await compressImageClientSide(file);
    if (options.onProgress) options.onProgress(100);
    return compressed;
  }

  // Attempt Cloudinary upload if custom configured
  try {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${targetCloudName}/image/upload`);

      if (xhr.upload && options.onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable && event.total > 0) {
            const percent = Math.min(99, Math.round((event.loaded / event.total) * 100));
            options.onProgress!(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            if (options.onProgress) options.onProgress(100);
            resolve({
              url: data.secure_url || data.url,
              publicId: data.public_id,
            });
          } catch {
            reject(new Error('Invalid response received from Cloudinary.'));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject(new Error(errorData?.error?.message || `Cloudinary status ${xhr.status}`));
          } catch {
            reject(new Error(`Cloudinary status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => reject(new Error('Network error during Cloudinary upload.'));
      xhr.ontimeout = () => reject(new Error('Cloudinary upload timed out.'));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', targetPreset);
      if (options.folder) {
        formData.append('folder', options.folder);
      }

      xhr.send(formData);
    });
  } catch (cloudErr: any) {
    console.warn('Cloudinary upload failed, falling back to optimized client compression:', cloudErr?.message);
    if (options.onProgress) options.onProgress(70);
    const fallback = await compressImageClientSide(file);
    if (options.onProgress) options.onProgress(100);
    return fallback;
  }
}

/**
 * Direct unsigned upload to Cloudinary using upload preset
 */
export async function uploadToCloudinary(
  file: File,
  cloudName?: string,
  uploadPreset?: string
): Promise<{ url: string; publicId: string }> {
  return uploadToCloudinaryWithProgress(file, {
    cloudName,
    uploadPreset,
  });
}
