import styled from 'styled-components'

interface ContainerProps {
  width: number
  height: number
  isDanger: boolean
}

export const Container = styled.button<ContainerProps>`
  width: ${({ width }) => (width === 0 ? `100%` : `${width}px`)};
  height: ${({ height }) => (height === 0 ? `100%` : `${height}px`)};

  border-radius: 4px;
  border: 0;

  color: ${({ theme }) => theme.COLORS.NEUTRAL_0};
  background-color: ${({ isDanger, theme }) =>
    isDanger ? theme.COLORS.ERROR_MAIN : theme.COLORS.PRIMARY_DARK};

  cursor: pointer;

  transition: 0.5s;

  &:hover {
    background-color: ${({ isDanger, theme }) =>
      isDanger ? theme.COLORS.ERROR_LIGHT : theme.COLORS.PRIMARY_MAIN};
  }
`
