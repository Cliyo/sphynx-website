import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  padding: 20px 60px;

  gap: 15px;
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

export const ButtonsContainer = styled.div`
  display: flex;

  width: 100%;

  margin-top: 20px;

  align-items: center;
  justify-content: center;

  gap: 10px;
`
