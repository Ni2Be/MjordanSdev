import React, { useEffect, useState } from "react"
import { Menu } from "semantic-ui-react"
import Logo from "../Logo/Logo";
import styles from '../../styles/SideBar.module.scss'
import { useRouter } from "next/router";

interface IProps{
    sideBarWidth?: string 
}

const SideBar: React.FC<IProps> = ({sideBarWidth: width}) => {

    const [activeItem, setActiveItem] = useState('about');
    const router = useRouter();

    useEffect(() => {
        setActiveItem(router.pathname.split('/').at(1)!);
    }, [router.pathname])

    const handleClick = (state: typeof activeItem) => {
        setActiveItem(state);
        router.push(state);
    }

    return (
        <div className={styles.sideBar} style={{width : width}}>
            <Logo text="MJS"/>
            <Menu
                pointing
                vertical
                secondary
                className={styles.sideBarMenu}>
                <Menu.Item
                    className={styles.sideBarItem}
                    name='about'
                    active={activeItem === 'about'}
                    onClick={() => handleClick('about')}
                />
                <Menu.Item
                    className={styles.sideBarItem}
                    name='projects'
                    active={activeItem === 'projects'}
                    onClick={() => handleClick('projects')}
                />
                {/* <Menu.Item
                    className={styles.sideBarItem}
                    name='articles'
                    active={activeItem === 'articles'}
                    onClick={() => handleClick('articles')}
                /> */}
                <Menu.Item
                    className={styles.sideBarItem}
                    name='contact'
                    active={activeItem === 'contact'}
                    onClick={() => handleClick('contact')}
                />
            </Menu>
        </div>
    )
}

export default SideBar;