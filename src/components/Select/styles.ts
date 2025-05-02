import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
`

export const Label = styled.p`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    font-size: ${theme.FONT_SIZE.REGULAR}px;
  `}
`

export const SelectInput = styled.select`
  border: 10px;
  border: 0;

  width: 100%;
  height: 50px;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_0};

  padding: 15px;

  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.COLORS.NEUTRAL_900}`};

  &:focus-visible {
    outline: none;
  }
`

export const SelectOption = styled.option`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-size: ${theme.FONT_SIZE.SMALL}px;
  `}
  height: 40px;
`

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    color: ${theme.COLORS.ERROR_MAIN};
    font-size: ${theme.FONT_SIZE.SMALL}px;
  `}
`
