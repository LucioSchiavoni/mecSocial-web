export interface updateUser {
    id: string;
    username?: string;
    password?: string;
    description?: string;
    image?: File | undefined;
    image_Bg?:File | undefined;
}