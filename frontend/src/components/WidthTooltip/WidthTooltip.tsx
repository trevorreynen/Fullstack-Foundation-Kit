// import WidthTooltip from '@/components/WidthTooltip/WidthTooltip'

// =========================< IMPORTS: REACT >=================================
import { useEffect, useRef, useState, ReactElement, cloneElement } from 'react'

type WidthTooltipProps = {
  children: ReactElement<any, any>
}


/**
 * This component is used to display a tooltip of the side of an element. Just wrap the element, could by a random div, or
 * what I use it for mostly is my tables to determine the proper column widths.
 */
export default function WidthTooltip({ children }: WidthTooltipProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const updateWidth = () => {
      setWidth(ref.current?.offsetWidth ?? null)
    }

    const observer = new ResizeObserver(updateWidth)
    observer.observe(ref.current)
    updateWidth()

    return () => {
      observer.disconnect()
    }
  }, [])

  return cloneElement(children, {
    ref,
    title: width ? `Width: ${width}px` : 'Calculating width...',
  })
}

