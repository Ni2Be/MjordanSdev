export interface IProject {
    id: string;
    name: string;
    description: string;
    imageUrls: ImageUrl[]
}

export interface ImageUrl{
    id: string,
    name: string,
    url: string
}
