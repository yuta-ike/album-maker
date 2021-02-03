import React, { useEffect } from 'react'
import { Text, Box, Button, Heading } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

const PrivacyPolicy = () => {
  const history = useHistory()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <Box p={4}>
      <Button onClick={() => history.goBack()}>戻る</Button>
      <Text fontSize="sm">※ うまく戻れない場合はリロードしてください</Text>
      <Heading mt={4}>プライバシーポリシー</Heading>
      <div dangerouslySetInnerHTML={{
        __html: `
第三者に個人を特定できる情報を提供することはありません。

免責事項
利用上の不具合・不都合に対して可能な限りサポートを行いますが、利用者が本サービスを利用して生じた損害に関して、運営者は責任を負わないものとします。

以上`.split("\n").join("<br/>")
      }} />
      <Button mt={4} onClick={() => history.goBack()}>戻る</Button>
      <Text fontSize="sm">※ うまく戻れない場合はリロードしてください</Text>
    </Box>
  )
}

export default PrivacyPolicy