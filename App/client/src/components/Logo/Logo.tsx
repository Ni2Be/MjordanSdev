import React, { useState } from "react"
import { Menu, Image, Label } from "semantic-ui-react"
import "./Logo.scss";

interface IProps {
    text?: string;
}

const Logo: React.FC<IProps> = ({text}) => {

    return (
        <div className="logo">
            <Image src={'assets/logo/logo.svg'} />
            <p>{text}</p>
        </div>
    )
}

export default Logo;