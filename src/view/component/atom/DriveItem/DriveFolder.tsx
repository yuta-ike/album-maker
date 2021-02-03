import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import FolderIcon from '@material-ui/icons/Folder';

type Props = {
  name: string
  onClick: () => void
  icon?: any
}

const DriveFolder: React.FC<Props> = ({ name, onClick, icon = FolderIcon }) => {
  return (
    <Box
      as="button"
      _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
      role="group"
    >
      <Flex onClick={onClick}
        direction="row" alignItems="center"
        p={4} borderRadius="10px" boxShadow="sm" bg="white"
        _hover={{ boxShadow: "md", transition: "all .3s" }}
        _groupActive={{ boxShadow: "none" }}
        role="group"
      >
        <Icon as={icon} boxSize={5}/>
        <Divider orientation="vertical" h="full" w={1}/>
        <Text
          isTruncated
          _groupHover={{ textDecoration: "underline" }}
        >
          {name}
        </Text>
      </Flex>
    </Box>
  )
}

export default DriveFolder
