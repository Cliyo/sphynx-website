import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  height: 100%;
  flex: 1;
`

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 20px 70px;
  gap: 15px;

  border-radius: 15px;

  box-shadow: 0px 0px 10px ${({ theme }) => theme.COLORS.NEUTRAL_300};
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXLARGE}px;
    color: ${theme.COLORS.PRIMARY_DARK};
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  `}
`

export const Text = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.REGULAR}px;
    color: ${theme.COLORS.NEUTRAL_500};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `}
`
