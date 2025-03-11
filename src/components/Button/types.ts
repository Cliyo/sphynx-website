import { theme } from "@themes/"

export type ButtonProps = {
  text: string
  color: keyof typeof theme.COLORS
  onClick?: () => void
}
