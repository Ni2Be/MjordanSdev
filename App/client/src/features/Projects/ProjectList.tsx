import React from "react";
import { useEffect, useState } from "react";
import agent from "./../../api/agent";
import { IProject } from "./../../models/projects"

function AnimatedBackground() {
    const [projects, setProjects] = useState<IProject[]>()

    useEffect(() => {

        const fetchProjects = async () => {
            const data = await agent.Projects.getAll();
            console.log(data)
            setProjects(data);
        }

        fetchProjects().catch(console.error);
    }, [])

    return (
        <div style={{ color: "white", position: "absolute", padding: "17rem" }} >
            {
                projects?.map(project => {
                    return (
                        <div>
                            <p key={project.id} >
                                {project.name}
                            </p>
                            <p key={project.id} >
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