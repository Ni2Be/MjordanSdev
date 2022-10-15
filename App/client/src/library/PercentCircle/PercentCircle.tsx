import React from "react"
import "./PercentCircle.scss";

interface IProps {
    children?: React.ReactElement | React.ReactElement[],
    percentage: number,
    size: string,
    color?: string,
    colorGradientStart?: string,
    colorGradientEnd?: string,
    opacityGradientStart?: number,
    opacityGradientEnd?: number
}

const PercentCircle: React.FC<IProps> = ({ children, percentage, size, color = 'grey', colorGradientStart, colorGradientEnd, opacityGradientStart, opacityGradientEnd }) => {
    const id = Math.random();

    return (
        <div className="percentCircleOuter" style={{ width: size }}>
            <svg viewBox="-2 -2 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {colorGradientStart && colorGradientEnd &&
                    <defs>
                        <linearGradient id={"linear" + id} x1="0%" y1="0%" x2="100%" y2="100%" >
                            <stop offset="0%" stopColor={colorGradientStart ?? colorGradientStart} stopOpacity={opacityGradientStart ? opacityGradientStart : 1.0} />
                            <stop offset="100%" stopColor={colorGradientEnd ?? colorGradientEnd} stopOpacity={opacityGradientEnd ? opacityGradientEnd : 1.0} />
                        </linearGradient>
                    </defs>}
                <path className="percentCircle"
                    strokeDasharray={`${percentage}, 100`}
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    stroke={colorGradientStart && colorGradientEnd ? "url(#linear" + id + ")" : color}
                />
            </svg>
            <div className="innerComponent">
                {children ? children : <p style={{ color: color }} >{percentage}%</p>}
            </div>
        </div>
    )
}

export default PercentCircle;