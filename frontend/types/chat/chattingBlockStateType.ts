export type ChattingBlockStateType = {
    chattingId: number;
    userId: User;
    question: string;
    answer: string;
    chatTime: string;
}

export type User = {
    id: number;
    nickName: string;
    userId: string;
    password: string;
    name: string;
    email: string;
}