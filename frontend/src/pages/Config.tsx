import React from 'react';
import Container from '../components/Container';
import Card from '../components/Card';
import styled from 'styled-components';
import { countries } from '../utils/countries';
import { cap1, coords2maps } from '../utils/funcs';
import $ from "jquery";
import { updateUser } from '../redux/Actions';

const Form = styled.form`
    margin: 0;
    padding: 0;
`;

const InputContainer = styled.table`
    margin: 0;
    padding: auto;
`;

const ColNumberInput = styled.input<{color: string} >`
    background-color: ${p => p.color}
`;

const Gauge = styled.meter<{color: string}>`
    color: none;
    color: ${p => p.color};
    background: none;
    background-color: ${p => p.color};
    width: 17em;
`;

function Progress(props: {val: number}): JSX.Element {
    const val = props.val < 10 ? props.val : 10;
    var color: string = 'none';
    if ( val <  4 ) color = 'red'    ; else {
    if ( val <  6 ) color = 'orange' ; else {
    if ( val <  8 ) color = 'yellow' ; else {
    if ( val >= 8 ) color = 'green'  ; }}}

    return <Gauge color={color} value={val} min={0} max={10} />
}

interface IConfigProps { }

interface IConfigState {
    isMaxOk: boolean,
    isMinOk: boolean,
    passlen: number,
    cities: string[],
}

function getCountry(): string {
    return (document.getElementById('country') as unknown as {value: string}).value;
}

export default
class Config extends React.Component<IConfigProps, IConfigState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isMaxOk: true,
            isMinOk: true,
            passlen: 0,
            cities: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCountryBlur = this.handleCountryBlur.bind(this);
    }

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
        const coords = coords2maps( ids[3].element.value );

        ids[3].element.value = `https://www.google.com/maps/@${coords.latitude},${coords.longitude},14z`;

        if (isCountry) { 
            window.alert(`${country} is not a valid country`);
            console.log(`${country} is not a valid country`);
            e.preventDefault();
            return;
        }

        if (  Number(ids[10].element.value) < 22 || Number(ids[10].element.value) > 26
           || Number(ids[11].element.value) < 22 || Number(ids[11].element.value) > 26 ) {
            window.alert("Invalid temperature range");
        }

        if ( ids[1].element.value !== 'qwerty123' ) {
            console.log(ids[1].element.value)
            console.log("Incorrect password");
            e.preventDefault();
            return;
        }

        ids.map((val, _) => (
            localStorage.setItem(val.id, val.element.value)
        ));

        updateUser(localStorage.getItem['name']);
        
        e.preventDefault();
    }

    handleChange() {
        const ids: { id: string, element: {valueAsNumber: number | null} }[]  = [
            'maxTemp',
            'minTemp',
        ].map((id, _) => ({
            id,
            element: document.getElementById(id) as unknown as {valueAsNumber: number | null}
        }));

        const passlen = (document.getElementById('password') as any).value.length as unknown as number;

        this.setState({passlen});

        const minVal: number = ids[1].element.valueAsNumber ? ids[1].element.valueAsNumber : 23;
        const maxVal: number = ids[0].element.valueAsNumber ? ids[0].element.valueAsNumber : 23;

        if (minVal < 22 || minVal > 26) {
            this.setState({ isMinOk: false, })
        } else {
            this.setState({ isMinOk: true, })
        }

        if (maxVal < 22 || maxVal > 26) {
            this.setState({ isMaxOk: false, })
        } else {
            this.setState({ isMaxOk: true, })
        }
    }

    handleCountryBlur() {
        console.log("Response");
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/0.1/cities.xml');
        xhr.onreadystatechange = () => {
            const val = $($.parseXML(xhr.responseText)).find(getCountry()).toArray().map(
                (e) => (e.textContent) as string
            );
            console.log(`state: ${xhr.readyState}, status: ${xhr.status}. response: "${val}"`);
            console.log(val);
            this.setState({ ...this.state, cities: val });
        };

        xhr.send();
    }

    render() {
        const room_data: JSX.Element[] = [
            { displayName: 'Coordenadas', formName: 'coords'  },
            { displayName: 'Link',        formName: 'link'    },
        ].map((val, _) => ( 
            <tr key={val.formName}><td>{val.displayName}</td><td><input type="text" id={val.formName} /></td></tr>
        ));
        room_data.push(
            <tr key="file"><td>Foto</td><td><input type="file" id="photo" /></td></tr>,
            <tr key="password"><td>Password</td><td><input type="password" id="password" /></td></tr>,
            <tr key="progress"><td colSpan={2}><Progress val={this.state.passlen}/></td></tr>
        );
        room_data.unshift(
            <tr key="country"><td>Pais</td><td><input type="text" name="country" id="country" onBlur={this.handleCountryBlur}/></td></tr>,
            <tr key="city"><td>Ciudad</td>
                <td><select name="city" id="city" key="city">
                    {this.state.cities.map((val) => (
                        <option value={val} key={val}>{val}</option>
                    ))}
                </select></td>
            </tr>,
        );

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
            { displayName: 'Temperatura maxima', formName: 'maxTemp', min: -10, max: 40,
              func: () => this.state.isMaxOk ? 'none' : '#F88379' },
            { displayName: 'Temperatura minima', formName: 'minTemp', min: -10, max: 40,
              func: () => this.state.isMinOk ? 'none' : '#F88379' },
        ].map((val, _) => ( 
            <tr key={val.formName}>
                <td>{val.displayName}</td>
                <td>
                    <ColNumberInput
                        color= {val.func()}
                        type=   "number"
                        id=    {val.formName}
                        min=   {val.min}
                        max=   {val.max} />
                </td>
            </tr>
        ));
        room_alerts.push(
            <tr key="submit"><td rowSpan={2}><input type="submit" value="Submit" /></td></tr>
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