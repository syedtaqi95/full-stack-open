import patients from '../../data/patients';
import { PatientPublicFields } from '../types';

const getEntries = (): PatientPublicFields[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getEntries
};