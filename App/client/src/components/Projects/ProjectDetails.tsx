import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Grid, Header, Icon, Modal, Placeholder, PlaceholderImage } from 'semantic-ui-react'

const ProjectDetails = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

    const backToProjectsList = () => {
        setShowModal(false);
        navigate('/projects');
    }

    return (

        <Modal
            basic
            dimmer='blurring'
            onClose={() => backToProjectsList()}
            onOpen={() => setShowModal(true)}
            open={showModal}
            size='large'
        >
            <Header icon style={{ textAlign: 'left' }}>
                Project
            </Header>
            <Modal.Content scrolling>
                <Grid columns={2} rows={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <h1>Description</h1>
                            <p>
                                {id}
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <Placeholder style={{ height: 180, width: 320 }}>
                                <Placeholder.Image />
                            </Placeholder>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Placeholder style={{ height: 180, width: 320 }}>
                                <Placeholder.Image />
                            </Placeholder>
                        </Grid.Column>
                        <Grid.Column>
                            <h1>Bullet Points</h1>
                            <ul>
                                <li>Awesome</li>
                                <li>Great</li>
                                <li>Super</li>
                                <li>Amazing</li>
                            </ul>
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