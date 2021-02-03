import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

type Props = {
  text: string
}

const AnimatedText: React.FC<Props> = ({ text }) => {
  return (
    <Flex justifyContent="center" className="loading" pb={8}>
      {
        text.split("").map((letter, i) => (
          <Text
            key={i}
            as="span"
            mr={i === text.length - 1 ? 0 : "1em"}
            userSelect="none"
            animation={`bounce 2s infinite ${i / 10.0}s`}
          >
            {letter}
          </Text>
        ))
      }
    </Flex>
  )
}

export default AnimatedText
