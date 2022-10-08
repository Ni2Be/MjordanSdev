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


    // Pie
    
    let defs = d3.select(ref.current).append("defs");
    let linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");
    linearGradient
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "0%");
    linearGradient.selectAll("stop")
    .data([
        {offset: "0%", color: "#2c7bb6"},
        {offset: "100%", color: "#90eb9d"}
      ])
    .enter().append("stop")
    .attr("offset", function(d) { return d.offset; })
    .attr("stop-color", function(d) { return d.color; });

    
    let margin = { left: 5, top: 5, right: 5, bottom: 5 };

    // Outer Group
    var dataGroup = d3.select(ref.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform",
            "translate(" + width / 2 + "," + height / 2 + ")" +
            "scale(1)");
            
            const radius = Math.min(width, height) / 2 - margin.left;

    let data =skills.filter(s => s.type === 'High Level');

    // set the color scale
    let color = d3.scaleOrdinal()
        .domain(data.map(s => s.name))
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

    let pie = d3.pie<ISkill>()
        .value(function (d) {
            return d.value as number;
        });

    var data_ready = pie(data)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8);
    dataGroup
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        // @ts-ignore
        .attr('d', arc)
        .attr('fill', d => (color(d.data.name)) as string)
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .style("fill", "url(#linear-gradient)");

        
    const outerArcForLabelsPosition = d3.arc()
    .innerRadius(radius * 0.85)
    .outerRadius(radius * 0.85);

        dataGroup
    .selectAll('allLabels')
    .data(data_ready)
    .enter()
    .append('text')
    .text(  (d) => { return d.data.name } )
    .attr('transform', (d) => {
        // @ts-ignore
      const pos = outerArcForLabelsPosition.centroid(d);
      const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.6 * (midAngle < Math.PI ? 1 : -1);
      return `translate(${  pos  })`;
    })
    .style('text-anchor', (d) => {
      const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midAngle < Math.PI ? 'start' : 'end')
    })
    .style('fill', 'white')





    
    //     // Line 
    
    // let margin = { left: 55, top: 15, right: 15, bottom: 75 };
    // // Outer Group
    // var dataGroup = d3.select(ref.current)
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.bottom + margin.top)
    //     .append("g")
    //     .attr("transform",
    //         "translate(" + margin.left + "," + margin.top + ")" +
    //         "scale(1)");

    // // Add X axis
    // let xScale = d3.scaleBand()
    //     .domain(skills.map(s => s.name))
    //     .range([0, width]);

    // dataGroup.append("g")
    //     .attr("transform", `translate(0,${height})`)
    //     .call(d3.axisBottom(xScale))
    //     .selectAll("text")
    //     .attr("transform", `translate(-10,10)rotate(-45)`)
    //     .style("text-anchor", "end")
    //     .style("font-size", 20);

    // // Add vertical lines
    // let verticalLines = d3.axisBottom(xScale)
    //     .tickFormat(() => '')
    //     .tickSize(height);

    // dataGroup.append("g")
    //     .attr("class", "grid")
    //     .call(verticalLines);

    // // Add Y axis
    // let yScale = d3.scalePow()
    //     .domain([0, 100]) // skills.map(s => s.value)
    //     .range([height, 0])
    //     .exponent(1);

    // dataGroup.append("g")
    //     .call(d3.axisLeft(yScale));

    // // Lines
    // let line = d3.line<ISkill>()
    //     .x(s => xScale(s.name) as number)
    //     .y(s => yScale(s.value))
    //     .curve(d3.curveStep);

    // dataGroup
    //     .append("path")
    //     .data([skills])
    //     .attr("transform", `translate(10,0)`)
    //     .attr("fill", "none")
    //     .attr("stroke", "red")
    //     .attr("d", line);
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