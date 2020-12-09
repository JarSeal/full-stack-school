/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any): string => {
    if(!text || !isString(text)) {
        throw new Error('Not a string: ' + text);
    }
    return text;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: any, ssn: any): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    if(ssn && isString(ssn)) {
        const ssnBirthdate = ssn.substring(0, 6);
        const dateArr = date.split('-');
        const bdShort = dateArr[2].toString() + dateArr[1].toString() + dateArr[0].toString().substring(2, 4);
        if(ssnBirthdate !== bdShort) {
            throw new Error('Date of birth and social security does not match.');
        }
    }
    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isSsn = (ssn: string): boolean => {
    const regex = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[01]\dA)\d{3}[\dABCDEFHJKLMNPRSTUVWXY]$/;
    return regex.test(ssn);
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing social security number: ' + ssn);
    }
    return ssn;
};

const toNewPatientEntry = (object: any): NewPatientEntry => { 
  const newEntry: NewPatientEntry = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth, object.ssn),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation)
  };
  return newEntry;
}

export default toNewPatientEntry;