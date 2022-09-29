import React from "react"
import { Link } from "react-router-dom";
import "./Logo.scss";

interface IProps {
    text?: string;
}

const Logo: React.FC<IProps> = ({ text }) => {

    return (
        <div className="logo">
            <Link to='/' >
                <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="logo" clipPath="url(#clip0_5_64)">
                        <g id="rect">
                            <path id="rect-4"
                                d="M33.1406 17.0591L17.0591 0.977661L0.977661 17.0591L17.0591 33.1406L33.1406 17.0591Z"
                                strokeWidth="1.38262" />
                            <path id="rect-3"
                                d="M29.7802 17.0592L17.0591 4.33813L4.33807 17.0592L17.0591 29.7803L29.7802 17.0592Z"
                                strokeWidth="1.09371" />
                            <path id="rect-2"
                                d="M27.0732 17.0591L17.0591 7.04504L7.04507 17.0591L17.0591 27.0732L27.0732 17.0591Z"
                                strokeWidth="0.860969" />
                            <path id="rect-1"
                                d="M22.5341 17.0592L17.0591 11.5842L11.5842 17.0592L17.0591 22.5341L22.5341 17.0592Z"
                                strokeWidth="0.470714" />
                            <path id="rect-0"
                                d="M24.6462 17.0592L17.0591 9.47205L9.47204 17.0592L17.0591 24.6463L24.6462 17.0592Z"
                                strokeWidth="0.652309" />
                        </g>
                    </g>
                </svg>
                <p>{text}</p>
            </Link>
        </div>
    )
}

export default Logo;