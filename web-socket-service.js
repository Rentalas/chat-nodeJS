import * as ws from 'ws';

export class WebSocketSerice {
    wsServer;

    constructor(port) {
        this.wsServer = new ws.WebSocketServer({ port, });
        this.wsServer.on('connection', this.onConnect.bind(this));
    }

    onConnect(wsClient) {
        wsClient.send('Привет');
        wsClient.on('message', (message) => {
            console.log('m', message.toString());
            this.wsServer.clients.forEach(client => client.send(message.toString()));
        });
        wsClient.on('close', function () {
            console.log('Пользователь отключился');
        });

        this.wsClient = wsClient;

        if (this.reaction) this.reaction();
    }

    /**
     *
     * @param {(message: any??) => void} cb
     */
    onMessage(cb) {

    }

    /**
     *
     * @param {any?} message
     */
    sendMessage(message) {
        this.wsServer.clients.forEach(client => client.send(message));
    }

    testReaction(cb) {
        this.reaction = cb;
        return this;
    }
}