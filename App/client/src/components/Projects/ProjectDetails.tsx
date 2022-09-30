import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Grid, Header, Icon, Modal, Placeholder, PlaceholderImage } from 'semantic-ui-react'
import agent from '../../api/agent';
import { Image } from "semantic-ui-react"
import { IProjectDetails } from '../../models/projects';

const baseURL = process.env.REACT_APP_API_URL;

const getImageUrl = (projectDetails: IProjectDetails, name: string) => {
    console.log(baseURL! + projectDetails.imageUrls.find(image => image.name === name));
    return baseURL! + projectDetails.imageUrls.find(image => image.name === name)?.url;
}

const getBulletPoints = (projectDetails: IProjectDetails) => {
    return (
        <ul>
            {
                projectDetails.bulletPoints.split(';').map((point, i) => {
                    return <li key={i}>{point}</li>;
                })
            }
        </ul>
    );
}

const ProjectDetails = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState<IProjectDetails>();

    const backToProjectsList = () => {
        setShowModal(false);
        navigate('/projects');
    }


    useEffect(() => {
        const fetchProjectDetails = async (id: string) => {
            const data: IProjectDetails = await agent.Projects.getDetails(id);
            setProjectDetails(data);
        }
        fetchProjectDetails(id!).catch(console.error);
    }, [])


    return (
        <Modal
            basic
            dimmer='blurring'
            onClose={() => backToProjectsList()}
            onOpen={() => setShowModal(true)}
            open={showModal}
            size='large'>
            <Modal.Content >
                <Grid columns={2} rows={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <h1>Description</h1>
                            <p>
                                {projectDetails?.description}
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Image style={{ maxHeight: 180, maxWidth: 320 }} src={projectDetails ? getImageUrl(projectDetails!, 'details_image_0') : ''} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Image style={{ maxHeight: 180, maxWidth: 320 }} src={projectDetails ? getImageUrl(projectDetails!, 'details_image_1') : ''} />
                        </Grid.Column>
                        <Grid.Column>
                            <h1>Bullet Points</h1>
                            {projectDetails && getBulletPoints(projectDetails)}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='grey' inverted onClick={() => backToProjectsList()}>
                    <Icon name='angle left' />Back
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ProjectDetails;