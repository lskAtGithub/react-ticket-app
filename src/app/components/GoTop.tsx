import { Button } from '@nextui-org/react'
import { ArrowUpToLine } from 'lucide-react'

function GoTop() {
  const handleGotTop = () => {
    // 获取当前滚动位置
    const currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop
    // 计算步长，可以根据需要调整
    const step = currentScroll / 15
    function scroll() {
      // 减小滚动位置
      document.documentElement.scrollTop -= step
      document.body.scrollTop -= step

      // 判断是否到达顶部
      if (
        document.documentElement.scrollTop > 0 ||
        document.body.scrollTop > 0
      ) {
        // 继续滚动
        window.requestAnimationFrame(scroll)
      }
    }

    // 启动滚动
    window.requestAnimationFrame(scroll)
  }

  return (
    <Button
      className='fixed right-5 bottom-20'
      isIconOnly
      color='warning'
      variant='faded'
      aria-label='theme'
      onPress={handleGotTop}>
      <ArrowUpToLine />
    </Button>
  )
}

export default GoTop
