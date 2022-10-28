import React, { useCallback, useEffect, useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Grid, Image } from "semantic-ui-react";
import { IContactInfo, IContactRequest } from "../../models/contact";
import agent from "../../api/agent";
import { IReCaptchaRequest } from "../../models/recaptcha";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Input, SubmitButton, TextArea } from 'formik-semantic-ui-react';
import './Contact.scss'

const contactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!'),
    mail: Yup.string().email('Invalid email').required('Required'),
    message: Yup.string()
        .min(2, 'Too Short!')
        .max(20000, 'Too Long!')
        .required('Required'),
});

const MailFrom = (handleReCaptchaVerify: (contactInfo: IContactInfo) => Promise<string | void>) => {
    return (
        <Formik
            initialValues={{
                name: '',
                mail: '',
                message: '',
            }}
            validationSchema={contactSchema}
            onSubmit={(values: IContactInfo) => handleReCaptchaVerify(values)}
        >
            {({ errors, touched }) => (
                <Form >

                    <label>Name</label>
                    <Input name="name" component="input" placeholder="Name" />
                    <label>Mail</label>
                    <Input name="mail" component="input" placeholder="Mail" />
                    <label>Message</label>
                    <TextArea name="message" component="textarea" placeholder="Message..." />
                    <SubmitButton type="submit">Submit</SubmitButton>
                </Form>
            )}
        </Formik>
    );
}

const ContactPage = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [contactInfo, setContactInfo] = useState<IContactInfo>();
    const [contactInfoSent, setContactInfoSent] = useState(false);

    const handleReCaptchaVerify = useCallback(async (contactInfo: IContactInfo) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('submitContactForm');
        const reCaptchaRequest: IReCaptchaRequest = { reCaptchaToken: token }
        
        const contactRequest: IContactRequest = {
            contactInfo: contactInfo,
            reCaptchaRequest: reCaptchaRequest
        }
        return agent.Contact.sendContactRequest(contactRequest)
                            .then(() =>
                            { setContactInfoSent(true); console.log("yes")})
                            .catch(error => console.error(error));

    }, [executeRecaptcha]);

    useEffect(() => {
        if (!contactInfo)
            return;
        handleReCaptchaVerify(contactInfo);
    }, [handleReCaptchaVerify]);

    return (
        <div className="contact">
            <Grid stackable columns={2}>
                <Grid.Column >
                    <div className="contactTextBox" >
                        <Grid stackable columns={2}>
                            <Grid.Column >
                                <Image
                                    target={'_blank'}
                                    rel="noopener noreferrer"
                                    href="https://www.linkedin.com/in/jordan-scholzen-259775199/"
                                    style={{ filter: 'grayscale(100%) invert(70%)', width: '100%' }}
                                    src='assets/images/LinkedIn_Logo.svg' />

                                <h1>Contact</h1>
                                {
                                    contactInfoSent ?
                                        <h1>Your Message was sent, Thanks!</h1>
                                        :
                                        MailFrom(handleReCaptchaVerify)
                                }
                            </Grid.Column>

                            <Grid.Column >
                                <Image
                                    target={'_blank'}
                                    rel="noopener noreferrer"
                                    href="https://github.com/Ni2Be/MjordanSdev/discussions/37"
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