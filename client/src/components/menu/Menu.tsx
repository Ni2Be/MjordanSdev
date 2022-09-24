import React, { useState } from 'react'

import './Menu.scss';

const MenuBar: React.FC = () => {

    const [activeItem, setActiveItem] = useState('about');

    const handleClick = (state: typeof activeItem) => {
        setActiveItem(state);
    }

    return (
        <div></div>
    )
}

export default MenuBar;