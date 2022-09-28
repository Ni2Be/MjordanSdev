import React from "react"
import { Container } from "semantic-ui-react";
import PercentCircle from "../PercentCircle/PercentCircle";
import "./Skill.scss";

interface IProps {
    percentage: number,
    name: string
}

const Skill: React.FC<IProps> = ({ percentage, name }) => {

    return (
            <div  className="skill">
            <PercentCircle percentage={percentage} colorGradientStart="#05a" colorGradientEnd="#0a5" opacityGradientStart={0.9} opacityGradientEnd={0.3} innerComponent={<p style={{ fontSize: '2rem' }}>{name}</p>} ></PercentCircle>
            </div>
    )
}

export default Skill;