import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import DriveFile from '../../../../type/driveFile'
import { Image, Box, Text, Icon, ScaleFade, Fade, SlideFade, Tooltip } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdClose } from 'react-icons/md'
import formatDate from '../../../../util/formatDate'

type Props = {
  file: DriveFile
  onNext: () => void
  onPrev: () => void
  onClose: () => void
}

const PiP: React.FC<Props> = ({ file, onNext: _onNext, onPrev: _onPrev, onClose: _onClose }) => {
  const [isHovered, setIsHovered] = useState(false)

  const [pos, setPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [size, setSize] = useState<{ width: string, height: string }>({ width: "250px", height: `${250 * (file.image.height / file.image.width)}px`})

  const onNext = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    _onNext()
  }

  const onPrev = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    _onPrev()
  }

  const onClose = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    _onClose()
  }

  return (
    <Rnd
      default={{
        x: pos.x,
        y: pos.y,
        width: size.width,
        height: `${parseInt(size.width.split("px")[0]) * (file.image.height / file.image.width)}px`
      }}
      minWidth="150px"
      minHeight="100px"
      bounds="body"
      onDragStop={(_, { x, y }) => setPos({ x, y })}
      onResizeStop={(_, __, ref, ___, pos) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        })
        setPos(pos)
      }}
      lockAspectRatio={true}
      key={file.id + "aa"}
      className="print-image"
      style={{
        zIndex: 9999,
        outline: "none",
        border: "none",
        position: "relative",
        pointerEvents: "all",
        borderRadius: "5px",
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <ScaleFade key={file.id+"wrapper"} initialScale={0.5} in={file != null}>
        <Image
          src={file.thumbnail.large.url}
          alt={file.name}
          draggable="false"
          objectFit="cover"
          w="full" bg="white" boxShadow="md"
        />
        <Fade in={isHovered}>
          <Box
            as="button"
            onClick={onPrev}
            onTouchStart={onPrev}
            position="absolute" top="50%" left={1} transform="translateY(-50%)" p={2} opacity={0.8} h="75%"
            role="group"
            _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
          >
            <Tooltip label="前の画像" openDelay={500}>
              <Box
                borderRadius="full" p={2}
                background="#33333320"
                _groupHover={{ background: "#333333cc" }}
              >
                <Icon boxSize={8} color="white" as={MdKeyboardArrowLeft}/>
              </Box>
            </Tooltip>
          </Box>
          <Box
            as="button"
            onClick={onNext}
            onTouchStart={onNext}
            position="absolute" top="50%" right={1} transform="translateY(-50%)" p={2} opacity={0.8} h="75%"
            role="group"
            _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
          >
            <Tooltip label="次の画像" openDelay={500}>
              <Box
                borderRadius="full" p={2}
                background="#33333320"
                _groupHover={{ background: "#333333cc" }}
              >
                <Icon boxSize={8} color="white" as={MdKeyboardArrowRight} />
              </Box>
            </Tooltip>
          </Box>
          <Tooltip label="閉じる" openDelay={500}>
            <Box
              as="button" onClick={onClose} onTouchStart={onClose}
              position="absolute" top={1} right={1} borderRadius="full" p={2} m={2} opacity={0.8}
              background="#33333320"
              _hover={{ background: "#333333cc" }} _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
            >
              <Icon boxSize={8} color="white" as={MdClose} />
            </Box>
          </Tooltip>
        </Fade>
        <SlideFade in={isHovered} offsetY="20px">
          <Box background="#333333aa" position="absolute" bottom={0} w="full" px={2} py={2}>
            <Text fontSize="xs" color="white">
              {formatDate(file.lastModifiedDateTime)}
            </Text>
            <Text fontSize="sm" color="white">
              
              {file.name}
            </Text>
          </Box>
        </SlideFade>
      </ScaleFade>
    </Rnd>
  )
}

export default PiP
