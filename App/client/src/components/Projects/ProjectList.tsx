import React from "react";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { IProject } from "../../models/projects"
import { projectsDummyData } from "./DummyData";
import './ProjectList.scss'
import ProjectPreview from "./ProjectPreview";
import ProjectPreviewPlaceholder from "./ProjectPreviewPlaceholder";

function ProjectList() {
    const [projects, setProjects] = useState<IProject[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') {
            setProjects(projectsDummyData);
        }

        const fetchProjects = async () => {
            const projects: IProject[] = await agent.Projects.graphQL(`
            query{
                projects (order: {name: ASC}){
                    id,
                    name,
                    projectDetails {
                      imageUrls{
                        name,
                        url
                      }
                    }
                }
              }`).then(data => data.projects);
              setLoading(false);
              setProjects(projects);
        }
        fetchProjects().catch(console.error);
    }, [])

    return (
        <div className="projectList" >
            {loading && Array(3).fill(0).map(p => <ProjectPreviewPlaceholder/>)}
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