import React from "react";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { IProject } from "../../models/projects"
import './ProjectList.scss'
import ProjectPreview from "./ProjectPreview";

function ProjectList() {
    const [projects, setProjects] = useState<IProject[]>()

    useEffect(() => {

        const fetchProjects = async () => {
            const data : IProject[] = await agent.Projects.getAll();
            setProjects(data.sort((a, b) => a.name.localeCompare(b.name)));
            console.log(data);
        }

        fetchProjects().catch(console.error);
    }, [])

    return (
        <div className="projectList" >
            {
                projects?.map(project => {
                    return (
                        <ProjectPreview key={project.id} project={project} />
                    );
                })
            }
        </div>
    )
}

export default ProjectList;