import React from "react";
import { IProject, ImageUrl } from "../../models/projects"
import './ProjectPreview.scss'
import { Image } from "semantic-ui-react"

interface IProps {
    project: IProject
}

const baseURL = process.env.REACT_APP_API_URL;

function getImageUrl(imageUrls: ImageUrl[]) {
    const path = imageUrls.find((i)=>i.name === 'preview_image')?.url;
    return baseURL! + path;
}

const ProjectPreview: React.FC<IProps> = ({ project }) => {
    console.log(getImageUrl(project.imageUrls)) 
    return (
        <div key={project.id} className="projectListElement">
            <Image src={getImageUrl(project.imageUrls)} ></Image>
            <p>
                {project.name}
            </p>
        </div>
    )
}

export default ProjectPreview;