import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const NavigationBarMobileContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 72px;

  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 0 16px;
`

interface MobileOptionsProps {
  isMobileMenuOpen: boolean
}

export const MobileOptions = styled.ul<MobileOptionsProps>`
  position: absolute;

  list-style: none;

  top: 70px;
  left: 0;
  width: 100%;

  z-index: 99;

  display: flex;
  flex-direction: column;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);

  align-items: center;
  justify-content: center;

  gap: 24px;
  padding: 16px 0;

  li {
    font-size: ${({ theme }) => theme.FONT_SIZE.REGULAR};

    cursor: pointer;

    transition: 0.5s;

    &:hover {
      color: ${({ theme }) => theme.COLORS.NEUTRAL_900};
    }
  }

  animation: ${({ isMobileMenuOpen }) =>
      isMobileMenuOpen ? 'fadeIn' : 'fadeOut'}
    0.3s ease-in-out;
  animation-fill-mode: forwards;
  visibility: hidden;

  @keyframes fadeIn {
    0% {
      visibility: hidden;
      opacity: 0;
      transform: translateY(-10px);
    }

    100% {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    0% {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      visibility: hidden;
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`

export const IconImage = styled.img`
  width: 90px;
  cursor: pointer;
`

export const MenuMobileButton = styled.button`
  display: none;

  background-color: none;
  border: none;
  background: none;

  @media (max-width: 920px) {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;

    cursor: pointer;
  }
`

export const MobileMenuOption = styled(NavLink)`
  position: relative;

  display: flex;
  justify-content: center;

  align-items: center;

  width: 100%;
  height: 50px;

  color: ${({ theme }) => theme.COLORS.NEUTRAL_900};
  font-size: ${({ theme }) => theme.FONT_SIZE.LARGE}px;

  gap: 10px;

  cursor: pointer;

  transition: 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.PRIMARY_MAIN};
  }
`
