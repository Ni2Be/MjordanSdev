import React from "react";
import { useEffect, useState } from "react";
import { RGB_ETC1_Format } from "three";
import agent from "../../api/agent";
import { IProject } from "../../models/projects"
import './ProjectList.scss'

function AnimatedBackground() {
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
                        <div key={project.id} className="projectListElement">
                            <p>
                                {project.name}
                            </p>
                            <p>
                                {project.description}
                            </p>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default AnimatedBackground;