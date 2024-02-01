export interface createUser {
    username: string;
    email: string;
    password: string;
    image?: File | null;
    image_Bg?: File | null;
    description?: string;
}