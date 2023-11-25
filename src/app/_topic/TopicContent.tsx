'use client'

import React, { useEffect } from 'react'
import { request } from '@/app/utils/request'
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Avatar,
  RadioGroup,
  Radio,
} from '@nextui-org/react'

import type { TopicRequest } from '../../../types/ApiRequest'

interface PropsType {
  topics: TopicRequest[]
  setTopics: React.Dispatch<React.SetStateAction<TopicRequest[]>>
}

interface TopicCardProps {
  item: TopicRequest
}

function TopicCardHeader(props: TopicCardProps) {
  const { item } = props

  return (
    <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
      <p className='text-tiny uppercase font-bold flex'>
        <Avatar src={item.avatar} />
        <div className='ml-2'>
          <p>{item.userId}</p>
          <small className='text-default-500'>{item.createTime}</small>
        </div>
      </p>
      <h4 className='text-small my-4 text-gray-500'>{item.content}</h4>
    </CardHeader>
  )
}

function TopicCardBody(props: TopicCardProps) {
  const { item } = props

  return (
    <CardBody className='w-full'>
      <div className='flex items-center justify-start flex-row gap-4 flex-wrap pb-3'>
        {item.images.map((image, index) => {
          return (
            <Image
              isZoomed
              alt={`第${index}张图片`}
              className='object-cover rounded-xl'
              key={index}
              src={image}
              width={270}
            />
          )
        })}
      </div>
      <RadioGroup label='Please select'>
        {item.options.map((option, index) => {
          return (
            <Radio value='buenos-aires' key={index}>
              {option.key}
            </Radio>
          )
        })}
      </RadioGroup>
    </CardBody>
  )
}

function TopicContent(props: PropsType) {
  const { topics, setTopics } = props

  useEffect(() => {
    const getData = () => {
      request('/topic', {
        method: 'GET',
        cache: 'no-cache',
      }).then((res) => {
        setTopics(res.data)
      })
    }
    getData()
  }, [setTopics])

  return (
    <div className='w-10/12 mx-4'>
      {topics &&
        topics.map((item, index) => {
          return (
            <>
              <Card className='px-4 py-6' key={item.id}>
                <TopicCardHeader item={item} />
                <TopicCardBody item={item} />
              </Card>
              {topics.length - 1 !== index ? <Divider className='my-6' /> : ''}
            </>
          )
        })}
    </div>
  )
}

export default TopicContent
