import { Image, Box, HStack, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineRotateLeft } from 'react-icons/ai'
import { Rnd } from 'react-rnd'
import { MdClose } from 'react-icons/md'
import DriveFile from '../../../../type/driveFile'
import { useSWRCreateUrl } from '../../../../hooks/swrHooks'
import css from './RndItem.module.scss'

type Props = {
  file: DriveFile
  rotate: () => void
  deleteFile: () => void
  rotation: 0 | 90 | 180 | 270
}

const RndItem: React.FC<Props> = ({ file, rotate, deleteFile, rotation }) => {
  const url = useSWRCreateUrl(file)

  const [isHovered, setIsHovered] = useState(false)
  const [isResizeing, setIsResizeing] = useState(false)
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 250,
        height: 250 * (file.image.height / file.image.width),
      }}
      lockAspectRatio={true}
      resizeHandleComponent={isHovered || isResizeing ? {
        topRight: <Box w="16px" h="16px" bg="blue.100" borderRadius="full" boxShadow="lg" />,
        bottomRight: <Box w="16px" h="16px" bg="blue.100" borderRadius="full" boxShadow="lg" />,
        bottomLeft: <Box w="16px" h="16px" bg="blue.100" borderRadius="full" boxShadow="lg" />,
        topLeft: <Box w="16px" h="16px" bg="blue.100" borderRadius="full" boxShadow="lg" />,
      } : {}}
      className={`print-image ${css.printImage}`}
      onResizeStart={() => setIsResizeing(true)}
      onResizeStop={() => setIsResizeing(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <Image
        src={url} alt={file.name} className="print-item"
        w="full" h="full" transform={`rotate(${rotation}deg)`} bg="gray.100"
        draggable="false"
      />
      {
        isHovered &&
        <HStack position="absolute" top={2} right={2}>
          <IconButton
            icon={<AiOutlineRotateLeft />}
            aria-label="写真を回転"
            onClick={rotate}
          />
          <IconButton
            icon={<MdClose />}
            aria-label="写真を削除"
            onClick={deleteFile}
          />
        </HStack>
      }
    </Rnd>
  )
}

export default RndItem
