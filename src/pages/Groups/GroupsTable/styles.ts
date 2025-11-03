import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  height: 100%;

  gap: 28px;

  padding: 70px 42px;
`

export const ContainerHeader = styled.div`
  display: flex;

  width: 100%;

  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.SEMI_BOLD};
    font-size: ${theme.FONT_SIZE.XXLARGE}px;

    @media (max-width: 920px) {
      font-size: ${theme.FONT_SIZE.XLARGE}px;
    }
  `}
  width: 100%;
  text-align: left;
`

export const NoRegisterText = styled.p`
  width: 100%;

  text-align: center;

  margin-top: 20px;

  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL};
  color: ${({ theme }) => theme.COLORS.ERROR_MAIN};

  @media (max-width: 920px) {
    font-size: ${({ theme }) => theme.FONT_SIZE.XSMALL}px;
  }
`
