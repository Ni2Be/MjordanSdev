import React, { useState } from 'react'
import { Menu, Sidebar } from 'semantic-ui-react'

import './Menu.scss';

const MenuBar: React.FC = () => {

    const [activeItem, setActiveItem] = useState('about');

    const handleClick = (state: typeof activeItem) => {
        setActiveItem(state);
    }

    return (
        <Menu
            pointing
            vertical
            secondary
            visible>
            <Menu.Item
                className='someContent'
                name='about'
                active={activeItem === 'about'}
                onClick={() => handleClick('about')}
            />
            <Menu.Item
                className='someContent'
                name='projects'
                active={activeItem === 'projects'}
                onClick={() => handleClick('projects')}
            />
            <Menu.Item
                className='someContent'
                name='contact'
                active={activeItem === 'contact'}
                onClick={() => handleClick('contact')}
            />
            <Menu.Item
                className='someContent'
                name='articles'
                active={activeItem === 'articles'}
                onClick={() => handleClick('articles')}
            />
        </Menu>
    )
}

export default MenuBar;