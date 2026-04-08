import { slugify } from '@/utils/helpers'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET)

function getFileBaseName(fileName = 'image') {
  return slugify(fileName.replace(/\.[^.]+$/, '')).slice(0, 60) || 'image'
}

export async function uploadAssetToCloudinary(file, { folder = 'projects' } = {}) {
  if (!isCloudinaryConfigured) {
    throw new Error(
      'Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env.',
    )
  }

  if (!(file instanceof File)) {
    throw new Error('Cloudinary uploads require a local file.')
  }

  const formData = new FormData()
  const uniqueToken =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', folder)
  formData.append('public_id', `${uniqueToken}-${getFileBaseName(file.name)}`)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  )

  const payload = await response.json()

  if (!response.ok) {
    if (payload?.error?.message?.includes('Upload preset not found')) {
      throw new Error(
        `Cloudinary upload preset "${UPLOAD_PRESET}" was not found for cloud "${CLOUD_NAME}". Create an unsigned upload preset with that exact name, or update VITE_CLOUDINARY_UPLOAD_PRESET.`,
      )
    }

    throw new Error(
      payload?.error?.message ||
        'Cloudinary upload failed. Check that the upload preset is unsigned and valid.',
    )
  }

  return {
    publicUrl: payload.secure_url,
    publicId: payload.public_id,
  }
}
