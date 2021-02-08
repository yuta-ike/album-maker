import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

type Props = {
  tailArea?: React.ReactNode
}

const Header: React.FC<Props> = ({ tailArea }) => {
  return (
    <Flex
      position="fixed" w="100vw" top={0} left={0} h="calc(60px + env(safe-area-inset-top))"
      justifyContent="space-between" align="center" px={4} pb={2} pt="calc(0.5rem + env(safe-area-inset-top))"
      bg="blue.50" boxShadow="sm" zIndex={30}
    >
      <Heading size="h2"><span style={{ fontSize: "130%" }}>O</span>NE<span style={{ fontSize: "130%" }}>P</span>ICK</Heading>
      { tailArea }
    </Flex>
  )
}

export default Header
