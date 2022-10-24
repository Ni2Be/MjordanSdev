import React from "react";
import styles from '../../styles/ProjectPreview.module.scss';

const ProjectPreviewPlaceholder = () => {
    return (
        <div className={styles.projectListElement}>
            <div className={styles.placeholderImage}></div>
        </div>
    )
}

export default ProjectPreviewPlaceholder;