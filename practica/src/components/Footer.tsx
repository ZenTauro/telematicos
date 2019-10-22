import React from 'react';
import styled from 'styled-components';
import { colors } from '../config/colors';

const Foot = styled.footer`
    color: ${colors["grey"]};
    text-align: center;
`;

export default
function Footer() {
    return <Foot> Universidad de Alcala </Foot>
}