import React from "react";
import { IProject, ImageUrl } from "../../models/projects"
import './ProjectPreview.scss'
import { Image } from "semantic-ui-react"
import { Link, Outlet } from "react-router-dom";

interface IProps {
    project: IProject
}

const baseURL = process.env.REACT_APP_API_URL;

function getImageUrl(imageUrls: ImageUrl[]) {
    const path = imageUrls.find((i) => i.name === 'preview_image')?.url;
    return baseURL! + path;
}

const ProjectPreview: React.FC<IProps> = ({ project }) => {
    console.log(getImageUrl(project.imageUrls))
    return (
        <>
            <Link to={project.id} key={project.id} className="projectListElement">
                <Image src={getImageUrl(project.imageUrls)} ></Image>
                <p>
                    {project.name}
                </p>
            </Link>
            <Outlet></Outlet>
        </>
    )
}

export default ProjectPreview;