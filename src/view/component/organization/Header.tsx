import { Flex, Button } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <Flex
      justifyContent="flex-end"
      as="header" position="fixed" top={0} left={0} w="full" h="50px" bg="blue.300" px={4}
    >
      <Flex
        alignItems="center"
      >
        <Button variant="ghost" colorScheme="blue" fontWeight="normal" size="sm" color="white" _hover={{ bg: "blue.200" }}>ログアウト</Button>
      </Flex>
    </Flex>
  )
}

export default Header
