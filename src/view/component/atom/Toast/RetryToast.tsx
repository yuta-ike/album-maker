import { Button, Flex, IconButton, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { MdClose } from 'react-icons/md'

type Props = {
  message: string
  onRetry: () => void
  onClose: () => void
}

const RetryToast: React.FC<Props> = ({ message, onRetry, onClose }) => {
  return (
    <Flex color="white" bg="yellow.500" boxShadow="sm" borderRadius="5px">
      <Flex direction="column" justify="space-between" align="end" w="full" px={2} py={2}>
        <Text fontSize="sm">
          {message}
        </Text>
        <Button size="sm" variant="ghost" onClick={onRetry} _hover={{ color: "yellow.700", bg: "yellow.50" }}>
          やり直す
        </Button>
      </Flex>
      <Box p={1} mt={2}>
        <IconButton variant="ghost" icon={<MdClose />} aria-label="閉じる" size="xs" onClick={onClose}/>
      </Box>
    </Flex>
  )
}

export default RetryToast
