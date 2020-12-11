import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: {}) => void;
  error?: string;
}

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      Tadaa
    </Modal.Content>
  </Modal>
);

export default AddPatientEntryModal;
