import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 6px;
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

export const SelectMultipleInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  border: 10px;
  border: 0;

  width: 100%;
  min-height: 50px;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_0};

  padding: 15px;

  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.COLORS.NEUTRAL_900}`};

  &:focus-visible {
    outline: none;
  }

  p {
    ${({ theme }) => css`
      color: ${theme.COLORS.NEUTRAL_900};
      font-size: ${theme.FONT_SIZE.SMALL}px;

      background-color: ${theme.COLORS.NEUTRAL_300};
      padding: 4px 8px;
      border-radius: 4px;

      cursor: pointer;
    `}
  }

  span {
    ${({ theme }) => css`
      color: ${theme.COLORS.NEUTRAL_500};
      font-size: ${theme.FONT_SIZE.SMALL}px;

      border-radius: 4px;
    `}
  }
`

interface OptionsMenuProps {
  isVisible: boolean
}

export const OptionsMenu = styled.div<OptionsMenuProps>`
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 180px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_0};
  border: ${({ theme }) => `1px solid ${theme.COLORS.NEUTRAL_900}`};
  border-radius: 8px;
  z-index: 10;

  ${({ isVisible }) => css`
    display: ${isVisible ? 'block' : 'none'};
  `}
`

export const OptionItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;

  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-size: ${theme.FONT_SIZE.SMALL}px;

    &:hover {
      background-color: ${theme.COLORS.PRIMARY_LIGHT};
    }
  `}
`
