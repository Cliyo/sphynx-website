import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    flex: 1;
    height: 100%;

    padding: 20px;
`

export const Title = styled.h1`
    ${({theme}) => css`
        color: ${theme.COLORS.NEUTRAL_900};
        font-weight: ${theme.FONT_WEIGHT.BOLDER};
        font-size: ${theme.FONT_SIZE.XXLARGE}px;
    `}
    width: 100%;
    text-align: left;
`

export const InputsContainer = styled.div`
    display: flex;

    
`