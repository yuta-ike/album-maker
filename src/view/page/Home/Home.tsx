import React, { useEffect, useState } from 'react'
import DriveFile from '../../../type/driveFile'
import { useSWRDriveRoot } from '../../../hooks/swrHooks'
import { Box, Center, Divider, Flex, Grid, IconButton, useToast, Tooltip, Text, useBreakpointValue, ToastOptions, Breadcrumb, Icon, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import DriveItem from '../../component/atom/DriveItem/DriveItem'
import DriveFolder from '../../component/atom/DriveItem/DriveFolder'
import { useDispatch, useSelector } from 'react-redux'
import { fileActions, StoreState } from '../../../state/reducks/files'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ItemBar from '../../component/organization/ItemBar'
import { useHistory } from 'react-router-dom'
import { useUserActions, useUserStateValues } from '../../../state/context/UserProvider'
import PIP from '../../component/atom/PIP/PIP'
import ProfileIcon from '../../component/atom/ProfileIcon/ProfileIcon'
import { MdChevronRight, MdHome, MdRefresh } from 'react-icons/md'
import { MIME_TYPE_LIST } from '../../../constants/acceptableMimeTypes'
import useScrollTopWhenMounted from '../../../hooks/useScrollTopWhenMounted'
import SizeButton from './component/SizeButton'
import RetryToast from '../../component/atom/Toast/RetryToast'
import Footer from '../../component/organization/Footer'
import useStack from '../../../hooks/useStack'
import Folder from '../../../type/folder'
import AnimatedText from '../../component/atom/AnimatedText/AnimatedText'

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { user } = useUserStateValues()
  const { signOut } = useUserActions()
  const toast = useToast()
  const { top: currentFolder, stack: folderStack , push: pushFolderId, pop: popFolderId,
          popUntil: popUntilFolderId  } = useStack<{id: string, name: string}>([{id: "root", name: "ドライブ"}])
  const { data: { folders, files }, revalidate, isValidating } = useSWRDriveRoot(currentFolder.id)

  const selectedFiles = useSelector<StoreState, DriveFile[]>((state: StoreState) => state.selected)

  const [pipFile, setPipFile] = useState<{file: DriveFile, group: "folder" | "selected"} | null>(null)

  useScrollTopWhenMounted()

  useEffect(() => {
    dispatch(fileActions.addFiles(files))
  }, [dispatch, files])

  const handleClickFolder = (folder: Folder) => {
    setPipFile(null)
    pushFolderId({ id: folder.id, name: folder.name })
  }

  const handleClickBreadcrumbs = (id: string) => {
    popUntilFolderId(folder => folder.id === id)
  }

  const toastPos = useBreakpointValue<ToastOptions["position"]>({ base: "bottom-left", md: "top-right" })

  const handlePickFile = (file: DriveFile, noConfirmToast = false) => {
    if (!MIME_TYPE_LIST.includes(file.file.mimeType)) return;
    dispatch(fileActions.pickFile(file))
    if (!noConfirmToast && selectedFiles.find(_file => _file.id === file.id) != null){
      toast({
        title: `確認`,
        description: `${file.name.slice(0, 12)}を選択リストから削除しました`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: toastPos ?? "top-right",
        render: ({ onClose }) => {
          const handleRetry = () => {
            onClose()
            handlePickFile(file, true)
          }
          return (
            <RetryToast message={`${file.name}を選択リストから削除しました`} onRetry={handleRetry} onClose={onClose}/>
          )
        }
      })
    }
  }

  const handleClickBack = () => {
    popFolderId()
  }

  const handleReload = () => {
    revalidate()
  }

  const handleSelectNextPipImage = (_index?: number): void => {
    if(pipFile == null) return
    const group = pipFile.group
    const filesArray = group === "folder" ? files : selectedFiles
    const index = _index ?? filesArray.findIndex(file => file.id === pipFile.file.id)
    const nextIndex = index + 1 < filesArray.length ? index + 1 : 0
    const nextFile = filesArray[nextIndex]
    if (!MIME_TYPE_LIST.includes(nextFile.file.mimeType)) {
      return handleSelectNextPipImage(nextIndex)
    }
    setPipFile({ file: nextFile, group })
  }

  const handleSelectPrevPipImage = (_index?: number): void => {
    if (pipFile == null) return
    const group = pipFile.group
    const filesArray = group === "folder" ? files : selectedFiles
    const index = _index ?? filesArray.findIndex(file => file.id === pipFile.file.id)
    const prevIndex = 0 <= index - 1 ? index - 1 : filesArray.length - 1
    const prevFile = filesArray[prevIndex]
    if (!MIME_TYPE_LIST.includes(prevFile.file.mimeType)) {
      return handleSelectPrevPipImage(prevIndex)
    }
    setPipFile({ file: prevFile, group })
  }

  const handleSetPipFile = ({ file, group }: { file: DriveFile, group: "folder" | "selected" }) => {
    if (!MIME_TYPE_LIST.includes(file.file.mimeType)) {
      return
    }
    setPipFile({ file, group })
  }

  const [size, setSize] = useState<"sm" | "md" | "lg">("md")

  return (
    <>
    <Box position="fixed" top="210px" left={4} zIndex={10} pointerEvents="none">
      {
        pipFile != null &&
        <PIP
          file={pipFile.file}
          onClose={() => setPipFile(null)}
          onNext={() => handleSelectNextPipImage()}
          onPrev={() => handleSelectPrevPipImage()}
        />
      }
    </Box>
    <Box bg="gray.50">
      <ItemBar
        mode="drive"
        items={selectedFiles}
        onClick={handlePickFile}
        onClickPrint={() => history.push("/print")}
        onClickLook={(file) => setPipFile({ file, group: "selected" })}
        hoverMessage="選択を外す"
      />
      <Box px={4} pt={useBreakpointValue<number>({ base: 52, md: 44 }) ?? 52} pb="150px" minH="100vh">
        <Breadcrumb spacing="8px" separator={<Icon as={MdChevronRight} color="gray.500" />}>
          {
            folderStack.map(({ id, name }) => (
              <BreadcrumbItem key={id}>
                <BreadcrumbLink
                  as="button" fontSize="sm" color="gray.500" transition="all .3s"
                  onClick={() => handleClickBreadcrumbs(id)}
                  _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
                >
                  {id === "root" ?
                    <Icon
                      as={MdHome} fontSize="lg" borderBottom="1px solid transparent" color="gray.400"
                      _hover={{ borderColor: "gray.500", color: "gray.500" }}/>
                    : name
                  }
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))
          }
        </Breadcrumb>
        <Flex direction="row" alignItems="center" px={2}>
          <ProfileIcon user={user ?? null} handleLogout={signOut}/>
          <Center height="50px" width="30px">
            <Divider orientation="vertical" />
          </Center>
          <Flex direction="row" overflowX="scroll" wrap="nowrap" py={2}>
            {
              currentFolder.id !== "root" &&
              <DriveFolder
                name="戻る"
                onClick={handleClickBack}
                icon={ArrowBackIosIcon}
              />
            }
            {
              folders.map((folder, i) => (
                <Box key={folder.id} mx={2} pr={i === folders.length - 1 ? 36 : 0}>
                  <DriveFolder name={folder.name} onClick={() => handleClickFolder(folder)}/>
                </Box>
              ))
            }
          </Flex>
        </Flex>
        <Box h={4}>
          <Divider/>
        </Box>
        <Flex justifyContent="flex-end" mt={1} mb={2} px={3}>
          <SizeButton size={size} setSize={setSize}/>
          <Tooltip label="リロード" openDelay={500}>
            <IconButton disabled={isValidating} isLoading={isValidating} icon={<MdRefresh/>} aria-label="リロード" onClick={handleReload}/>
          </Tooltip>
        </Flex>
        {
          files.length === 0 && (
            <Flex
              align="center" justify="center" mt={8}
              borderRadius="10px" h="full" p={4} color="gray.500"
            >
              {
                isValidating ? <AnimatedText text="LOADING"/> : (
                  <Text fontSize="sm">このフォルダにアイテムは存在しません</Text>
                )
              }
            </Flex>
          )
        }
        <Grid templateColumns={`repeat(auto-fill, minmax(${size === "lg" ? 200 : size === "md" ? 150 : 100}px, 1fr))`} gap={6}>
          {
            files.map(file => (
              <DriveItem
                key={file.id}
                item={file}
                selected={selectedFiles.find(_file => _file.id === file.id) != null}
                onClick={() => handlePickFile(file)}
                onLook={() => handleSetPipFile({ file, group: "folder" })}
                disabled={!MIME_TYPE_LIST.includes(file.file?.mimeType)}
              />
            ))
          }
        </Grid>
        <Footer/>
      </Box>
    </Box>
    </>
  )
}

export default Home