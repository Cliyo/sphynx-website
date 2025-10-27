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
import { Option, SelectProps } from './types'

export const Select = (props: SelectProps) => {
  const { label, options, errorMessage, value, onChange, multiple } = props

  const [optionsSelected, setOptionsSelected] = useState<Option[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const handleSelectMultipleClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName === 'P') return
    setIsVisible(!isVisible)
  }

  const handleMultipleOptionClicked = (option: Option) => {
    const newSelection = [...optionsSelected, option]
    setOptionsSelected(newSelection)
    onChange?.(newSelection.map((option) => option.value))
    setIsVisible(false)
  }

  const handleSelectedOptionClicked = (option: Option) => {
    const newSelection = optionsSelected.filter(
      (optionSelected) => optionSelected.value !== option.value,
    )
    setOptionsSelected(newSelection)
    onChange?.(newSelection.map((option) => option.value))
  }

  useEffect(() => {
    if (!multiple) return
    const newValue = Array.isArray(value) ? value : []

    const selectedOptions = options.filter((option) =>
      newValue.includes(option.value),
    )
    if (
      selectedOptions.length !== optionsSelected.length ||
      !selectedOptions.every(
        (opt, idx) => opt.value === optionsSelected[idx]?.value,
      )
    ) {
      setOptionsSelected(selectedOptions)
    }
  }, [value, multiple, optionsSelected, options])

  return (
    <Container>
      <Label>{label}</Label>
      {multiple ? (
        <div onMouseLeave={() => setIsVisible(false)}>
          <SelectMultipleInput onClick={(e) => handleSelectMultipleClick(e)}>
            {optionsSelected.map((option: Option) => (
              <p
                onClick={() => handleSelectedOptionClicked(option)}
                key={option.value}
              >
                {option.label}
              </p>
            ))}
            {
              <span>
                {optionsSelected.length === 0 &&
                  'Selecione uma ou mais opções da lista'}
              </span>
            }
          </SelectMultipleInput>
          <OptionsMenu isVisible={isVisible}>
            {options.map((option) => {
              if (optionsSelected.includes(option)) return null

              return (
                <OptionItem
                  key={option.value}
                  onClick={() => handleMultipleOptionClicked(option)}
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
