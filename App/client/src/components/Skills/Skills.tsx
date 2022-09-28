import React from "react"
import "./Skills.scss";
import { ResponsiveCirclePacking } from '@nivo/circle-packing'



const Skills: React.FC = () => {

    const data = {
        "name": "root",
        "children": [
            {
                "id": "WiX",
                "value": 555
            },
            {
                "id": ".Net",
                "value": 30
            },
            {
                "id": "React",
                "value": 35
            },
            {
                "id": "Unity",
                "value": 98
            }]
    };

    return (
        <ResponsiveCirclePacking
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            id='id'
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
                return <div>{dataPoint.id}</div>;
            }}
            animate={false}
        />
    )
}

export default Skills;