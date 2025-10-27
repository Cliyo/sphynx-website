export type Option = {
  label: string
  value: string | number
}

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: Option[]
  errorMessage?: string
  onChange?: (value: string | number | (string | number)[]) => void
}
