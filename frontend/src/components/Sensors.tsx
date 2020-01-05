import React from 'react';
import Card from './Card';
import { SocketService, ISensors } from '../socket';

export default
class Sensors extends React.Component<{}, ISensors> {
    private socket: SocketService;

    constructor(props: {}) {
        super(props);

        this.socket = new SocketService();

        this.state = {
            temp:     0,
            humid:    0,
            noise:    0,
            bright:   0,
            movement: false,
            color:    '#000000',
        }
    }

    componentDidMount() { 
        this.socket.init();

        const observable = this.socket.onMessage();
        observable.subscribe((state: ISensors) => {
            console.log('Update received');
            this.setState(state);
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        return (
            <Card>{{
                header: "Datos sensores",
                rest: 
                    <table>
                        <tbody>
                        <tr>
                            <td>Temperatura (º)</td>
                            <td>{this.state.temp}</td>
                        </tr>
                        <tr>
                            <td>Humedad (%)</td>
                            <td>{this.state.humid}</td>
                        </tr>
                        <tr>
                            <td>Nivel de Ruido</td>
                            <td>{this.state.noise}</td>
                        </tr>
                        <tr>
                            <td>Nivel de Luz</td>
                            <td>{this.state.bright}</td>
                        </tr>
                        <tr>
                            <td>Movimiento</td>
                            <td>{this.state.movement ? 'Si' : 'No'}</td>
                        </tr>
                        <tr>
                            <td>Color Iluminacion</td>
                            <td>{this.state.color}</td>
                        </tr>
                        </tbody>
                    </table>
            }}</Card>
        )
    }
}