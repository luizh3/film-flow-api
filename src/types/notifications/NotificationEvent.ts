
interface Program {
    id: string
    type: string
    title: string
}

export enum NotificationEventType {
    REVIEW_LIKE = "REVIEW_LIKE",
}

export interface NotificationEvent {
    type: NotificationEventType
    data: {
        reviewId: string,
        actorId: string,
        program: Program
    }
}
