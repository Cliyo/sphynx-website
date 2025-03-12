import { theme } from '@themes/'
import React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  color: keyof typeof theme.COLORS
}
