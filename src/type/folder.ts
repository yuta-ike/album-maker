type Folder = {
  id: string
  name: string
  eTag: string
  folder: {
    childCount: number
  }
  lastModifiedDateTime: string
  webUrl: string
  parentReference: {
    id: string
  }
}

export default Folder