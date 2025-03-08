import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  height: 100%;

  justify-content: space-between;

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

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 30px;
`

export const ActionsContainer = styled.div`
  display: flex;

  width: 100%;

  justify-content: flex-end;

  gap: 20px;
`

export const SocketInput = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  gap: 10px;
`
