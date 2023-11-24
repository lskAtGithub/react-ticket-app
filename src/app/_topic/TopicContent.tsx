'use client'

import React, { useEffect } from 'react'
import { request } from '@/app/utils/request'
import { Card, CardHeader, CardBody, Image, Divider } from '@nextui-org/react'

import type { TopicRequest } from '../../../types/ApiRequest'

interface PropsType {
  topics: TopicRequest[]
  setTopics: React.Dispatch<React.SetStateAction<TopicRequest[]>>
}

interface TopicCardProps {
  item: TopicRequest
}

function TopicCardHeader(props: TopicCardProps) {
  return (
    <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
      <p className='text-tiny uppercase font-bold'>Daily Mix</p>
      <small className='text-default-500'>12 Tracks</small>
      <h4 className='font-bold text-large'>Frontend Radio</h4>
    </CardHeader>
  )
}

function TopicCardBody(props: TopicCardProps) {
  const { item } = props

  return (
    <CardBody className='overflow-visible py-2'>
      {item.images.map((item, index) => {
        return (
          <Image
            alt='Card background'
            className='object-cover rounded-xl'
            key={index}
            src={item}
            width={270}
            height={270}
          />
        )
      })}
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
  }, [])

  return (
    <div>
      {topics.map((item, index) => {
        return (
          <>
            <Card className='px-4 py-6' key={item.id}>
              <TopicCardHeader item={item} />
              <TopicCardBody item={item} />
            </Card>
            {topics.length - 1 !== index ? (
              <Divider className='mt-2 mb-2' />
            ) : (
              ''
            )}
          </>
        )
      })}
    </div>
  )
}

export default TopicContent
