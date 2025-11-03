import styled from 'styled-components'

export const PrivateRouteContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;

  padding-left: ${({ isMobile }) => (isMobile ? '0' : '320px')};
`
