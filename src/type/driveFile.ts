type DriveFile = {
  id: string
  name: string
  cTag: string
  eTag: string
  file: {
    mimeType: string
  }
  image: {
    height: number
    width: number
  }
  lastModifiedDateTime: Date
  webUrl: string
  parentReference: {
    id: string
  }
  thumbnail: Record<"small" | "medium" | "large", {
    width: number
    height: number
    url: string
  }>
  downloadUrl: string /* @microsoft.graph.downloadUrl */
}
export default DriveFile