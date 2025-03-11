import { theme } from '@themes/'
import styled from 'styled-components'

interface ContainerProps {
  color: keyof typeof theme.COLORS
}

export const Container = styled.button<ContainerProps>`
  display: flex;

  align-items: center;
  justify-content: center;
  
  padding: 15px 45px;

  min-width: 130px;

  border-radius: 8px;
  border: 0;

  color: ${({ theme }) => theme.COLORS.NEUTRAL_0};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.SEMI_BOLD};

  background-color: ${({ color, theme }) => theme.COLORS[color]};

  cursor: pointer;

  transition: 0.5s;

  &:hover {
    filter: brightness(120%);
  }
`
