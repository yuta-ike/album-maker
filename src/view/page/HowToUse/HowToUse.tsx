import { Box, Center, ListItem, OrderedList, Image, Heading, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUserStateValues } from '../../../state/context/UserProvider'
import Footer from '../../component/organization/Footer'
import Header from '../../component/organization/Header'

const HowToUse = () => {
  const history = useHistory()
  const { user } = useUserStateValues()
  return (
    <>
      <Header />
      <Center p={4} pt="calc(60px + 2rem)" pb={36} d="flex" flexDirection="column" minH="100vh">
        <Heading size="h4">使い方</Heading>
        <OrderedList maxW="800px">
          <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" my={8}>
            <ListItem>
              利用規約とプライバシーポリシーをよく読み、Microsoftアカウントでログインします。
            </ListItem>
          </Box>
          <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" my={8}>
            <ListItem mb={4}>
              印刷したい写真を複数枚、選択します。選択した写真はメニューバーに追加されていきます。
            </ListItem>
            <Center>
              <Image
                height="300px"
                src="/image/howToUse/02.png"
              />
            </Center>
          </Box>
          <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" my={8}>
            <ListItem mb={4}>
              選択したら、メニューバー右下のPDFアイコンをクリックします。
            </ListItem>
            <Center>
              <Image
                height="300px"
                src="/image/howToUse/03.png"
              />
            </Center>
          </Box>
          <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" my={8}>
            <ListItem mb={4}>
              下記のような画面に遷移します。メニューバーの写真をクリックすると、写真がA4紙面上に出現します。
            </ListItem>
            <Center>
              <Image
                height="300px"
                src="/image/howToUse/05.png"
              />
            </Center>
          </Box>
          <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" my={8}>
            <ListItem>
              ドラッグでサイズや位置を調整してください。90°単位で回転させることもできます。
            </ListItem>
          </Box>
          <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" my={8}>
            <ListItem>
              調整が終わったら、印刷ボタンを押して印刷できます。
            </ListItem>
          </Box>
        </OrderedList>
        <Heading size="h4" mt={16}>その他の説明</Heading>
        <Box bg="blue.100" borderRadius="10px" p={8} boxShadow="sm" my={8}>
          <Image
            height="300px"
            src="/image/howToUse/07.png"
          />
        </Box>
        {user != null ? (
          <>
            <Button onClick={() => history.goBack()} mt={16}>戻る</Button>
            <Text fontSize="sm">※ うまく戻れない場合はリロードしてください</Text>
          </>
        ) : (
          <>
            <Button onClick={() => history.push("/login")} mt={16} colorScheme="teal">ログインする！</Button>
          </>
        )}
      </Center>
      <Footer/>
    </>
  )
}

export default HowToUse
