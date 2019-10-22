import React from 'react';
import Container from '../components/Container';
import Card from '../components/Card';
import styled from 'styled-components';
import { countries } from '../utils/countries';
import { cap1 } from '../utils/funcs';

const Form = styled.form`
    margin: 0;
    padding: 0;
`;

const InputContainer = styled.table`
    margin: 0;
    padding: auto;
`;

interface IConfigProps { }

interface IConfigState { }

export default
class Config extends React.Component<IConfigProps, IConfigState> {
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        
        const ids: { id: string, element: {value: string} }[]  = [
            'country',
            'password',
            'city',
            'coords',
            'link',
            'isTempActive',
            'isHumidityActive',
            'isSoundActive',
            'isLightActive',
            'isMovementActive',
            'maxTemp',
            'minTemp',
        ].map((id, _) => ({ id, element: document.getElementById(id) as unknown as {value: string} }));
        const country = cap1( ids[0].element.value.toLowerCase() );
        const isCountry = !countries.includes(country);

        if (isCountry) { 
            window.alert(`${country} is not a valid country`);
            console.log(`${country} is not a valid country`);
            e.preventDefault();
            return;
        }

        if ( ids[1].element.value !== 'qwerty123' ) {
            console.log(ids[1].element.value)
            console.log("Incorrect password");
            e.preventDefault();
            return;
        }

        ids.map((val, _) => (
            localStorage.setItem(val.id, val.element.value)
        ))
        
        e.preventDefault();
    }

    handleChange() { }

    render() {
        const room_data: JSX.Element[] = [
            { displayName: 'Pais',        formName: 'country' },
            { displayName: 'Ciudad',      formName: 'city'    },
            { displayName: 'Coordenadas', formName: 'coords'  },
            { displayName: 'Link',        formName: 'link'    },
        ].map((val, _) => ( 
            <tr key={val.formName}><td>{val.displayName}</td><td><input type="text" id={val.formName} /></td></tr>
        ));
        room_data.push(
            <tr key="file"><td>Foto</td><td><input type="file" id="photo" /></td></tr>,
            <tr key="password"><td>Password</td><td><input type="password" id="password" /></td></tr>
        )

        const room_sensors: JSX.Element[] = [
            { displayName: 'Temperatura',     formName: 'isTempActive'     },
            { displayName: 'Humedad',         formName: 'isHumidityActive' },
            { displayName: 'Nivel de sonido', formName: 'isSoundActive'    },
            { displayName: 'Nivel de luz',    formName: 'isLightActive'    },
            { displayName: 'Movimiento',      formName: 'isMovementActive' },
        ].map((val, _) => ( 
            <tr key={val.formName}><td>{val.displayName}</td><td><input type="checkbox" id={val.formName} /></td></tr>
        ));

        const room_alerts: JSX.Element[] = [
            { displayName: 'Temperatura maxima', formName: 'maxTemp', min: -10, max: 40 },
            { displayName: 'Temperatura minima', formName: 'minTemp', min: -10, max: 40 },
        ].map((val, _) => ( 
            <tr key={val.formName}><td>{val.displayName}</td><td><input type="number" id={val.formName} min={val.min} max={val.max} /></td></tr>
        ));
        room_alerts.push(
            <tr><td rowSpan={2}><input type="submit" value="Submit" /></td></tr>
        );

        return (
            <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <Container>
                    <Card key="data">{{
                        header: 'Datos de la Habitacion',
                        rest: <InputContainer><tbody>{room_data}</tbody></InputContainer>,
                    }}</Card>

                    <Card key="sensors">{{
                        header: 'Seleccione los sensores',
                        rest: <InputContainer><tbody>{room_sensors}</tbody></InputContainer>,
                    }}</Card>

                    <Card key="alerts">{{
                        header: 'Configure alertas',
                        rest: <InputContainer><tbody>{room_alerts}</tbody></InputContainer>,
                    }}</Card>
                </Container>
            </Form>
        )
    }
}