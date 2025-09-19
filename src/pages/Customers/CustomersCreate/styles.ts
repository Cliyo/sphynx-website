import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  height: 100%;

  justify-content: flex-start;

  gap: 64px;
  padding: 70px 42px;
`

export const ContainerHeader = styled.div`
  display: flex;

  width: 100%;

  justify-content: space-between;
  align-items: center;
`

export const ButtonActions = styled.div`
  display: flex;

  gap: 14px;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.SEMI_BOLD};
    font-size: ${theme.FONT_SIZE.XXLARGE}px;
  `}
  width: 100%;
  text-align: left;
`

export const ContainerFormMain = styled.div`
  display: flex;

  gap: 64px;
`

export const ContainerFormAbout = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;

  gap: 8px;
`

export const FormTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.SEMI_BOLD};
    font-size: ${theme.FONT_SIZE.LARGE}px;
  `}
`

export const FormText = styled.h3`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
    font-size: ${theme.FONT_SIZE.REGULAR}px;
  `}
`

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 60%;

  gap: 16px;
`

export const SocketInput = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  gap: 10px;
`

export const FooterActionsContainer = styled.div`
  display: flex;

  width: 100%;

  justify-content: flex-end;

  gap: 20px;
`
