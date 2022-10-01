import React, { useEffect, useState } from "react";
import { IProject, IImageUrl, IProjectDetails } from "../../models/projects"
import './ProjectPreview.scss'
import { Image } from "semantic-ui-react"
import { Link, Outlet } from "react-router-dom";

interface IProps {
    project: IProject
}

const baseURL = process.env.REACT_APP_API_URL;

const getImageUrl = (projectDetails: IProjectDetails, name: string) => {
    return baseURL! + projectDetails.imageUrls.find(image => image.name === name)?.url;
}

const ProjectPreview: React.FC<IProps> = ({ project }) => {
    return (
        <>
            <Link to={project.id} key={project.id} className="projectListElement">
                <Image src={getImageUrl(project.projectDetails, 'preview_image')} ></Image>
                <p>
                    {project.name}
                </p>
            </Link>
            <Outlet></Outlet>
        </>
    )
}

export default ProjectPreview;