'use client'

import { UserButton } from '@clerk/nextjs'
import { Spacer } from '@nextui-org/react'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import PublishButton from '@/app/_topic/PublishButton'
import GoTop from '@/app/components/GoTop'
import TopicContent from '@/app/_topic/TopicContent'
import { useState } from 'react'

import type { TopicRequest } from '../../types/ApiRequest'

export default function Home() {
  const [topics, setTopics] = useState<TopicRequest[]>([])
  const [isRefresh, setIsRefresh] = useState<number>(new Date().getTime())

  return (
    <div>
      <header className='w-full py-4'>
        <div className='flex justify-end items-center'>
          <PublishButton setIsRefresh={setIsRefresh}  />
          <Spacer x={4} />
          <ThemeSwitcher />
          <Spacer x={4} />
          <UserButton afterSignOutUrl='/'></UserButton>
        </div>
      </header>
      <div className='flex items-center justify-center m-4'>
        <main className='flex flex-col items-center justify-center w-full border-x-2 sm:w-full md:w-10/12 lg:w-10/12'>
          <TopicContent key={isRefresh} topics={topics} setTopics={setTopics} />
        </main>
      </div>
      <GoTop />
    </div>
  )
}
