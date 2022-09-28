import React, { useEffect, useState } from "react"
import "./Skills.scss";
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { ISkill } from "../../models/skills";
import agent from "../../api/agent";

interface IDataPoint {
    name: string;
    children: {
        id: string;
        name: string;
        value: number;
    }[];
}

const Skills: React.FC = () => {
    const [skillMap, setSkillMap] = useState<Map<string, string>>(new Map());
    const [dataPoints, setDataPoints] = useState<IDataPoint>({ name: 'root', children: [] })

    useEffect(() => {

        const fetchSkills = async () => {
            const data: ISkill[] = await agent.Skills.getAll();

            const newDataPoints: IDataPoint = {
                name: "root",
                children: []
            };

            data.forEach(skill => {
                skillMap.set(skill.name, skill.description);
                newDataPoints.children.push({
                    id: skill.id,
                    name: skill.name,
                    value: skill.value
                });
            });
            setSkillMap(skillMap);
            setDataPoints(newDataPoints);
        }

        fetchSkills().catch(console.error);
    }, [])


    return (
        (dataPoints.children.length > 0) ?
            <ResponsiveCirclePacking
                data={dataPoints}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id='name'
                colors={['var(--secondary-0)', 'var(--secondary-1)', 'var(--secondary-2)', 'var(--secondary-3)']}
                colorBy='id'
                childColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'brighter',
                            0.4
                        ]
                    ]
                }}
                padding={1}
                leavesOnly={true}
                enableLabels={true}
                label="id"
                tooltip={dataPoint => {
                    return (
                        <div>
                            {dataPoint.id}<br />
                            {skillMap.get(dataPoint.id)}
                        </div>);
                }}
                animate={false}
            />
            :
            <div></div>
    )
}

export default Skills;