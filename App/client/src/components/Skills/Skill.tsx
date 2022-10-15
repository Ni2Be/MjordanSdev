import React from "react"
import PercentCircle from "../PercentCircle/PercentCircle";

interface IProps {
    percentage: number,
    name: string,
    type: string
}

const gradientStart = (type: string) => {
    switch (type) {
        case 'Low Level': return '#05a';
        case 'Mid Level': return '#5a0';
        case 'High Level': return '#a50';
        default: return '#05a';
    }
}
const gradientEnd = (type: string) => {
    switch (type) {
        case 'Low Level': return '#0a5';
        case 'Mid Level': return '#0a5';
        case 'High Level': return '#05a';
        default: return '#0a5';
    }
}

const Skill: React.FC<IProps> = ({ percentage, name, type }) => {

    return (
        <PercentCircle 
            percentage={percentage} 
            size='130px' 
            colorGradientStart={gradientStart(type)} 
            colorGradientEnd={gradientEnd(type)} 
            opacityGradientStart={0.9} 
            opacityGradientEnd={0.3} >
            <p>{name}</p>
        </PercentCircle>
    )
}

export default Skill;