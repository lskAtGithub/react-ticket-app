import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Textarea,
  Spacer,
  Input,
  Chip,
} from '@nextui-org/react'
import { Send } from 'lucide-react'
import { useState } from 'react'

function PublishButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [content, setContent] = useState('')
  const [options, setOptions] = useState<String[]>([])
  const [currentOption, setCurrentOption] = useState('')

  function Chips() {
    const onCloseOption = (current: String) => {
      setOptions(options.filter((i) => i !== current))
    }

    return options.map((item, index) => (
      <Chip key={index} variant='flat' onClose={() => onCloseOption(item)}>
        {item}
      </Chip>
    ))
  }

  return (
    <>
      <Button color='success' endContent={<Send />} onPress={onOpen}>
        发布
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                发布话题
              </ModalHeader>
              <ModalBody>
                <Textarea
                  label='内容'
                  placeholder='写一篇话题吧'
                  variant='underlined'
                  labelPlacement='outside'
                  value={content}
                  onValueChange={setContent}></Textarea>
                <Spacer x={2} />
                <div className='flex items-center'>
                  <Input
                    label='输入选项'
                    size='sm'
                    variant='faded'
                    value={currentOption}
                    onValueChange={setCurrentOption}
                  />
                  <Spacer x={2} />
                  <Button
                    color='success'
                    onClick={() => {
                      setOptions([...options, currentOption])
                      setCurrentOption('')
                    }}>
                    添加
                  </Button>
                  <Spacer x={2} />
                </div>
                <div className='flex gap-2 flex-wrap'>{Chips()}</div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  取 消
                </Button>
                <Button color='primary' onPress={onClose}>
                  确 认
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default PublishButton
