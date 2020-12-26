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
  lastModifiedDateTime: string
  webUrl: string
  downloadUrl: string /* @microsoft.graph.downloadUrl */
}
export default DriveFile