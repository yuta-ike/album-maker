import React, { useState } from 'react'
import { auth } from '../../../util/firebase'
import authProvider from '../../../util/authProvider'
import { Icon, Button, Flex, Checkbox, Image, Heading, Text, Stack, VStack, Box, useDisclosure } from '@chakra-ui/react'
import { Link, useHistory } from 'react-router-dom'
import LoginDialog from './component/LoginDialog'
import { FiShare } from 'react-icons/fi'

const device: "iPhone" | "Android" | "Others" = (() => {
  if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('iPad') > 0){
    return "iPhone"
  }else if (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0) {
    return "Android"
  }else{
    return "Others"
  }
})()
const isPWA = window.matchMedia('(display-mode: standalone)').matches

const Login: React.FC = () => {
  const history = useHistory()
  const [selectedPhotoId, setSelectedPhotoId] = useState<1 | 2>(1)
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: /dialog=open/.test(window.location.search) })

  const [acceptPolicy, setAcceptPolicy] = useState(false)

  const handleDialogOpen = () => {
    history.push("/login?dialog=open")
    setAcceptPolicy(false)
    onOpen()
  }

  const handleDialogClose = () => {
    history.push("/login")
    setAcceptPolicy(false)
    onClose()
  }

  const handleLogin = async () => {
    if (!acceptPolicy) return
    await auth.signInWithRedirect(authProvider)
    setAcceptPolicy(false)
  }

  return (
    <div>
      <Flex
        position="fixed" w="100vw" top={0} left={0} h="calc(60px + env(safe-area-inset-top))"
        justifyContent="space-between" align="center" px={4} pb={2} pt="calc(0.5rem + env(safe-area-inset-top))"
        bg="blue.50" boxShadow="sm" zIndex={30}
      >
        <Heading size="h2"><span style={{ fontSize: "130%" }}>O</span>NE<span style={{ fontSize: "130%" }}>P</span>ICK</Heading>
        <Button onClick={handleDialogOpen} colorScheme="teal">ログイン</Button>
      </Flex>
      <Flex pt="100px" maxW="full" w="800px" mx="auto" direction="column" align="center">
        <Heading as="h1">
          O<span style={{ fontSize: "80%" }}>NE</span>P<span style={{ fontSize: "80%" }}>ICK</span>
          <span style={{ fontSize: "90%" }}>でできること</span>
        </Heading>
        <Text my={4}>OneDrive上の写真を選択し、A4形式で印刷できます</Text>
        <Flex my={8} position="relative" w="800px" maxW="90%" borderRadius="10px" overflow="hidden" boxShadow="lg" h="auto" align="flex-start">
          <Image
            src={`./image/fig1.png`}
            transition="all .3s"
            transform={selectedPhotoId === 1 ? "translateX(0)" : "translateX(-100%)"}
          />
          <Image
            src={`./image/fig2.png`}
            transition="all .3s"
            transform={selectedPhotoId === 2 ? "translateX(-100%)" : "translateX(0)"}
          />
          <Box background="#33333360" position="absolute" bottom={0} w="full" px={2} py={2}>
            <Text color="white">{selectedPhotoId === 1 ? "OneDrive上の写真から選択" : "A4形式に自由に配置"}</Text>
          </Box>
        </Flex>
        <Stack direction="row">
          {
            ([1, 2] as const).map(id => (
              <Box
                key={id} as="button" aria-pressed={id === selectedPhotoId}
                _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
              >
                <Image
                  src={`./image/fig${id}.png`}
                  w="150px" maxW="full" boxShadow="sm" transition="all .3s" borderRadius="10px" border="2px solid transparent"
                  {...(id === selectedPhotoId ? { boxShadow: "md", border: "2px solid gray"} : {})}
                  onClick={() => setSelectedPhotoId(id)}
                />
              </Box>
            ))
          }
        </Stack>
        <VStack bg="blue.50" borderRadius="10px" pt={6} pb={8} alignItems="center" mt={16} w="90%">
          <Text my={4} fontWeight="bold">Microsoftアカウントでログイン!!</Text>
          <Checkbox
            isChecked={acceptPolicy}
            onChange={e => setAcceptPolicy(e.target.checked)}
          >
            <Link to="/terms" className="link">利用規約</Link>と<Link to="/privacy" className="link">プライバシーポリシー</Link>に同意する
          </Checkbox>
          <Button onClick={handleLogin} colorScheme="teal" disabled={!acceptPolicy}>
            ログイン
          </Button>
        </VStack>
        {
          (device === "iPhone" || device === "Android") && !isPWA &&
          <Text fontSize="sm" color="gray.500" px={8} mt={8}>
            【{device}ユーザーの皆様】<br/>
            {device === "iPhone" ?
              <>Safariの画面下部の <Icon as={FiShare} mr={1}/>から「ホーム画面に追加」していただくと</>
              : "ウェブサイトをホーム画面に追加していただくと"}
            快適にご利用いただけます
          </Text>
        }
        <Image src="./image/fig3.png"/>
        <Text fontSize="sm" mb={8} color="gray.500" px={8} textAlign="center">
          ※ 動作確認済み環境: MacOS (Chrome Safari Edge) / iOS (Safari Chrome)
        </Text>
        <Flex
          w="100vw" h="130px" bg="blue.50" direction="column" align="center" px={4} py={8}
        >
          <Box textAlign="center">
            <Link to="/terms" className="link">利用規約</Link>
            {" "}/{" "}<Link to="/privacy" className="link">プライバシーポリシー</Link>
            {" "}/{" "}<a href="https://forms.gle/zHryvud1EHYzt9U26" className="link">お問い合わせ</a>
            {" "}/{" "}イラスト: <a href="https://loosedrawing.com/" className="link" target="_blank" rel="noreferrer">Loose Drawing</a>
          </Box>
          <Text fontSize="sm" mt={2}>©yuta-ike</Text>
        </Flex>
      </Flex>
      <LoginDialog
        isOpen={isOpen}
        onClose={handleDialogClose}
        onLogin={handleLogin}
        acceptPolicy={acceptPolicy}
        setAcceptPolicy={setAcceptPolicy}
      />
    </div>
  )
}

export default Login
