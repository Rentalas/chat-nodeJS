import { WebSocketSerice } from './web-socket-service.js';

export const app = {
    init(port = 1234) {
        const webSocket = new WebSocketSerice(port)
            .testReaction(
                () => setTimeout(() => webSocket.sendMessage('delay message test'), 3000),
            );

    }
}