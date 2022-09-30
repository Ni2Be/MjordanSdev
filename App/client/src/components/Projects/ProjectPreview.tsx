import React, { useEffect, useState } from "react";
import { IProject, IImageUrl } from "../../models/projects"
import './ProjectPreview.scss'
import { Image } from "semantic-ui-react"
import { Link, Outlet } from "react-router-dom";
import agent from "../../api/agent";

interface IProps {
    project: IProject
}

const baseURL = process.env.REACT_APP_API_URL;

const ProjectPreview: React.FC<IProps> = ({ project }) => {
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        const fetchProjectPreviewImage = async (id: string) => {
            const data : IImageUrl = await agent.Projects.getImage(id, 'preview_image');
            setImageUrl(baseURL! + data.url)
        }
        fetchProjectPreviewImage(project.id).catch(console.error);
    }, [])

    return (
        <>
            <Link to={project.id} key={project.id} className="projectListElement">
                <Image src={imageUrl} ></Image>
                <p>
                    {project.name}
                </p>
            </Link>
            <Outlet></Outlet>
        </>
    )
}

export default ProjectPreview;