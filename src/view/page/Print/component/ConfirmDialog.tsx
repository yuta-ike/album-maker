import { HStack, Text, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import DriveFile from '../../../../type/driveFile'
import DriveItem from '../../../component/atom/DriveItem/DriveItem'

type Props = {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  files: DriveFile[]
}

const ConfirmDialog: React.FC<Props> = ({ isOpen, onConfirm, onCancel, files }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => { }} isCentered>
      <ModalOverlay />
      <ModalContent pt={4}>
        <ModalCloseButton
          _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
        />
        <ModalBody h="auto">
          <Text>A4形式に配置した以下のファイルを選択中のリストから外しますか？</Text>
          <HStack
            overflowX="scroll" whiteSpace="nowrap" flexWrap="nowrap"
            h="200px" spacing={1} px={4} py={2} align="stretch" size="sm"
          >
            {files.map(file => <DriveItem key={file.id} item={file} selected/>)}
          </HStack>
          
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onCancel}>
            外さない
          </Button>
          <Button colorScheme="teal" onClick={onConfirm}>外す</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDialog