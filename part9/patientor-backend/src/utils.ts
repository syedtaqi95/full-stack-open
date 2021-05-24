import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name))
    throw new Error('Incorrect or missing name');
  return name;
};

const parseDOB = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error(`Incorrect or missing date: ${date}`);
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn))
    throw new Error('Incorrect or missing ssn');
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error('Incorrect or missing gender');
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error('Incorrect or missing occupation');
  return occupation;
};

type Fields = { id: unknown, name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDOB(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newEntry;
};

export default toNewPatientEntry;