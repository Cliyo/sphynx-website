import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  height: 100%;

  gap: 15px;

  padding: 20px;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.EXTRA_BOLD};
    font-size: ${theme.FONT_SIZE.XXLARGE}px;
  `}
  width: 100%;
  text-align: left;
`

export const InputsContainer = styled.div`
  display: flex;

  gap: 10px;
`
export const NoRegisterText = styled.p`
  width: 100%;

  text-align: center;

  margin-top: 20px;

  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.COLORS.ERROR_MAIN};
`
