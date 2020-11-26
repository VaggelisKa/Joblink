export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    sendPhotoUrl: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl: string;
    content: string;
    dateRead?: Date;
    dateSent: Date;
}
