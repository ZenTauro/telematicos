import { fromEvent, Observable } from 'rxjs';
import io from 'socket.io-client';

enum Action {
    DEFAULT = 'DEFAULT',
}

export
interface ISensors {
    temp:     number;
    humid:    number;
    noise:    number;
    bright:   number;
    movement: boolean;
    color:    string;
}

export
class SocketService {
    private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

    public init(): SocketService {
        this.socket = io('/websocket/')
        return this;
    }

    public send(action: Action): void {
        this.socket.emit('action', action);
    }

    public onMessage(): Observable<ISensors> {
        return fromEvent(this.socket, 'update');
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}