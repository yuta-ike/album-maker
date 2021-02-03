import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Checkbox } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type Props = {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
  acceptPolicy: boolean
  setAcceptPolicy: (acceptPolicy: boolean) => void
}

const LoginDialog: React.FC<Props> = ({ isOpen, onClose, onLogin, acceptPolicy, setAcceptPolicy }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent pt={4}>
        <ModalCloseButton
          _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
        />
        <ModalBody>
          <Checkbox isChecked={acceptPolicy} onChange={e => setAcceptPolicy(e.target.checked)}>
            <Link to="/terms" className="link">利用規約</Link>と<Link to="/privacy" className="link">プライバシーポリシー</Link>に同意する
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            キャンセル
            </Button>
          <Button colorScheme="teal" onClick={onLogin} disabled={!acceptPolicy}>ログイン</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LoginDialog
