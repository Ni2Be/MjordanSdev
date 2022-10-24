import React, { useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function UnderConstruction() {
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal
      basic
      dimmer='blurring'
      open={showModal}
      size='small'
    >
      <Header icon>
        <Icon name='bug' />
        Under Construction!
      </Header>
      <Modal.Content >
        <p style={{ textAlign: 'center' }}>
          This site is under construction and may look off.<br /> Only continue if you are okay with that!
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setShowModal(false)}>
          <Icon name='angle right' /> Alright
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UnderConstruction
