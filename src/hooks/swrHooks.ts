import { Client } from "@microsoft/microsoft-graph-client"
import heic2any from "heic2any"
import useSWR, { mutate } from "swr"
import { MIME_TYPE_NEED_CONVERT } from "../constants/acceptableMimeTypes"
import { useUserStateValues } from "../state/context/UserProvider"
import DriveFile from "../type/driveFile"
import Folder from "../type/folder"
import { neverRevalidateSWRConfig } from "../util/swr/swrConfig"

const fetchDriveRoot = async (client: Client | null, path: string) => {
  // throw { code: "InvalidAuthenticationToken" }
  const res = await client?.api(path).get()
  // TODO: Repository に切り出し
  const folders: Folder[] = res.value.filter((item: any) => item.folder != null)
  const files: DriveFile[] = res.value
        .filter((item: any) => item.folder == null)
        .map((file: any) => ({
          ...file,
          lastModifiedDateTime: new Date(file.fileSystemInfo.lastModifiedDateTime),
          downloadUrl: file["@microsoft.graph.downloadUrl"],
          thumbnail: file.thumbnails[0]
        }) as DriveFile)

  return { folders, files }
}

export const useSWRDriveRoot = (folderId: string) => {
  const { client } = useUserStateValues()
  const { data, error, ...others } = useSWR(client ? [client, folderId === "root" ? "/me/drive/root/children?$expand=thumbnails" : `/me/drive/items/${folderId}/children?$expand=thumbnails`] : null, fetchDriveRoot)
  
  // フォーマット変換をしておく
  for(const file of (data?.files ?? [])) {
    createValidUrl(file)()
        .then((url) => mutate(`/fetch/convert/${file.id}`, url))
  }

  return { data: data ?? { folders: [], files: [] }, ...others }
}

const createValidUrl = (file: DriveFile) => async () => {
  if (MIME_TYPE_NEED_CONVERT.includes(file.file?.mimeType)){
    const res = await fetch(file.downloadUrl)
    const blob = await res.blob()
    const conversionResult = await heic2any({ blob })
    return URL.createObjectURL(conversionResult)
  }
  return file.downloadUrl
}

export const useSWRCreateUrl = (file: DriveFile) => {
  const { data: url } = useSWR(`/fetch/convert/${file.id}`, createValidUrl(file), neverRevalidateSWRConfig)
  return url ?? file.thumbnail.large.url
}