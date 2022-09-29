import React from "react";
import { IProject } from "../../models/projects"
import './ProjectPreview.scss'

interface IProps {
    project: IProject
}

const ProjectPreview: React.FC<IProps> = ({ project }) => {
    return (
        <div key={project.id} className="projectListElement">
            <p>
                {project.name}
            </p>
            <p>
                {project.description}
            </p>
        </div>
    )
}

export default ProjectPreview;