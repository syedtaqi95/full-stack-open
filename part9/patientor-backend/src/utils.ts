import {
  NewPatientEntry,
  Gender,
  BaseEntry,
  EntryWithoutId,
  EntryType,
  Diagnosis,
  HealthCheckRating
} from './types';

/*
Utility functions for proofing new patients
*/

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

const parseStringField = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field))
    throw new Error(`Incorrect or missing ${fieldName || ""}`);
  return field;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error(`Incorrect or missing date ${date || ""}`);
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error(`Incorrect or missing gender ${gender || ""}`);
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
  const newPatientEntry: NewPatientEntry = {
    name: parseStringField(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringField(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringField(occupation, 'occupation'),
    entries: [],
  };

  return newPatientEntry;
};

/*
Utility functions for proofing new entries
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes)
    return [];

  if (Array.isArray(codes)) {
    codes.map((code: Diagnosis['code']) => {
      if (!isString(code))
        throw new Error(`Incorrect diagnosis code ${code}`);
    });
    return codes as Array<Diagnosis['code']>;
  }
  throw new Error('Incorrect diagnosis codes');
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type))
    throw new Error(`Incorrect or missing entry type ${type || ""}`);

  return type;
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!isRating(rating))
    throw new Error(`Incorrect or missing healthCheckRating ${rating || ""}`);
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): { date: string, criteria: string } => {
  if (!discharge)
    throw new Error('Missing discharge');
  return {
    date: parseDate(discharge.date),
    criteria: parseStringField(discharge.criteria, 'criteria'),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): EntryWithoutId => {
  const newBaseEntry: Omit<BaseEntry, 'id'> = {
    description: parseStringField(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseStringField(object.specialist, 'specialist'),
    type: parseEntryType(object.type),
  };

  if (object.diagnosisCodes)
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);

  switch (newBaseEntry.type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: parseRating(object.healthCheckRating),
      };

    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type: EntryType.Hospital,
        discharge: parseDischarge(object.discharge),
      };

    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: parseStringField(object.employerName, 'employerName')
      };

    default:
      throw new Error(`Incorrect or missing entry type ${newBaseEntry.type || ""}`);
  }
};