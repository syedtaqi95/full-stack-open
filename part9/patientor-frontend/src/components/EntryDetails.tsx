import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { Entry, HealthCheckRating } from '../types';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses },] = useStateValue();

  //Helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  // Get the colour of healthChecKRating heart
  const getHealthCheckRatingColour = (rating: HealthCheckRating): ('red' | 'orange' | 'yellow' | 'green' | undefined) => {
    switch (rating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return undefined;
    }
  };

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Segment>
          <Header as='h3'>{entry.date} <Icon name='doctor' /> </Header>
          <i>{entry.description}</i><br />
          Specialist: {entry.specialist}<br />
          <Icon name='heart' color={getHealthCheckRatingColour(entry.healthCheckRating)} /><br />
          <ul>
            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
          </ul>
        </Segment>
      );

    case 'Hospital':
      return (
        <Segment>
          <Header as='h3'>{entry.date} <Icon name='hospital symbol' /></Header>
          <i>{entry.description}</i><br />
          Specialist: {entry.specialist}<br />
          <ul>
            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
          </ul>
          Discharged {entry.discharge.date}: {entry.discharge.criteria} <br />
        </Segment>
      );

    case 'OccupationalHealthcare':
      return (
        <Segment>
          <Header as='h3'>{entry.date} <Icon name='building' /></Header>
          <i>{entry.description}</i><br />
          Specialist: {entry.specialist}<br />
          Employer: {entry.employerName}
          <ul>
            {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
          </ul>
          {entry.sickLeave ? `Sick leave: ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`: null}
        </Segment>
      );

    default:
      assertNever(entry);
  }

  return <></>;
};

export default EntryDetails;