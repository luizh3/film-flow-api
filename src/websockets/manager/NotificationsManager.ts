import { type WebSocket } from '@fastify/websocket';

export class NotificationsManager {
    private connections = new Map<string, Set<WebSocket>>();

    public add(userId: string, socket: WebSocket) {
        if (!this.connections.has(userId)) {
            this.connections.set(userId, new Set());
        }
        this.connections.get(userId)!.add(socket);
    }

    public remove(userId: string, socket: WebSocket) {
        this.connections.get(userId)?.delete(socket);

        if (this.connections.get(userId)?.size === 0) {
            this.connections.delete(userId);
        }
    }

    public notify(userId: string, payload: unknown) {

        const sockets = this.connections.get(userId);

        console.log(this.connections)

        if (!sockets) {
            return
        };

        const message = JSON.stringify(payload);

        console.log(message)

        for (const socket of sockets) {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(message);
            }
        }
    }
}
