import * as ws from 'ws';

export class WebSocketSerice {
    wsClient;
    wsServer;

    constructor(port) {
        // console.log(ws);
        // console.log(ws.Server);
        // console.log(ws.WebSocketServer);

        this.wsServer = new ws.WebSocketServer({ port, });
        // this.wsServer = new ws.Server({ port, });

        // console.log(this.wsServer)

        this.wsServer.on('connection', this.onConnect.bind(this));

        // this.wsServer.addListener('connection', this.onConnect.bind(this))
    }

    onConnect(wsClient) {
        // console.log('wsClient', wsClient)


        console.log('Новый пользователь');
        // отправка приветственного сообщения клиенту
        wsClient.send('Привет');
        wsClient.on('message', (message) => {
            /* обработчик сообщений от клиента */
            console.log('m', message.toString())
            // wsClient.send(message.toString());

            // this.wsServer.broadcast = function (data) {
            this.wsServer.clients.forEach(client => client.send(message.toString()));
            // };
        });
        wsClient.on('close', function () {
            // отправка уведомления в консоль
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
        this.wsClient.on('message', cb);
    }

    /**
     *
     * @param {any?} message
     */
    sendMessage(message) {
        this.wsClient.send(message);
    }




    testReaction(cb) {
        this.reaction = cb;
        return this;
    }
}