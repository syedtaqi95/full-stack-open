import patients from '../../data/patients';
import { PublicPatient, NewPatientEntry, Patient, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (object: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...object
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error(`patient not found, id: ${id}`);
  }
};

const addEntryToPatient = (entry: EntryWithoutId, patientId: string): Entry => {
  const newEntry = {
    ...entry,
    id: uuid(),
  };

  const patient = patients.find(p => p.id === patientId);
  if (patient) {
    patient.entries ? patient.entries.push(newEntry) : patient.entries = [newEntry];
    return newEntry;
  } else
    throw new Error(`could not add entry to patient id ${patientId}`);
};

export default {
  getEntries,
  addPatient,
  getPatient,
  addEntryToPatient
};