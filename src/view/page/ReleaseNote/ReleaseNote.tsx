import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../../component/organization/Footer'
import Header from '../../component/organization/Header'

const ReleaseNote = () => {
  const history = useHistory()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <>
      <Header/>
      <Box px={8} pt="calc(60px + 2rem)" pb={36} maxW="800px" mx="auto" minH="100vh">
        <Box bg="gray.100" borderRadius="10px" p={8} boxShadow="sm">
          <Heading size="h3">リリースノート</Heading>
          <Text mt={4}>ver 1.2 (2021/2/8) リリースノートを追加</Text>
          <Text mt={4}>ver 1.1 (2021/2/7) 使い方を追加 </Text>
          <Text mt={4}>ver 1.0 (2021/2/3) リリース </Text>
        </Box>
        <Box bg="gray.100" borderRadius="10px" my={16} p={8} boxShadow="sm">
          <Heading size="h3">Githubレポジトリ</Heading>
          <Text mt={2}>
            <a href="https://github.com/yuta-ike/album-maker" className="link">yuta-ike/album-maker</a>
          </Text>
        </Box>
        <Button onClick={() => history.goBack()} mt={8}>戻る</Button>
        <Text fontSize="sm">※ うまく戻れない場合はリロードしてください</Text>
      </Box>
      <Footer />
    </>
  )
}

export default ReleaseNote
