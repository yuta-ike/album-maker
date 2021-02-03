import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Flex
      direction="column" align="center" justifyContent="center"
      position="absolute" bottom={0} left={0} w="100vw" h="100px" bg="blue.50" p={4}
    >
      <Box>
        <Link to="/terms" className="link">利用規約</Link>
        {" "}/{" "}<Link to="/privacy" className="link">プライバシーポリシー</Link>
        {" "}/{" "}<a href="https://forms.gle/zHryvud1EHYzt9U26" className="link">お問い合わせ</a>
      </Box>
      <Text fontSize="sm" mt={2}>©yuta-ike</Text>
    </Flex>
  )
}

export default Footer
