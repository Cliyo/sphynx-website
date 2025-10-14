export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: {
    label: string
    value: string | number
  }[]
  errorMessage?: string
  onChange?: (value: string | number) => void
}
