import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../config/colors';

const radius: number = 0.2;

const CardContainer = styled.div`
    max-width: 20em;
    box-shadow: ${colors["grey-lighter"]} 0 0 10px 2px;
    border-radius: ${radius}em;
`;

const CardImage = styled.img`
    max-width: 20em;
    border-top-left-radius: ${radius}em;
    border-top-right-radius: ${radius}em;
`;

const CardHeader = styled.h2`
    color: ${colors.accent};
    margin: 0;
    text-align: center;
    margin-left: 0.5em;
    margin-right: 0.5em;
`;

const CardBody = styled.div`
    padding: 1em;
    padding-left: 0.7em;
    padding-right: 0.7em;
`;

interface ICardProps {
    children: {
        header: ReactNode;
        image?: string;
        rest:   ReactNode;
    }
}

export default
function Card({ children }: ICardProps) {
    return (
        <CardContainer>
            { children.image ? <CardImage src={ children.image } /> : <> </> }
            <CardHeader> { children.header } </CardHeader>
            <CardBody> { children.rest } </CardBody>
        </CardContainer>
    )
}