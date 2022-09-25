import React, { useState } from "react"
import { Menu } from "semantic-ui-react"
import "./SideBar.sass";

const SideBar: React.FC = () => {

    const [activeItem, setActiveItem] = useState('about');

    const handleClick = (state: typeof activeItem) => {
        setActiveItem(state);
    }

    return (
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
                name='contact'
                active={activeItem === 'contact'}
                onClick={() => handleClick('contact')}
            />
            <Menu.Item
                className='sideBarItem'
                name='articles'
                active={activeItem === 'articles'}
                onClick={() => handleClick('articles')}
            />
        </Menu>
    )
}

export default SideBar;