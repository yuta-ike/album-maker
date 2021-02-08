import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import TERMS_OF_USE from '../../../constants/termsOfUse'
import Footer from '../../component/organization/Footer'
import Header from '../../component/organization/Header'

const TermsOfUse = () => {
  const history = useHistory()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Header/>
      <Box px={4} pt="calc(60px + 2rem)" pb={36} maxW="800px" mx="auto" minH="100vh">
        <Button onClick={() => history.goBack()}>戻る</Button>
        <Text fontSize="sm">※ うまく戻れない場合はリロードしてください</Text>
        <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" mt={8}>
          <Heading size="h2" fontSize="2xl">利用規約</Heading>
          <div dangerouslySetInnerHTML={{ __html: TERMS_OF_USE.split("\n").join("<br/>")}}/>
        </Box>
        <Button onClick={() => history.goBack()} mt={8}>戻る</Button>
        <Text fontSize="sm">※ うまく戻れない場合はリロードしてください</Text>
      </Box>
      <Footer />
    </>
  )
}

export default TermsOfUse
