import * as d3 from "d3";
import React, { ReactComponentElement, useEffect, useRef, useState } from "react"
import "./SkillDiagram.scss";

const createDiagram = (ref: React.RefObject<SVGSVGElement>) => {

    const width = 135;
    const height = 135;
    const twoPi = 2 * Math.PI;
    const progress = 0;
    const allocated = 2000000;
    const total = 4300000;
    const formatPercent = d3.format(".0%");

    var svg = d3.select(ref.current)
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .attr("transform", "origin(" + 0 + "," + 0 + ")");

        svg.append("circle")
        .attr("fill", "red")
        .attr("r", 50)
        .attr("x",  1000)
        .attr("y",  10);
}

const SkillDiagram = () => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        createDiagram(ref);
    }, [])

    return (
        <div className="skillDiagram">
            <svg ref = {ref}/>
        </div>
    )
}

export default SkillDiagram;