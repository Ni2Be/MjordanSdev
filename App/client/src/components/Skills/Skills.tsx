import React, { useEffect, useState } from "react"
import "./Skills.scss";
import { ISkill } from "../../models/skills";
import agent from "../../api/agent";
import Skill from "./Skill";

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<ISkill[]>();

    useEffect(() => {

        const fetchSkills = async () => {
            const data: ISkill[] = await agent.Skills.getAll();
            setSkills(data);
        }

        fetchSkills().catch(console.error);
    }, [])

    return (
        skills &&
            skills.length > 0 ?
            <div className="skills">
                {skills.map((skill: ISkill) =>
                    <Skill key={skill.id} percentage={skill.value} name={skill.name} />
                )}
            </div>
            :
            <div></div>
    );
}

export default Skills;