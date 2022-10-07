import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react"
import { ISkill } from "../../models/skills";
import { skillsDummyData } from "./DummyData";
import "./SkillDiagram.scss";

interface IProps {
    width: number;
    height: number;
}

const createDiagram = (ref: React.RefObject<SVGSVGElement>, { width, height }: IProps, skills: ISkill[]) => {
    let margin = { left: 55, top: 15, right: 15, bottom: 75 };

    // Outer Group
    var dataGroup = d3.select(ref.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")" +
            "scale(1)");

    // Add X axis
    let xScale = d3.scaleBand()
        .domain(skills.map(s => s.name))
        .range([0, width]);

    dataGroup.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", `translate(-10,10)rotate(-45)`)
        .style("text-anchor", "end")
        .style("font-size", 20);

    // Add vertical lines
    let verticalLines = d3.axisBottom(xScale)
        .tickFormat(() => '')
        .tickSize(height);

    dataGroup.append("g")
        .attr("class", "grid")
        .call(verticalLines);

    // Add Y axis
    let yScale = d3.scalePow()
        .domain([0, 100]) // skills.map(s => s.value)
        .range([height, 0])
        .exponent(1);

    dataGroup.append("g")
        .call(d3.axisLeft(yScale));

    // Lines
    let line = d3.line<ISkill>()
        .x(s => xScale(s.name) as number)
        .y(s => yScale(s.value))
        .curve(d3.curveStep);

    dataGroup
        .append("path")
        .data([skills])
        .attr("transform", `translate(10,0)`)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("d", line);
}

const SkillDiagram: React.FC<IProps> = (props) => {
    const ref = useRef<SVGSVGElement>(null);
    const [skills, setSkills] = useState<ISkill[]>();

    useEffect(() => {
        if (!skills && process.env.NODE_ENV !== "production")
            setSkills(skillsDummyData);

        if (skills)
            createDiagram(ref, props, skills);
    }, [props, skills])

    return (
        <div className="skillDiagram">
            <svg ref={ref} />
        </div>
    )
}

export default SkillDiagram;