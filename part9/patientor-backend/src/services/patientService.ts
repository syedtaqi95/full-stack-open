import patients from '../../data/patients';
import { PublicPatient, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (object: NewPatientEntry): Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...object
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error(`patient not found, id: ${id}`);
  }
};

export default {
  getEntries,
  addPatient,
  getPatient
};