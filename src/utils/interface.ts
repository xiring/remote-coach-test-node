interface ChatData {
    message: string,
    id: string,
    from: string,
    to: string
}

interface UserData {
    username: string;
    password: string;
    id: string;
}

export type {ChatData, UserData}
