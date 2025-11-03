import React, { createContext, useEffect, useState } from 'react'

import { ResizeContextDataProps, ResizeContextProviderProps } from './types'

export const ResizeContext = createContext({} as ResizeContextDataProps)

export const ResizeContextProvider = ({
  children,
}: ResizeContextProviderProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ResizeContext.Provider value={{ isMobile }}>
      {children}
    </ResizeContext.Provider>
  )
}
