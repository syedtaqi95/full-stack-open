import React, { useEffect, useState } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import { updatePatientData, useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
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

  // Render loading screen if patient data is still loading
  if (!patient)
    return <div>Loading...</div>;

  const icon = patient.gender === 'male' ? 'mars'
    : patient.gender === 'female' ? 'venus'
      : 'genderless';

  return (
    <div className="App">
      <Container>
        <Header as="h2">
          {patient?.name}
          <Icon name={icon} />
        </Header>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>

        <Header as="h2">entries</Header>
        {patient?.entries?.map(entry => (
          <div key={entry.id}>
            {entry.date} <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes?.map(code => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        ))}

      </Container>
    </div>
  );
};

export default PatientDetailsPage;