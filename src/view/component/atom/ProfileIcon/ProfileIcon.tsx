import React, { useState } from 'react'
import { Avatar, Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tooltip } from '@chakra-ui/react'
import firebase from '../../../../util/firebase'

type Props = {
  user: firebase.User | null
  handleLogout: () => void
}

const ProfileIcon: React.FC<Props> = ({ user, handleLogout }) => {
  const [showLogoutButton, setShowLogoutButton] = useState(false)
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <IconButton icon={
          <Tooltip label={user?.displayName ?? ""}>
            <Avatar size="sm" />
          </Tooltip>
        } aria-label="show logout button" bg="transparent" _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
          onClick={() => setShowLogoutButton(!showLogoutButton)}
        />
      </PopoverTrigger>
      <PopoverContent _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{user?.displayName}</PopoverHeader>
        <PopoverBody>{user?.email}</PopoverBody>
        <ButtonGroup d="flex" justifyContent="flex-end" mx={2} mb={2}>
          <Button colorScheme="teal" size="sm" borderRadius={3} onClick={handleLogout}>
            ログアウト
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover >
  )
}

export default ProfileIcon
