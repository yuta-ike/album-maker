import { Box, Button, Text, Stack, Flex, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fileActions, StoreState } from '../../../state/reducks/files'
import DriveFile from '../../../type/driveFile'
import ItemBar from '../../component/organization/ItemBar'
import RndItem from '../../component/atom/RndItem/RndItem'
import useScrollTopWhenMounted from '../../../hooks/useScrollTopWhenMounted'
import Footer from '../../component/organization/Footer'
import ConfirmDialog from './component/ConfirmDialog'

const Print: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const selectedFiles = useSelector<StoreState, DriveFile[]>((state: StoreState) => state.selected)
  
  const [positionedFiles, setPositionedFiles] = useState<DriveFile[]>([])
  const [rotationData, setRotationData] = useState<Record<string, 0 | 90 | 180 | 270>>({})
  
  const { isOpen, onOpen } = useDisclosure()

  useScrollTopWhenMounted()

  const addFileToCanvas = (file: DriveFile) => {
    if (positionedFiles.find(_file => _file.id === file.id) == null){
      setPositionedFiles([...positionedFiles, file])
    }
  }

  const handleRotate = (file: DriveFile) => {
    setRotationData(prev => ({ ...prev, [file.id]: ((prev[file.id] ?? 0) + 90) % 360 as any }))
  }

  const handleDelete = (file: DriveFile) => {
    setPositionedFiles(positionedFiles.filter(_file => _file.id !== file.id))
  }

  const handleUnsellectFiles = () => {
    positionedFiles.map(file => dispatch(fileActions.pickFile(file)))
    history.push("/")
  }

  const handleBackToDrive = () => {
    if(positionedFiles.length > 0){
      onOpen()
    }else{
      history.push("/")
    }
  }

  return (
    <>
      <ItemBar mode="print" items={selectedFiles} onClick={addFileToCanvas} onClickPrint={handleBackToDrive} disabledItems={positionedFiles}/>
      <Box className="print-page-wrapper" pt={44} pb="150px" bg="gray.50">
        <Flex
          direction="column" alignItems="center" position="relative" w="172mm" h="251mm"
          bg="white" boxShadow="md"
          className="print-page" mx="auto" my={4}
        >
          <Text color="gray.400" fontSize="xl" mt={8}>枠内に写真を配置してください</Text>
          <Text color="gray.400" fontSize="xl">（上の写真をクリックして写真を追加）</Text>
          {
            positionedFiles.map((file) => (
              <RndItem
                key={file.id}
                file={file}
                rotate={() => handleRotate(file)}
                deleteFile={() => handleDelete(file)}
                rotation={rotationData[file.id] ?? 0}
              />
            ))
          }
        </Flex>
        <Stack direction="row" spacing={4} align="center" justifyContent="center" my={12} w="full">
          <Button colorScheme="teal" variant="outline" fontWeight="normal" onClick={handleBackToDrive}>
            ドライブに戻る
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={window.print}>
            これで印刷する
          </Button>
        </Stack>
      </Box>
      <Footer/>
      <ConfirmDialog
        isOpen={isOpen}
        onConfirm={handleUnsellectFiles}
        onCancel={() => history.push("/")}
        files={positionedFiles}
      />
    </>
  )
}

export default Print
