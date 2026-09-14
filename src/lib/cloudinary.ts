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

  // If it's an external URL (e.g., Unsplash or HTTPS asset), use fetch delivery or return with parameters
  if (urlOrPublicId.startsWith('http://') || urlOrPublicId.startsWith('https://')) {
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
 * Direct unsigned upload to Cloudinary using upload preset
 */
export async function uploadToCloudinary(
  file: File,
  cloudName?: string,
  uploadPreset?: string
): Promise<{ url: string; publicId: string }> {
  const targetCloudName = cloudName || (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME;
  const targetPreset = uploadPreset || (import.meta as any).env?.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

  if (!targetCloudName) {
    throw new Error('Cloudinary Cloud Name is not configured. Please add it in Admin > Site Settings or .env');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', targetPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${targetCloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Upload failed with status ${response.status}`);
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
}
