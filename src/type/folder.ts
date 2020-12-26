type Folder = {
  id: string
  name: string
  eTag: string
  folder: {
    childCount: number
  }
  lastModifiedDateTime: string
  webUrl: string
}

export default Folder