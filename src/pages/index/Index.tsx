import classNames from 'classnames'
import { relative } from 'path'
import { useState } from 'react'
import Draggable from 'react-draggable'
import { useUserStateValues } from '../../context/UserProvider'
import DriveFile from '../../type/driveFile'
import Folder from '../../type/folder'
import { Rnd } from "react-rnd"

const Index = () => {
  const { client } = useUserStateValues()

  const [folders, setFolders] = useState<Folder[]>([])
  const [files, setFiles] = useState<DriveFile[]>([])
  const [selectedFiles, setSelectedFiles] = useState<DriveFile[]>([])
  const [printMode, setPrintMode] = useState(false)

  const handleClick = async () => {
    const res = await client?.api("/me/drive/root/children").get()
    console.log(res.value)
    setFolders(res.value.filter((item: any) => item.folder != null))
    setFiles(res.value.filter((item: any) => item.folder == null).map((file: any) => ({ ...file, downloadUrl: file["@microsoft.graph.downloadUrl"]})))
  }

  const handleClickFolder = async (id: string) => {
    const res = await client?.api(`/me/drive/items/${id}/children`).get()
    console.log(res.value)
    setFolders(res.value.filter((item: any) => item.folder != null))
    setFiles(res.value.filter((item: any) => item.folder == null).map((file: any) => ({ ...file, downloadUrl: file["@microsoft.graph.downloadUrl"] })))
  }

  const handleClickFile = async (file: DriveFile) => {
    console.log(file.id)
    setSelectedFiles(
      Array.from(new Set([...selectedFiles, file]))
    )
  }

  const handleRemoveFile = async (file: DriveFile) => {
    setSelectedFiles(
      selectedFiles.filter(_file => _file.id !== file.id)
    )
  }

  if (!printMode){
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-48 bg-gray-50 flex flex-row whitespace-wrap flex-wrap items-center justify-start">
          {
            selectedFiles.map(file => (
              <img key={file.id} src={file.downloadUrl} alt={file.name} width="100" height="100" loading="lazy" onClick={() => handleRemoveFile(file)}/>
            ))
          }
        </div>
        <div className="mt-48">
          <button onClick={handleClick}>TEST</button>
          <button onClick={() => setPrintMode(true)}>OK</button>
          インデックスページ
          {
            folders.map(folder => (
              <div key={folder.id} onClick={() => handleClickFolder(folder.id)}>
                {folder.name}
              </div>
            ))
          }
          <div>----------------------------------------------</div>
          {
            files.map(file => (
              <div key={file.id} onClick={() => handleClickFile(file)}>
                {file.name}
                <img src={file.downloadUrl} alt={file.name} width="100" height="100" loading="lazy"/>
              </div>
            ))
          }
        </div>
      </>
    )
  }else{
    const X_NUM = 3
    const Y_NUM = 3
    const baseWidth = `${172 / X_NUM - 3}mm`
    const baseHeight = `${251 / Y_NUM - 3}mm`
    return (
      <>
        <button onClick={() => setPrintMode(false)}>戻る</button>
        <div className="print-page flex flex-wrap">
          {
            selectedFiles.map((file, i) => {
              const rotate = file.image.width > file.image.height

              return (
                <Rnd
                  default={{
                    x: 0,
                    y: 0,
                    width: 250,//baseWidth,
                    height: 250 * (file.image.height / file.image.width),//</div>baseHeight,
                  }}
                  lockAspectRatio={true}
                  className="print-image"
                  style={{
                      // transform: `rotate(${rotate ? 90 : 0}deg)`,
                    // width: baseWidth,
                    // height: baseHeight,
                  }}
                >
                  <img
                    key={file.id}
                    src={file.downloadUrl}
                    alt={file.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      // maxHeight: rotate ? baseWidth : baseHeight,
                      // maxWidth: rotate ? baseHeight : baseWidth,
                      transform: `rotate(${rotate ? 90 : 0}deg)`,
                    }}
                    draggable="false"
                  />
                </Rnd>
              )
            })
          }
          {/* {
            selectedFiles.map((file, i) => {
              const rotate = file.image.width > file.image.height
              return (
                <div
                  style={{
                    maxHeight: baseHeight,
                    maxWidth: baseWidth,
                    margin: "1mm"
                  }}
                >
                  <img
                    key={file.id}
                    src={file.downloadUrl}
                    alt={file.name}
                    style={{
                      maxHeight: rotate ? baseWidth : baseHeight,
                      maxWidth: rotate ? baseHeight : baseWidth,
                      transform: `rotate(${rotate ? 90 : 0}deg)`,
                    }}
                  />
                </div>
              )
            })
          } */}
          {/* {
            selectedFiles.map((file, i) => {
              const rotate = file.image.width < file.image.height
              return (
                <Draggable
                  grid={[10, 10]}
                  scale={2}
                >
                  <div
                    style={{
                      height: !rotate ? baseHeight : baseWidth,
                      width: !rotate ? baseWidth : baseHeight,
                      position: "relative"
                    }}
                  >
                    <img
                      key={file.id}
                      className={classNames("h-full", rotate && "img-rotate")}
                      src={file.downloadUrl}
                      alt={file.name}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        maxHeight: rotate ? baseHeight : baseWidth,
                        maxWidth: rotate ? baseWidth : baseHeight,
                      }}
                      // width={baseWidth}
                      // height={baseHeight}
                      // style={{
                      //   maxHeight: rotate ? baseHeight : baseWidth,
                      //   maxWidth: rotate ? baseWidth : baseHeight,
                      // }}
                      draggable="false"
                    />
                  </div>
                </Draggable>
              )
            })
          } */}
        </div>
      </>
    )
  }
}

export default Index
