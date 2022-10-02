import React from "react"
import "./PercentCircle.scss";

interface IProps {
    percentage: number,
    color?: string,
    colorGradientStart?: string,
    colorGradientEnd?: string,
    opacityGradientStart?: number,
    opacityGradientEnd?: number,
    innerComponent?: React.ReactNode
}

const PercentCircle: React.FC<IProps> = ({ percentage, color = 'grey', innerComponent, colorGradientStart, colorGradientEnd, opacityGradientStart, opacityGradientEnd }) => {
    const id = Math.random();
    return (
        <div className="percentCircleOuter">
            <svg viewBox="-2 -2 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {colorGradientStart && colorGradientEnd &&
                    <defs>
                        <linearGradient id={"linear" + id} x1="0%" y1="0%" x2="100%" y2="100%" >
                            <stop offset="0%" stopColor={colorGradientStart ?? colorGradientStart} stopOpacity={opacityGradientStart ? opacityGradientStart : 1.0} />
                            <stop offset="100%" stopColor={colorGradientEnd ?? colorGradientEnd} stopOpacity={opacityGradientEnd ? opacityGradientEnd : 1.0} />
                        </linearGradient>
                    </defs>}
                {colorGradientStart && colorGradientEnd ?
                    <path className="percentCircle"
                        stroke-dasharray={`${percentage}, 100`}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        stroke={"url(#linear" + id + ")"}
                    />
                    :
                    <path className="percentCircle"
                        stroke-dasharray={`${percentage}, 100`}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        stroke={color}
                    />}
            </svg>
            {innerComponent ? innerComponent : <p style={{ color: color }} >{percentage}%</p>}
        </div>
    )
}

export default PercentCircle;