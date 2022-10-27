import React, { useCallback, useEffect } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Grid, Image } from "semantic-ui-react";
import './Contact.scss'

const ContactPage = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    
  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('submitContactForm');

    console.log(token);
    // Do whatever you want with the token
  }, [executeRecaptcha]);
  
  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

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
                                    href="https://github.com/Ni2Be/MjordanSdev/discussions/37"
                                    style={{ filter: 'grayscale(100%) invert(70%)', width: '100%' }}
                                    src='assets/images/github.svg' />
                                    <button onClick={handleReCaptchaVerify}>Verify recaptcha</button>
                            </Grid.Column>
                        </Grid>
                    </div >
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ContactPage;