import React, { useEffect, useMemo, useState } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
// import agent from '../../api/agent';
import { IProjectDetails } from '../../models/projects';
import parse from 'html-react-parser';
import styles from '../../styles/ProjectDetails.module.scss'

const baseURL = process.env.REACT_APP_API_URL;

const getImageUrl = (projectDetails: IProjectDetails, name: string) => {
    return baseURL! + projectDetails.imageUrls.find(image => image.name === name)?.url;
}

const replaceImagePlaceholder = (html: string, projectDetails: IProjectDetails) => {
    projectDetails.imageUrls.forEach((imageUrl) => {
        html = html.replace(`{{${imageUrl.name}}}`, getImageUrl(projectDetails, imageUrl.name));
    });
    return html;
}

/*
    Helper component to design custom project details.
*/
const ProjectDesigner = () => {
    // const { id } = useParams();
    const [showModal, setShowModal] = useState(true);
    const [projectDetails, setProjectDetails] = useState<IProjectDetails>();

    const backToProjectsList = () => {
        setShowModal(false);
    }

    const designContent =
    `
        <div rows="2" class="ui two column grid">
            <div class="row">
                <div class="column">
                    <h1>Description</h1>
                    <p>This site was realized in .Net and React and an automatic deployment with GitHub actions and docker. The full source code is accessible <a href="https://github.com/Ni2Be/MjordanSdev">here</a>.</p></div><div class="column">
                    <img src="{{details_image_0}}" class="ui image fluid detailImage" style="background-color:transparent" />
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <img src="{{details_image_1}}" class="ui image fluid detailImage" style="background-color:transparent" width="200px">
                </div>
                <div class="column">
                    <h1>Bullet Points</h1>
                    <ul>
                        <li>.Net</li>
                        <li>React</li>
                        <li>CI/CD</li>
                        <li>Docker</li>
                        <li>GraphQL</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // useEffect(() => {
    //     const fetchProjectDetails = async (id: string) => {
    //         const data: IProjectDetails = await agent.Projects.getDetails(id);
    //         setProjectDetails(data);
    //     }
    //     fetchProjectDetails(id!).catch(console.error);
    // }, [id])

    const html = useMemo(() => {
        if (projectDetails)
            return replaceImagePlaceholder(designContent, projectDetails);
    }, [designContent, projectDetails])

    return (
        <Modal
            className={`${styles.projectDetail} ${styles.darkTheme}`}
            basic
            dimmer='blurring'
            onClose={() => backToProjectsList()}
            onOpen={() => setShowModal(true)}
            open={showModal}
            size='large'>
            <Modal.Content >
                {html && parse(html)}
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='grey' inverted onClick={() => backToProjectsList()}>
                    <Icon name='angle left' />Back
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ProjectDesigner;