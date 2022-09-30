import React from "react"
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";
import './Contact.scss'

const ContactPage = () => {

    return (
        <div className="contact">
            <Grid stackable columns={2}>
                <Grid.Column >
                    <div className="contactTextBox" >
                        <h1>Contact</h1>
                        <Grid stackable columns={2}>
                            <Grid.Column >
                                <Image 
                                target={'_blank'} 
                                rel="noopener noreferrer" 
                                href="https://www.linkedin.com/in/jordan-scholzen-259775199/" 
                                style={{ filter: 'grayscale(100%) invert(70%)', width: '100%' }} 
                                src='assets/images/LinkedIn_Logo.svg' />

                            </Grid.Column>
                            <Grid.Column >
                                <Image 
                                target={'_blank'} 
                                rel="noopener noreferrer" 
                                href="https://github.com/Ni2Be/MjordanSdev/issues/33"
                                style={{ filter: 'grayscale(100%) invert(70%)', width: '100%' }} 
                                src='assets/images/github.svg' />
                            </Grid.Column>
                        </Grid>
                    </div >
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ContactPage;