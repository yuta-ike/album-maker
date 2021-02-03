import { ButtonGroup, Icon, IconButton, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { MdPhoto } from 'react-icons/md'

type Props = {
  size: "sm" | "md" | "lg"
  setSize: (size: "sm" | "md" | "lg") => void
}

const SizeButton: React.FC<Props> = ({ size, setSize }) => {
  return (
    <ButtonGroup isAttached mx={4}>
      {
        (["sm", "md", "lg"] as const).map((_size, i) => {
          const label = _size === "sm" ? "小" : _size === "md" ? "中" : "大"
          return (
            <Tooltip label={label} key={_size} openDelay={500}>
              <IconButton
                aria-label="Add to friends"
                icon={<Icon as={MdPhoto} boxSize={3 + i} />}
                isActive={size === _size} aria-pressed={size === _size}
                onClick={() => setSize(_size)}
                _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
              />
            </Tooltip>
          )
        })
      }
    </ButtonGroup>
  )
}

export default SizeButton
