const MIME_TYPES = {
  apng: "image/apng",
  avif: "image/avif",
  gif: "image/gif",
  jpeg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
  heif: "image/heif",
  heic: "image/heic",
}

export const MIME_TYPE_LIST = [
  MIME_TYPES.apng,
  MIME_TYPES.avif,
  MIME_TYPES.gif,
  MIME_TYPES.jpeg,
  MIME_TYPES.png,
  MIME_TYPES.svg,
  MIME_TYPES.webp,

  MIME_TYPES.heif,
  MIME_TYPES.heic,
]

export const MIME_TYPE_NEED_CONVERT = [
  MIME_TYPES.heif,
  MIME_TYPES.heic,
]


