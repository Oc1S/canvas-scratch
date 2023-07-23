import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const hoverRef = useRef(false)
  const canvasPos = useRef({ x: 0, y: 0 })
  const touchRef = useRef([{ x: 0, y: 0 }])

  // useEffect(() => {
  //   const handleMouseDown = () => {
  //     hoverRef.current = true
  //   }
  //   const handleMouseUp = () => {
  //     hoverRef.current = false
  //   }
  //   window.addEventListener('touchstart', handleMouseDown)
  //   window.addEventListener('touchend', handleMouseUp)
  //   window.addEventListener('mousedown', handleMouseDown)
  //   window.addEventListener('mouseup', handleMouseUp)
  //   return () => {
  //     window.removeEventListener('touchstart', handleMouseDown)
  //     window.removeEventListener('touchend', handleMouseUp)
  //     window.removeEventListener('mousedown', handleMouseDown)
  //     window.removeEventListener('mouseup', handleMouseUp)
  //   }
  // }, [])

  const draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement
    const context = canvas.getContext('2d')!
    // 绘制涂层
    context.beginPath()
    context.fillStyle = 'cyan'
    context.fillRect(0, 0, 400, 300)

    const canvasRect = canvas.getBoundingClientRect()
    context.fillRect(0, 0, 400, 300)
    canvasPos.current.x = canvasRect.x + document.documentElement.scrollLeft
    canvasPos.current.y = canvasRect.y + document.documentElement.scrollTop

    const mouseDraw = (e: MouseEvent) => {
      if (!hoverRef.current) return
      const x = e.offsetX,
        y = e.offsetY
      draw(context, x, y)
    }

    const touchDraw = (e: TouchEvent) => {
      e.preventDefault()
      console.log(e, e.changedTouches, e.targetTouches, e.touches)
      const touches = e.targetTouches
      Array.from(touches).forEach(touchPoint => {
        const x = touchPoint.pageX,
          y = touchPoint.pageY
        draw(context, x - canvasPos.current.x, y - canvasPos.current.y)
        console.log(canvasPos.current.x, x, x - canvasPos.current.x)
      })
      // touches：屏幕上所有触摸点的信息
      // targetTouches：目标区域上所有触摸点的信息
      // changedTouches：当前事件触摸点的信息
    }

    canvas.addEventListener('mousemove', mouseDraw)
    canvas.addEventListener('touchmove', touchDraw)
    return () => {
      canvas.removeEventListener('mousemove', mouseDraw)
      canvas.removeEventListener('touchmove', touchDraw)
    }
  }, [])

  return (
    <div>
      <img src={reactLogo} className='logo react' alt='React logo' />
      <canvas id='canvas' width='400' height='300'></canvas>
      <div
        onClick={() => {
          setCount(count + 1)
        }}
      >
        {count}
      </div>
    </div>
  )
}

export default App
