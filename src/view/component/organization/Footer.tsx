import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Flex
      direction="column" align="center" justifyContent="center"
      position="absolute" bottom={0} left={0} w="100vw" h="100px" bg="blue.50" p={4}
    >
      <Box fontSize="sm" textAlign="center">
        <Link to="/terms" className="link"><Text d="inline-block" as="span">利用規約</Text></Link>
        {" "}/{" "}<Link to="/privacy" className="link"><Text d="inline-block" as="span">プライバシーポリシー</Text></Link>
        {" "}/{" "}<Link to="/howto" className="link"><Text d="inline-block" as="span">使い方</Text></Link>
        {" "}/{" "}<Link to="/release" className="link"><Text d="inline-block" as="span">リリースノート</Text></Link>
        {" "}/{" "}<a href="https://forms.gle/zHryvud1EHYzt9U26" className="link"><Text d="inline-block" as="span">お問い合わせ</Text></a>
      </Box>
      <Text fontSize="sm" mt={2}>©yuta-ike</Text>
    </Flex>
  )
}

export default Footer
