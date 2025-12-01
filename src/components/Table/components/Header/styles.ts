import styled from 'styled-components'

export const Container = styled.div`
  display: flex;

  flex: 1;
  min-height: 50px;

  justify-content: space-between;

  border-radius: 10px 10px 0 0;
`

export const HeaderItem = styled.div`
  display: flex;

  flex: 1;
  min-width: 260px;
  height: 100%;

  align-items: center;
  justify-content: flex-start;

  font-weight: ${({ theme }) => theme.FONT_WEIGHT.SEMI_BOLD};
  color: ${({ theme }) => theme.COLORS.PRIMARY_DARKER};
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE}px;
`
