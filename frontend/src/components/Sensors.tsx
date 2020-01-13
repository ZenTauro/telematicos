import React from 'react';
import Card from './Card';
import { SocketService, ISensors } from '../socket';
import { int_to_hex } from '../utils/funcs';

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

        fetch('/api/leds')
            .then(res => {
                let r;
                try {
                    r = res.json();
                } catch(error) {
                    console.log(error);
                }
                return r;
            })
            .catch(e => console.log(`Malformed JSON received ${e}`))
            .then(json => {
                try {
                    this.setState({color: `#${int_to_hex(json['ok'])}`});
                } catch(error) {
                    console.log(json);
                }
            })

        const observable = this.socket.onMessage();
        observable.subscribe((state: string) => {
            console.log(`Update received ${state}`);
            this.setState(JSON.parse(state));
        });

        this.socket.onDisconnect().subscribe((state: string) => {
            console.log('The server disconnected us');
        })
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
