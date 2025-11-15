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

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  align-items: center;
  justify-content: flex-start;

  height: 100%;

  gap: 16px;

  p {
    width: 100%;
    text-align: left;
  }
`

export const ChartsContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: center;
  align-items: center;

  margin-top: 24px;

  flex-direction: column;

  gap: 12px;
`

export const ChartItem = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 8px;

  width: 100%;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL_300};

  padding: 16px 32px;

  cursor: pointer;

  h2 {
    ${({ theme }) => css`
      color: ${theme.COLORS.NEUTRAL_900};
      font-weight: ${theme.FONT_WEIGHT.REGULAR};
      font-size: ${theme.FONT_SIZE.LARGE}px;

      @media (max-width: 920px) {
        font-size: ${theme.FONT_SIZE.REGULAR}px;
      }
    `}
  }

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`
