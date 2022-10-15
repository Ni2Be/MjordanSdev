export interface IProject {
    id: string;
    name: string;
    projectDetails: IProjectDetails;
}

export interface IProjectDetails {
    id: string;
    name: string;
    defaultDetails: boolean;
    description: string;
    bulletPoints: string;
    imageUrls: IImageUrl[]
}

export interface IImageUrl{
    id: string,
    name: string,
    url: string
}
