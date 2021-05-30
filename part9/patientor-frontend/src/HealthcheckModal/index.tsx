import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntryWithoutId } from '../types';
import { HealthcheckForm } from './HealthcheckForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const HealthcheckModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <HealthcheckForm onCancel={onClose} onSubmit={onSubmit} />
    </Modal.Content>
  </Modal>
);

export default HealthcheckModal;