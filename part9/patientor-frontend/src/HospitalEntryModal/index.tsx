import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntryWithoutId } from '../types';
import { HospitalEntryForm } from './HospitalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const HospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <HospitalEntryForm onCancel={onClose} onSubmit={onSubmit} />
    </Modal.Content>
  </Modal>
);

export default HospitalEntryModal;