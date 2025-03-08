import styled, { css } from 'styled-components'

import BannerImage from 'assets/banner.png'

export const Container = styled.div`
  display: flex;

  flex: 1;
  height: 100%;

  justify-content: space-between;
`

export const Banner = styled.div`
  display: flex;

  height: 100%;
  width: 60%;

  justify-content: center;
  align-items: center;

  background-image: url(${BannerImage});
`

export const ContainerForm = styled.div`
  display: flex;

  height: 100%;
  flex: 1;

  justify-content: center;
  align-items: center;
`

export const IconImage = styled.img`
  width: 80px;
  height: 80px;
`

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 5px;
`

export const FormTitle = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXLARGE}px;
    color: ${theme.COLORS.NEUTRAL_700};
    font-weight: ${theme.FONT_WEIGHT.SEMI_BOLD};
  `}
`

export const FormText = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.REGULAR}px;
    color: ${theme.COLORS.NEUTRAL_900};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `}
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 70%;

  gap: 35px;
`
