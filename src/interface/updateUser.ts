export interface updateUser {
    id: string;
    username?: string;
    password?: string;
    image?: File | null;
    image_Bg?: File | null;
    description?: string;
}