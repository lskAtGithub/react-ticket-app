'use client'

import { UserButton } from '@clerk/nextjs'
import { Spacer } from '@nextui-org/react'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import PublishButton from '@/app/_topic/PublishButton'
import TopicContent from '@/app/_topic/TopicContent'
import { useState } from 'react'

import type { TopicRequest } from '../../types/ApiRequest'

export default function Home() {
  const [topics, setTopics] = useState<TopicRequest[]>([])

  return (
    <div>
      <header className='w-full h-14'>
        <div className='fixed top-4 right-8 flex justify-stretch items-center'>
          <PublishButton />
          <Spacer x={4} />
          <ThemeSwitcher />
          <Spacer x={4} />
          <UserButton afterSignOutUrl='/'></UserButton>
        </div>
      </header>
      <div className='flex items-center justify-center m-4'>
        <main className='flex flex-col items-center justify-center w-full border-x-2 sm:w-full md:w-9/12 lg:w-6/12'>
          <TopicContent topics={topics} setTopics={setTopics} />
        </main>
      </div>
    </div>
  )
}
