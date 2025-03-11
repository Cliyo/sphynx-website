import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;

  border-radius: 0 0 10px 10px;

  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_0};
`

export const BodyItem = styled.div`
  display: flex;

  flex: 1;
  height: 100%;

  align-items: center;
  justify-content: flex-start;

  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_900};

  text-align: center;
`

export const BodyLine = styled.div`
  display: flex;

  flex: 1;
  min-height: 40px;

  justify-content: space-between;

  cursor: pointer;

  transition: 0.5s;

  border-bottom: 1px solid ${({ theme }) => theme.COLORS.NEUTRAL_300};

  > :last-child {
    justify-content: center;
  }
`
