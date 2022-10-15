import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Grid, Icon, Modal } from 'semantic-ui-react'
import agent from '../../api/agent';
import { Image } from "semantic-ui-react"
import { IProjectDetails } from '../../models/projects';
import parse from 'html-react-parser';
import './ProjectDetails.scss'

const baseURL = process.env.REACT_APP_API_URL;

const getImageUrl = (projectDetails: IProjectDetails, name: string) => {
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

const replaceImagePlaceholder = (projectDetails: IProjectDetails) => {
    let html = projectDetails.description;
    projectDetails.imageUrls.forEach((imageUrl) => {
        html = html.replace(`{{${imageUrl.name}}}`, getImageUrl(projectDetails, imageUrl.name));
    });
    return html;
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
    }, [id])

    const customHtml = useMemo(() => {
        if (projectDetails && !projectDetails.defaultDetails)
            return replaceImagePlaceholder(projectDetails);
    }, [projectDetails])

    // TODO some solution for theming for modals
    return (
        <Modal
            className='projectDetail dark-theme'
            basic
            dimmer='blurring'
            onClose={() => backToProjectsList()}
            onOpen={() => setShowModal(true)}
            open={showModal}
            size='large'>
            <Modal.Content >
                {projectDetails?.defaultDetails ?
                    <Grid columns={2} rows={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <h1>Description</h1>
                                <p>
                                    {projectDetails?.description && parse(projectDetails?.description!)}
                                </p>
                            </Grid.Column>
                            <Grid.Column>
                                <Image className="fluid detailImage" src={projectDetails ? getImageUrl(projectDetails!, 'details_image_0') : ''} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Image className="fluid detailImage" width='200px' src={projectDetails ? getImageUrl(projectDetails!, 'details_image_1') : ''} />
                            </Grid.Column>
                            <Grid.Column>
                                <h1>Bullet Points</h1>
                                {projectDetails && getBulletPoints(projectDetails)}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    :
                    customHtml && parse(customHtml)
                }
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