import { UserButton } from '@clerk/nextjs'
import { Spacer } from '@nextui-org/react'
import { ThemeSwitcher } from './components/ThemeSwitcher'

export default function Home() {
  return (
    <div>
      <header className='w-full h-14'>
        <div className='fixed top-4 right-8 flex justify-stretch items-center'>
          <ThemeSwitcher />
          <Spacer x={4} />
          <UserButton afterSignOutUrl='/'></UserButton>
        </div>
      </header>
      <div className='flex items-center justify-center m-4'>
        <main className='flex flex-col items-center justify-center w-full border-x-2 sm:w-full md:w-9/12 lg:w-6/12'>
          {[{}, {}, {}].map(() => (
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit,
              harum. Sunt aspernatur alias eum necessitatibus libero magnam
              eveniet a, deserunt placeat, quibusdam ut aut in repudiandae minus
              iure repellat officiis?
            </p>
          ))}
        </main>
      </div>
    </div>
  )
}
