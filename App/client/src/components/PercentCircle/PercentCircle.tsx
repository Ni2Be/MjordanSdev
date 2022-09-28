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
        <div className="percentCircle">
            <svg className={"percentCirclePercent-" + percentage} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                {colorGradientStart && colorGradientEnd &&
                    <defs>
                        <linearGradient id={"linear" + id} x1="0%" y1="0%" x2="100%" y2="100%" >
                            <stop offset="0%" stop-color={colorGradientStart ?? colorGradientStart} stop-opacity={opacityGradientStart ? opacityGradientStart : 1.0} />
                            <stop offset="100%" stop-color={colorGradientEnd ?? colorGradientEnd} stop-opacity={opacityGradientEnd ? opacityGradientEnd : 1.0} />
                        </linearGradient>
                    </defs>}

                {colorGradientStart && colorGradientEnd ?
                    <circle cx="70" cy="70" r="57" stroke={"url(#linear" + id + ")"} />
                    :
                    <circle style={{ stroke: color }} cx="70" cy="70" r="57" />
                }

            </svg>
            {innerComponent ? innerComponent : <p style={{ color: color }} >{percentage}%</p>}
        </div>
    )
}

export default PercentCircle;