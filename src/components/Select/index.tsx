import { MouseEvent, useState } from 'react'
import {
  Container,
  ErrorMessage,
  Label,
  OptionItem,
  OptionsMenu,
  SelectInput,
  SelectMultipleInput,
  SelectOption,
} from './styles'
import { SelectProps } from './types'

export const Select = (props: SelectProps) => {
  const { label, options, errorMessage, value, onChange, multiple } = props

  const [optionsSelected, setOptionsSelected] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const handleSelectMultipleClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'P') return
    setIsVisible(!isVisible)
  }

  const handleMultipleOptionClicked = (value: string) => {
    setOptionsSelected((prev) => [...prev, value])

    setIsVisible(false)
  }

  const handleSelectedOptionClicked = (value: string) => {
    setOptionsSelected((prev) =>
      prev.filter((optionValue) => optionValue !== value),
    )
  }

  return (
    <Container>
      <Label>{label}</Label>
      {multiple ? (
        <>
          <SelectMultipleInput onClick={(e) => handleSelectMultipleClick(e)}>
            {optionsSelected.map((option) => (
              <p
                onClick={() => handleSelectedOptionClicked(option)}
                key={option}
              >
                {option}
              </p>
            ))}
            {
              <span>
                {optionsSelected.length === 0 &&
                  'Selecione algum dia na semana'}
              </span>
            }
          </SelectMultipleInput>
          <OptionsMenu isVisible={isVisible}>
            {options.map((option) => {
              if (optionsSelected.includes(option.value as string)) return null

              return (
                <OptionItem
                  key={option.value}
                  onClick={() =>
                    handleMultipleOptionClicked(option.value as string)
                  }
                >
                  {option.label}
                </OptionItem>
              )
            })}
          </OptionsMenu>
        </>
      ) : (
        <SelectInput value={value} onChange={(e) => onChange?.(e.target.value)}>
          <SelectOption value="0">Selecione uma opção</SelectOption>
          {options.map((option) => (
            <SelectOption key={option.value} value={option.value}>
              {option.label}
            </SelectOption>
          ))}
        </SelectInput>
      )}

      {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
    </Container>
  )
}
