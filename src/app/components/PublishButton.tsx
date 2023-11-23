'use client'

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
import { FileUp, Send } from 'lucide-react'
import { CldUploadButton } from 'next-cloudinary'
import { useState } from 'react'
import { request } from '@/app/utils/request'

import type { CldUploadWidgetResults } from 'next-cloudinary'
import { useAuth, useUser } from '@clerk/nextjs'

function PublishButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [content, setContent] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [currentOption, setCurrentOption] = useState('')
  const [images, setImages] = useState<string[]>([])
  const { userId } = useAuth()
  const avatar = useUser().user?.imageUrl

  const onSubmit = (onClose: Function) => {
    request('/topic', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        avatar,
        content,
        images,
        options,
      }),
    }).then((res) => {
      console.log(res)
      onClose()
      onReset()
    })
  }
  const onReset = () => {
    setContent('')
    setOptions([])
    setCurrentOption('')
    setImages([])
  }

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

  function Upload() {
    const onUploadSuccess = (result: CldUploadWidgetResults) => {
      if (result.event === 'success' && result.info) {
        setImages([...images, (result.info as any).secure_url as string])
      }
    }

    return (
      <>
        <CldUploadButton
          uploadPreset='ksvontss'
          onSuccess={(result) => onUploadSuccess(result)}>
          <button className='bg-secondary-400 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded'>
            <div className='flex'>
              <FileUp />
              <span className='ml-2'>上传图片</span>
            </div>
          </button>
        </CldUploadButton>
        <div className=''>
          {images.map((item) => {
            return <img src={item} key={item} alt='' />
          })}
        </div>
      </>
    )
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
                {Upload()}
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
                </div>
                <Spacer x={2} />
                <div className='flex gap-2 flex-wrap'>{Chips()}</div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={() => {
                    onClose()
                    onReset()
                  }}>
                  取 消
                </Button>
                <Button color='primary' onPress={() => onSubmit(onClose)}>
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
