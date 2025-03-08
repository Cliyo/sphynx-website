import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;
  width: 20%;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_DARK};

  padding: 15px;

  gap: 20px;
`

export const LogoContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
`

export const LogoImg = styled.img`
  width: 90px;
`

export const LogoText = styled.h1`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_0};
    font-size: ${theme.FONT_SIZE.XLARGE}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `}
`

export const MenuOption = styled(NavLink)`
  position: relative;

  display: flex;

  align-items: center;

  width: 100%;
  height: 50px;
  border-radius: 10px;

  color: ${({ theme }) => theme.COLORS.NEUTRAL_0};
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE}px;

  padding: 15px;
  gap: 10px;

  cursor: pointer;

  transition: 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.PRIMARY_MAIN};
  }
`

export const MenuLeaveOption = styled.div`
  position: relative;

  display: flex;

  align-items: center;

  width: 100%;
  height: 50px;
  border-radius: 10px;

  color: ${({ theme }) => theme.COLORS.NEUTRAL_0};
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE}px;

  padding: 15px;
  gap: 10px;

  cursor: pointer;

  transition: 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.PRIMARY_MAIN};
  }
`

export const MenuOptionText = styled.p`
  ${({ theme }) => css`
    color: ${theme.COLORS.NEUTRAL_0};
    font-size: ${theme.FONT_SIZE.LARGE}px;
  `}
`
