import React from 'react';
import Container from '../components/Container';
import Room from '../components/Room';
import Sensors from '../components/Sensors';
import styled from 'styled-components';

const H1 = styled.h1`
    text-align: center;
`;

interface IMainProps { }

interface IMainState {
}

export default
class Main extends React.Component<IMainProps, IMainState> {
    render() {
        return (<>
            <H1>Smart Room Project</H1>
            <Container>
                <Room />
                <Sensors />
            </Container>
        </>)
    }
}
