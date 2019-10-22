import React from 'react';
import Container from '../components/Container';
import Card from '../components/Card';
import styled from 'styled-components';

const Form = styled.form`
    margin: 0;
    padding: 0;
`;

const InputContainer = styled.div`
    margin: 0;
    padding: auto;
`;

interface IUserProps { 
    event: any
}

interface IUserState {
    event: any
}

export default
class User extends React.Component<IUserProps, IUserState> {
    constructor(props: IUserProps) {
        super(props);
        this.state = { event: props.event };
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const values = [ 'name', 'password' ]
            .map((val, _) => ({key: val, value: document.getElementById(val) as unknown as {value: string}}));
        
        if ( values[1].value.value !== 'qwerty123') return;

        localStorage.name = values[0].value.value;
    }

    render() {
        const fields: JSX.Element[] = [
            { displayName: 'Nombre', formName: 'name' },
        ].map((val, _) => ( 
            <tr key={val.formName}><td>{val.displayName}</td><td><input type="text" id={val.formName} /></td></tr>
        ));
        fields.push(
            [{ displayName: 'Contraseña', formName: 'password' }].map((val) => (
                <tr key={val.formName}><td>{val.displayName}</td><td><input type="password" id={val.formName} /></td></tr>
            ))[0]
        )

        return (
            <Form onSubmit={this.handleSubmit}>
                <Container>
                    <Card>{{
                        header: 'Su nombre',
                        rest:<><InputContainer><table><tbody>{ fields }</tbody></table></InputContainer><input type="submit" value="Submit"/></>
                    }}</Card>
                </Container>
            </Form>
        )
    }
}