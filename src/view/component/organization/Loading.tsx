import React from 'react'
import { Flex } from '@chakra-ui/react'
import AnimatedText from '../atom/AnimatedText/AnimatedText'

const Loading = () => {
  return (
    <Flex
      align="center" justifyContent="center" direction="column"
      bg="blue.50" position="fixed" top={0} left={0} w="100vw" h="100vh" zIndex={1500}
    >
      {<AnimatedText text="ONEPICK"/>}
      {/* <Flex justifyContent="center" className="loading" pb={8}>
        {
          "ONEPICK".split("").map((letter, i) => (
            <Text
              key={i}
              as="span"
              mr="1em" userSelect="none"
              animation={`bounce 2s infinite ${i / 10.0}s`}
            >
              {letter}
            </Text>
          ))
        }
      </Flex> */}
    </Flex>
  )
}

export default Loading
