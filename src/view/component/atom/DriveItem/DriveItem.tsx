import React, { useState } from 'react'
import { Image, Flex, Spacer, Text, Box, AspectRatio, Tooltip, Icon, ScaleFade } from '@chakra-ui/react'
import DriveFile from '../../../../type/driveFile'
import { FaCheckCircle } from 'react-icons/fa'
import { MdClose, MdPhoto } from 'react-icons/md'

type Props = {
  item: DriveFile
  onClick?: (() => void) | null
  selected?: boolean
  size?: "sm"
  disabled?: boolean
  hoverMessage?: string
  onLook?: (() => void) | null
}

const DriveItem: React.FC<Props> = ({ item, onClick, selected, size, disabled = false, hoverMessage, onLook }) => {
  const [isHoverShowButton, setIsHoberShowButton] = useState(false)
  return (
    <Box
      as="button"
      disabled={disabled}
      position="relative" _focus={{outline: "none"}} _focusVisible={{outline: "auto"}}
      tabIndex={!onClick ? -1 : 0}
      cursor={!onClick ? "default" : disabled ? "not-allowed" : "pointer"}
      role="group"
    >
      <Flex {...(onClick != null ? { onClick } : {})}
        direction="column"
        bg="white" borderRadius="10px" boxShadow="sm" overflow="hidden" border="1px" borderColor="gray.100"
        pb={size === "sm" ? 2 : 4} h="full" w={size === "sm" ? "100px" : "auto"} transition="all .2s"
        _hover={!disabled && !isHoverShowButton && onClick != null ? { boxShadow: "md", transition: "all .3s"} : {}}
        _groupActive={onClick != null ? { boxShadow: "none" } : {}}
        role="group"
      >
        <Box position="relative">
          <AspectRatio ratio={1}>
            <Image
              objectFit="cover"
              src={size === "sm" ? item.thumbnail?.medium?.url : item.thumbnail?.large?.url}
              alt={item.name}
              loading="lazy"
              fallbackSrc="https://via.placeholder.com/150"
            />
          </AspectRatio>
          {
            onLook != null && !disabled &&
            <Tooltip label="画像を確認する" fontSize="xs" openDelay={500}>
              <Box
                role="button" tabIndex={0}
                position="absolute" bottom={1} right={1} borderRadius="full"
                background="#33333320" p={2} _hover={!disabled ? { background: "#333333cc" } : {}}
                _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
                onClick={(e: any) => {
                  e.stopPropagation()
                  onLook()
                }}
                onMouseEnter={() => setIsHoberShowButton(true)}
                onMouseLeave={() => setIsHoberShowButton(false)}
                cursor="pointer"
              >
                <Icon as={MdPhoto} color="white" w={6} h={6} />
              </Box>
            </Tooltip>
          }
        </Box>
        <Spacer/>
        <Box height={2}/>
        <Tooltip label={item.name} fontSize="xs" openDelay={500}>
          <Text
            px={2} isTruncated fontSize="sm"
            _groupHover={!isHoverShowButton && !disabled && onClick != null ? { color: 'tomato', textDecoration: 'underline' } : {}}
          >
            {item.name}
          </Text>
        </Tooltip>
      </Flex>
      {
        (selected || disabled) &&
        <Box
          position="absolute" top={0} left={0} w="full" h="full" bg={selected ? "blue.100" : "gray.100"} borderRadius="10px"
          opacity={selected ? 0.3 : 0.5} pointerEvents="none"
        />
      }
      {
        hoverMessage != null && !isHoverShowButton &&
        <Flex
          direction="column" alignItems="center" justifyContent="center"
          position="absolute" top={0} left={0} w="full" h="full" bg="gray.500" borderRadius="10px"
          opacity={0} pointerEvents="none"
          _groupHover={{ opacity: 0.5 }}
        >
          <Icon as={MdClose} color="white" w={16} h={16}/>
          <Text color="white">{hoverMessage}</Text>
        </Flex>
      }
      <Box position="absolute" top={2} left={2}>
        <ScaleFade initialScale={0.2} in={selected}>
          <Icon as={FaCheckCircle} color="blue.400" w={6} h={6}/>
        </ScaleFade>
      </Box>
    </Box>
  )
}

export default DriveItem
