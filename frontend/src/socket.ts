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
        this.socket = io('/')
        return this;
    }

    public send(action: Action): void {
        this.socket.emit('message', action);
    }

    public onMessage(): Observable<string> {
        return fromEvent(this.socket, 'message');
    }

    public onDisconnect(): Observable<string> {
        return fromEvent(this.socket, 'disconnect');
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}