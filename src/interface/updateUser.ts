export interface updateUser {
    id: string;
    username?: string;
    password?: string;
    image?: File | undefined;
    image_Bg?: File | undefined;
    description?: string;
}