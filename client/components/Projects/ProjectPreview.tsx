import React from "react";
import { IProject, IProjectDetails } from "../../models/projects"
import { Image } from "semantic-ui-react"
// import { Link, Outlet } from "react-router-dom";
import styles from '../../styles/ProjectPreview.module.scss';
import Link from "next/link";

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
            <Link href={project.id} key={project.id} className={styles.projectListElement}>
                <Image className={styles.previewImage} src={getImageUrl(project.projectDetails, 'preview_image')} ></Image>
                <span className={styles.container}/>
                <p>{project.name}</p>
            </Link>
            {/* <Outlet></Outlet> */}
        </>
    )
}

export default ProjectPreview;