import { MouseEvent, useEffect, useState } from 'react'
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
    const newSelection = [...optionsSelected, value]
    setOptionsSelected(newSelection)
    onChange?.(newSelection)
    setIsVisible(false)
  }

  const handleSelectedOptionClicked = (value: string) => {
    const newSelection = optionsSelected.filter(
      (optionValue) => optionValue !== value,
    )
    setOptionsSelected(newSelection)
    onChange?.(newSelection)
  }

  useEffect(() => {
    if (!multiple) return
    const newValue = Array.isArray(value) ? value : []

    if (JSON.stringify(newValue) !== JSON.stringify(optionsSelected)) {
      setOptionsSelected(newValue)
    }
  }, [value, multiple])

  return (
    <Container>
      <Label>{label}</Label>
      {multiple ? (
        <div onMouseLeave={() => setIsVisible(false)}>
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
        </div>
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
