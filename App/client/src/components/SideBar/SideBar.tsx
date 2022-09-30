import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react"
import Logo from "../Logo/Logo";
import "./SideBar.scss";

interface IProps{
    sideBarWidth?: string 
}

const SideBar: React.FC<IProps> = ({sideBarWidth: width}) => {

    const [activeItem, setActiveItem] = useState('about');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setActiveItem(location.pathname.split('/').at(1)!);
    }, [location])
    

    const handleClick = (state: typeof activeItem) => {
        setActiveItem(state);
        navigate(state);
    }

    return (
        <div className="sideBar" style={{width : width}}>
            <Logo text="MJS"/>
            <Menu
                pointing
                vertical
                secondary
                className='sideBar'>
                <Menu.Item
                    className='sideBarItem'
                    name='about'
                    active={activeItem === 'about'}
                    onClick={() => handleClick('about')}
                />
                <Menu.Item
                    className='sideBarItem'
                    name='projects'
                    active={activeItem === 'projects'}
                    onClick={() => handleClick('projects')}
                />
                <Menu.Item
                    className='sideBarItem'
                    name='articles'
                    active={activeItem === 'articles'}
                    onClick={() => handleClick('articles')}
                />
                <Menu.Item
                    className='sideBarItem'
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={() => handleClick('contact')}
                />
            </Menu>
        </div>
    )
}

export default SideBar;