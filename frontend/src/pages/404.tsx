import React from 'react';
import { StaticRouterContext } from 'react-router';
import styled from 'styled-components';

const Container = styled.main`
    margin: 2em;
`;

class Error404 extends React.Component<StaticRouterContext, {}> {
    componentDidMount() {
        document.title = 'Smart Room | 404';
    }
    componentWillUnmount() {
        document.title = 'Smart Room';
    }
    render() {
        return (
            <Container>
                <h1>Error 404</h1>
                <p>
                    The <code>{
                        (this.props.location as { pathname: string }).pathname
                    }</code> page could not be found
                </p>
            </Container>
        )
    }
};

export default Error404;
