import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Skills from "../Skills/Skills";
import './About.scss'

function About() {

    return (
        <div className="about">
            <Grid stackable columns="2" >
                <Grid.Column >
                    <div className="aboutTextBox" >
                        <h1>Hi, I&apos;m Jordan,</h1>
                        <p>
                            I&apos;m a full stack developer and consultant from Germany. Currently I work for Bosch Access Systems as software engineer, product owner and product security manager.
                        </p>
                        <h1>How can I help you?</h1>
                        <ul>
                            <li>I have a passion for the whole full stack. From micro-services in .Net over web apps in React to CI/CD pipelines, I&apos;ve got your back!</li>
                            <li>Windows installer in WiX Toolset – no problem!</li>
                            <li>Shader programming and ECS development in Unity, let&apos;s go!</li>
                            <li>Anything else? Don&apos;t hesitate to ask, I&apos;m sure we&apos;ll find a solution!</li>
                        </ul>
                        <p>
                            See <Link to="/projects">my projects.</Link>
                        </p>
                        <h1>How to reach me?</h1>
                        <p>
                            Let me take you to the <Link to="/contact">contact page.</Link>
                        </p>
                    </div >
                </Grid.Column>
                <Grid.Column>
                    <div className="skillsBox" >
                        <Skills />
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default About;