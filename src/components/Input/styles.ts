import styled, { css } from 'styled-components'

type InputCampProps = {
  hasError: boolean
}

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 50px;
`

export const Label = styled.p`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    font-size: ${theme.FONT_SIZE.REGULAR}px;
  `}
`

export const InputCamp = styled.input<InputCampProps>`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_0};

  padding: 15px;

  border-radius: 4px;
  border: ${({ hasError, theme }) =>
    hasError
      ? `1px solid ${theme.COLORS.ERROR_MAIN}`
      : `1px solid ${theme.COLORS.PRIMARY_DARK}`};

  &:focus-visible {
    outline: none;
  }
`

export const ErrorMessage = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-start;

  margin-top: 5px;

  gap: 5px;

  ${({ theme }) => css`
    color: ${theme.COLORS.ERROR_MAIN};
    font-size: ${theme.FONT_SIZE.SMALL}px;
  `}
`
