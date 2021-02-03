import { Box, Flex, HStack, Text, IconButton, Tooltip, ScaleFade } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useScroll from '../../../hooks/useScroll'
import DriveFile from '../../../type/driveFile'
import DriveItem from '../atom/DriveItem/DriveItem'
import { RiPushpin2Fill, RiPushpin2Line } from 'react-icons/ri'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { GrDocumentPdf } from 'react-icons/gr'
import { ImOnedrive } from 'react-icons/im'
import useEffectWhen, { LARGER } from '../../../hooks/useEffectWhen'

type Props = {
  mode: "print" | "drive"
  items: DriveFile[]
  onClick: (item: DriveFile) => void
  onClickPrint: () => void
  disabledItems?: DriveFile[]
  hoverMessage?: string
  onClickLook?: (file: DriveFile) => void
}

const ItemBar: React.FC<Props> = ({ mode, items, onClick, onClickPrint, onClickLook, disabledItems = [], hoverMessage }) => {
  const { state: scroll, direction } = useScroll(scroll => scroll < 50)
  const [pinned, setPinned] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const ref = useRef<null | HTMLDivElement>(null)

  const changeShowHeader = useCallback((value: boolean) => {
    if(!pinned) setShowHeader(value)
  }, [pinned])

  useEffect(() => {
    changeShowHeader(pinned || scroll === true || direction === "backward")
  }, [scroll, direction, pinned, changeShowHeader])

  useEffectWhen(() => {
    if (ref.current == null) return
    ref.current.scrollTo({ top: 0, left: 1000, behavior: "smooth" })
  }, items.length, LARGER)

  return (
    <Box
      position="fixed" top={0} left={0} w="full" zIndex={10} pointerEvents="none"
      transition={!pinned ? `all 0.5s ${!scroll ? 0.25 : 0.5}s` : "all 0s"}
      willChange="transform"
      transform={showHeader ? "translateY(0)" : "translateY(-160px)"}
    >
      <HStack
        spacing={1} ref={ref}
        h="calc(160px + env(safe-area-inset-top))"
        pt="env(safe-area-inset-top)" pb={2} pl="calc(1rem + env(safe-area-inset-left))" pr="calc(1rem + env(safe-area-inset-right))" // iPhone X
        pointerEvents="all"
        transition={!pinned ? `all 0.5s ${!scroll ? 0.25 : 0.5}s` : "all 0s"}
        bg="gray.50" boxShadow={showHeader ? "md" : "none"} zIndex={10}
        overflowX="scroll" wrap="nowrap" overflowY="visible"
      >
        {
          items.map(item => (
            <ScaleFade key={item.id} initialScale={0.2} in={true}>
              <DriveItem
                item={item}
                onClick={() => onClick(item)}
                size="sm"
                disabled={disabledItems.find(_item => _item.id === item.id) != null}
                onLook={onClickLook == null ? null : () => onClickLook(item)}
              />
            </ScaleFade>
          ))
        }
        {
          items.length === 0 &&
          <Flex
            align="center" justify="center"
            borderRadius="10px" h="full" p={4}
          >
            <Text color="gray.600" fontSize="sm">写真はまだ選択されていません</Text>
          </Flex>
        }
      </HStack>
      <Flex
        direction="row" justifyContent="flex-end"
        px={4} position="relative" zIndex={20} w="full"
      >
        <HStack
          spacing={0}
          alignItems="center" justifyContent="flex-end" pointerEvents="all"
          bg="gray.50" borderBottomRadius="5px" mt={0} boxShadow="md"
        >
          <Tooltip label="バーの自動開閉をオフ" fontSize="xs" openDelay={500}>
            <IconButton
              flex={1} bg={pinned ? "gray.300" : "gray.50"}
              _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
              icon={pinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
              aria-label="ピン留め"
              aria-pressed={pinned}
              onClick={() => setPinned(!pinned)}
            />
          </Tooltip>
          <Tooltip label="選択中のファイルを表示" fontSize="xs" openDelay={500}>
            <Flex mx="auto" flex={1} alignItems="center" justifyContent="center" position="relative">
              <IconButton
                flex={1} bg="gray.50"
                _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
                icon={<HiOutlinePhotograph />}
                aria-label="選択中のファイルを表示する"
                onClick={() => setShowHeader(!showHeader)}
              />
              {
                items.length > 0 &&
                <Flex
                  alignItems="center" justifyContent="center"
                  position="absolute" top={1} right={1} w="16px" h="16px" bg="tomato" borderRadius="full"
                  pointerEvents="none"
                >
                  <Text fontSize="xs" color="white" fontWeight="bold">
                    {items.length > 99 ? "+" : items.length}
                  </Text>
                </Flex>
              }
            </Flex>
          </Tooltip>
          {
            mode === "drive" ? (
              <Tooltip label="写真を配置する" fontSize="xs" openDelay={500}>
                <IconButton
                  flex={1} bg="gray.50"
                  isDisabled={items.length === 0}
                  _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
                  icon={<GrDocumentPdf />}
                  aria-label="PDF印刷"
                  onClick={onClickPrint}
                />
              </Tooltip>
            ) : (
              <Tooltip label="ドライブへ戻る" fontSize="xs" openDelay={500}>
                <IconButton
                  flex={1} bg="gray.50"
                  _focus={{ outline: "none" }} _focusVisible={{ outline: "auto" }}
                  icon={<ImOnedrive />}
                  aria-label="ドライブへ戻る"
                  onClick={onClickPrint}
                />
              </Tooltip>
            )
          }
        </HStack>
      </Flex>
    </Box>
  )
}

export default ItemBar
