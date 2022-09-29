import React from "react";
import { Grid } from "semantic-ui-react";
import Skills from "../Skills/Skills";
import './About.scss'

function About() {

    return (
        <div className="about">
            <Grid stackable columns="2" >
                <Grid.Column >
                    <div className="aboutTextBox" >
                        <h1>Hi, I’m Jordan,</h1>
                        <p>
                            I’m a full stack developer and consultant from Germany. Currently I work for Bosch Access Systems as software engineer, product owner and product security manager.
                        </p>
                        <h1>How can I help you?</h1>
                        <ul>
                            <li>I have a passion for the whole full stack. From micro-services in .Net over web apps in React to CI/CD pipelines, I’ve got your back!</li>
                            <li>Windows installer in WiX Toolset – no problem!</li>
                            <li>Shader programming and ECS development in Unity, let’s go!</li>
                            <li>Anything else? Don't hesitate to ask, I'm sure we’ll find a solution!</li>
                            <li>I should stop shouting?! Alight!!!</li>
                        </ul>
                        <h1>How to reach me?</h1>
                        <p>
                            Message me on LinkedIn – write a public Issue on GitHub <br />
                            Or let me take you to the <a href="/contact">contact page</a>
                        </p>
                    </div >
                </Grid.Column>
                <Grid.Column>
                    <h1>My Skills</h1>
                    <Skills />
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default About;