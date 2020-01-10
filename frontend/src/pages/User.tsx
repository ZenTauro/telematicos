import React from 'react';
import Container from '../components/Container';
import Card from '../components/Card';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/Store';
import { updateUser } from '../redux/Actions';
import docCookies from "../utils/cookie";

const MAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Form = styled.form`
    margin: 0;
    padding: 0;
`;

const InputContainer = styled.div`
    margin: 0;
    padding: auto;
`;

const VariableBg = styled.input<{color: string}>`
    background-color: ${p => p.color};
`;

function MailInput(props: {isValid: boolean, id: string}): JSX.Element {
    const color = props.isValid ? '#c3f733' : '#f7b933';

    return <VariableBg color={color} type="text" id={props.id} />
}

interface IUserProps { 
    event: any,
    dispatch: (_:any) => any,
}

interface IUserState {
    event: any,
    isValidMail: boolean,
}

class User extends React.Component<IUserProps, IUserState> {
    constructor(props: IUserProps) {
        super(props);
        this.state = {
            event: props.event,
            isValidMail: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        let obj: {name: string, password: string, mail: string} = {} as any;
        [ 'name', 'password', 'mail' ].map((val, i, arr) => {
            (obj as any)[arr[i]] = (document.getElementById(val) as unknown as {value: string}).value;
            return obj;
        });

        let init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: obj.name,
                pass: obj.password,
            }),
        };
        let req = new Request('/api/user/login', init);

        fetch(req)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            if (data['ok'] == null) {}
            else {
                docCookies.setItem('Auth', data.ok.token);
                localStorage.name = obj.name;
                this.props.dispatch(updateUser(obj.name));
            }
        });
    }

    handleChange(): void {
        const values = [ 'mail' ]
            .map((val, _) => ({key: val, value: document.getElementById(val) as unknown as {value: string}}));

        if ( values[0].value.value
            .match(MAIL_REGEXP)
        ) {
            this.setState({ isValidMail: true });
        } else {
            this.setState({ isValidMail: false });
        }
    }

    render() {
        const fields: JSX.Element[] = [
            { displayName: 'Nombre', formName: 'name' },
        ].map((val, _) => ( 
            <tr key={val.formName}><td>{val.displayName}</td><td><input type="text" id={val.formName} /></td></tr>
        ));
        fields.push(
            [{ displayName: 'Email', formName: 'mail' }].map((val) => (
                <tr key={val.formName}><td>{val.displayName}</td><td><MailInput isValid={this.state.isValidMail} id={val.formName} /></td></tr>
            ))[0]
        )
        fields.push(
            [{ displayName: 'Contraseña', formName: 'password' }].map((val) => (
                <tr key={val.formName}><td>{val.displayName}</td><td><input type="password" id={val.formName} /></td></tr>
            ))[0]
        )

        return (
            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
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

const mapStateToProps = (state: IStoreState) => ({});

export default connect(mapStateToProps)(User);