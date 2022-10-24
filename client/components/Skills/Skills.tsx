import React, { useEffect, useState } from "react"
import styles from '../../styles/Skills.module.scss'
import { ISkill } from "../../models/skills";
// import agent from "../../api/agent";
import Skill from "./Skill";
import { skillsDummyData } from "./DummyData"

const mapType = (type: string) => {
    if (type === 'High Level') return 2;
    if (type === 'Mid Level') return 1;
    return 0;
}

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<ISkill[]>();

    useEffect(() => {
        const fetchSkills = async () => {
            
            setSkills(skillsDummyData());
            // const data: ISkill[] = await agent.Skills.getAll();
            // data.sort((a, b) => mapType(b.type) - mapType(a.type));
            // setSkills(data);
        }

        fetchSkills().catch(console.error);
    }, [])

    return (
        skills &&
            skills.length > 0 ?
            <div className={styles.skills}>
                {skills.map((skill: ISkill) =>
                    <Skill key={skill.id} percentage={skill.value} name={skill.name} type={skill.type} />
                )}
            </div>
            :
            <></>
    );
}

export default Skills;