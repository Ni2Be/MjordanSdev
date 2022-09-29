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
            setProjects(data.sort((a, b) => b.id.localeCompare(a.id)));
        }

        fetchProjects().catch(console.error);
    }, [])

    return (
        <div className="projectList" >
            {
                projects?.map(project => {
                    return (
                        <ProjectPreview project={project} />
                    );
                })
            }
        </div>
    )
}

export default ProjectList;