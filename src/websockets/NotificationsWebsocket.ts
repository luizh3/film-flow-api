import { FastifyInstance, FastifyRequest } from "fastify";
import { type WebSocket } from '@fastify/websocket';
import { logger } from "@/utils/Logger";

interface NotificationsQuery {
    token: string;
}

export async function notificationsWebsocket(
    fastify: FastifyInstance
) {
    fastify.get(
        "/ws/notifications",
        { websocket: true },
        (socket: WebSocket, request: FastifyRequest<{ Querystring: NotificationsQuery }>) => {

            const token = request.headers.authorization;

            if (!token) {
                logger.error("Invalid token")
                return;
            }

            let payload: any;
            try {
                payload = fastify.jwt.verify(token);
            } catch {
                socket.close();
                return;
            }

            const userId = payload.id as string;

            fastify.notificationsManager.add(userId, socket);

            socket.on("close", () => {
                fastify.notificationsManager.remove(userId, socket);
            });
        }
    );
}
