import React, { useEffect } from 'react'
import { Text, Box, Button, Heading } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import Header from '../../component/organization/Header'
import PRIVACY_POLICY from '../../../constants/privacyPolicy'
import Footer from '../../component/organization/Footer'

const PrivacyPolicy = () => {
  const history = useHistory()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Header/>
      <Box px={4} pb={36} pt="calc(60px + 2rem)" maxW="800px" mx="auto" minH="100vh">
        <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" mt={8}>
          <Heading size="h3" mb={8} fontSize="2xl">プライバシーポリシー</Heading>
          <div dangerouslySetInnerHTML={{
            __html: PRIVACY_POLICY.split("\n").join("<br/>")
          }}/>
        </Box>
        <Button mt={8} onClick={() => history.goBack()}>戻る</Button>
        <Text fontSize="sm">※ うまく戻れない場合はリロードしてください</Text>
      </Box>
      <Footer/>
    </>
  )
}

export default PrivacyPolicy