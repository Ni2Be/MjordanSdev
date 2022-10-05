import React from "react"
import PercentCircle from "../PercentCircle/PercentCircle";
import "./Skill.scss";

interface IProps {
    percentage: number,
    name: string
}

const Skill: React.FC<IProps> = ({ percentage, name }) => {

    return (
        <PercentCircle percentage={percentage} size='130px' colorGradientStart="#05a" colorGradientEnd="#0a5" opacityGradientStart={0.9} opacityGradientEnd={0.3} innerComponent={<p>{name}</p>} ></PercentCircle>
    )
}

export default Skill;