import React from "react";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "semantic-ui-react";
import agent from "../../api/agent";
import { IProject } from "../../models/projects"
import { projectsDummyData } from "./DummyData";
import ProjectDetails from "./ProjectDetails";
import './ProjectList.scss'
import ProjectPreview from "./ProjectPreview";

function ProjectList() {
    const [projects, setProjects] = useState<IProject[]>();
    const [showDetails, setShowDetails] = useState(true);
    const [selectedProject, setSelectedProject] = useState(true);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            setProjects(projectsDummyData);
        }

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
                            <ProjectPreview key={project.id} project={project}/>
                    );
                })
            }
        </div>
    )
}

export default ProjectList;