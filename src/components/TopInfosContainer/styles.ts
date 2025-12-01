import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;

  width: 100%;

  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL_300};
  border-radius: 8px;

  padding: 24px 0;

  > :nth-child(2) {
    border-left: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL_300};
    border-right: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL_300};
  }
`

export const InfoContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 0 16px;
`

export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.REGULAR}px;
    color: ${theme.COLORS.PRIMARY_DARKER};
    font-weight: ${theme.FONT_WEIGHT.SEMI_BOLD};

    @media (max-width: 920px) {
      font-size: ${theme.FONT_SIZE.SMALL}px;
    }

    @media (max-width: 530px) {
      font-size: ${theme.FONT_SIZE.XSMALL}px;
    }
  `}

  width: 100%;
  text-align: left;
`

export const Text = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XLARGE}px;
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.SEMI_BOLD};

    @media (max-width: 920px) {
      font-size: ${theme.FONT_SIZE.LARGE}px;
    }

    @media (max-width: 530px) {
      font-size: ${theme.FONT_SIZE.REGULAR}px;
    }
  `}

  width: 100%;
  text-align: left;
`
