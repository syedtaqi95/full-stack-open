import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntryWithoutId } from '../types';
import { OccuHealthEntryForm } from './OccuHealthEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const OccuHealthEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new occupational healthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <OccuHealthEntryForm onCancel={onClose} onSubmit={onSubmit} />
    </Modal.Content>
  </Modal>
);

export default OccuHealthEntryModal;