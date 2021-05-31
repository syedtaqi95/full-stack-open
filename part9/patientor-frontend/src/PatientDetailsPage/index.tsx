import React, { useEffect, useState } from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import { updatePatientData, useStateValue } from "../state";
import { Patient, Entry, EntryWithoutId } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from '../components/EntryDetails';
import HealthcheckModal from '../HealthcheckModal';
import HospitalEntryModal from '../HospitalEntryModal';
import OccuHealthEntryModal from '../OccuHealthEntryModal';

const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [healthcheckModalOpen, setHealthcheckModalOpen] = React.useState<boolean>(false);
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [occuHealthModalOpen, setOccuHealthModalOpen] = React.useState<boolean>(false);

  const patientFromState = patients[id];

  // Get patient details from server if not done before, and update state
  useEffect(() => {
    try {
      const getPatientData = async () => {
        const { data: receivedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(updatePatientData(receivedPatient));
      };

      if (patientFromState && !patientFromState.ssn) {
        void getPatientData();
      }
      setPatient(patients[id]); // Always setPatient on component render
    } catch (e) {
      console.error(e);
    }
  }, [patientFromState]);

  // Modal callbacks
  const openHealthcheckModal = (): void => setHealthcheckModalOpen(true);
  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openOccuHealthModal = (): void => setOccuHealthModalOpen(true);

  const closeModal = (): void => {
    setHealthcheckModalOpen(false);
    setHospitalModalOpen(false);
    setOccuHealthModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if (patient) {
        patient?.entries?.push(newEntry);
        dispatch(updatePatientData(patient));
      }
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };  

  // Render loading screen if patient data is still loading
  if (!patient)
    return <div>Loading...</div>;

  // Set gender icon
  const icon = patient.gender === 'male' ? 'mars'
    : patient.gender === 'female' ? 'venus'
      : 'genderless';

  return (
    <div className="App">
      <Container>
        <Header as="h2">{patient?.name}<Icon name={icon} /></Header>
        <div>SSN: {patient?.ssn}</div>
        <div>Occupation: {patient?.occupation}</div>

        <Header as="h2">Entries</Header>
        <Button onClick={() => openHealthcheckModal()}>Add healthcheck entry</Button>
        <Button onClick={() => openHospitalModal()}>Add hospital entry</Button>
        <Button onClick={() => openOccuHealthModal()}>Add occupational healthcare entry</Button>

        {patient?.entries?.map(entry => (<EntryDetails key={entry.id} entry={entry} />))}
      </Container>

      <HealthcheckModal
        modalOpen={healthcheckModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <HospitalEntryModal
        modalOpen={hospitalModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <OccuHealthEntryModal
        modalOpen={occuHealthModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientDetailsPage;