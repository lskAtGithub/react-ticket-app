"use client"

import { UserButton } from '@clerk/nextjs'
import { Spacer } from '@nextui-org/react'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import PublishButton from '@/app/components/PublishButton'

export default function Home() {
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

        </main>
      </div>
    </div>
  )
}
