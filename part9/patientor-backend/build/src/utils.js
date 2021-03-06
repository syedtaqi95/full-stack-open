"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const parseName = (name) => {
    if (!name || !isString(name))
        throw new Error('Incorrect or missing name');
    return name;
};
const parseDOB = (date) => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error(`Incorrect or missing date: ${date}`);
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn))
        throw new Error('Incorrect or missing ssn');
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender))
        throw new Error('Incorrect or missing gender');
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation))
        throw new Error('Incorrect or missing occupation');
    return occupation;
};
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDOB(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: [],
    };
    return newEntry;
};
exports.toNewPatientEntry = toNewPatientEntry;
exports.default = exports.toNewPatientEntry;
