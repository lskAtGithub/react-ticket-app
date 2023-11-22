// app/components/ThemeSwitcher.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunMoon, Moon } from 'lucide-react'
import { Button } from '@nextui-org/react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <div>
      <Button
        isIconOnly
        color='warning'
        variant='faded'
        aria-label='theme'
        onClick={() => toggleTheme()}>
        {theme === 'light' ? <Moon size={25} /> : <SunMoon size={25} />}
      </Button>
    </div>
  )
}
