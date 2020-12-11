/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    NewPatientEntry,
    Gender,
    Discharge,
    HealthCheckRating,
    SickLeave,
    NewHospitalEntry,
    NewHealthCheckEntry,
    NewOccupationalEntry
} from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any, fieldName: string): string => {
    if(!text || !isString(text)) {
        throw new Error(`Not a string or missing value: ${fieldName}`);
    }
    return text;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseBirthDate = (date: any, ssn: any): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date.');
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
        throw new Error('Incorrect or missing gender.');
    }
    return gender;
};

const isSsn = (ssn: string): boolean => {
    const regex = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[01]\dA)\d{3}[\dABCDEFHJKLMNPRSTUVWXY]$/;
    return regex.test(ssn);
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing social security number.');
    }
    return ssn;
};

const toNewPatientEntry = (object: NewPatientEntry): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseBirthDate(object.dateOfBirth, object.ssn),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    entries: []
  };
  return newEntry;
};

const entriesTypes = [
    'Hospital', 'OccupationalHealthcare', 'HealthCheck'
];

const parseEntryType = (type: any): string => {
    if (!type || !entriesTypes.includes(type)) {
        throw new Error('Incorrect type for patient entries type.');
    }
    return type;
};

const parseDate = (date: any): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date.');
    }
    return date;
};

const parseDiagnosisCodes = (codes: any): string[] => {
    if(codes instanceof Array === false) {
        throw new Error('Incorrect diagnosis code array.');
    }
    codes.forEach((c: string) => {
        if(!c || !isString(c)) {
            throw new Error('Incorrect or missing diagnosis code.');
        }
    });
    return codes;
};

const parseDischarge = (discharge: any): Discharge => {
    if(!discharge || !discharge.date || !isString(discharge.date) ||
        !isDate(discharge.date) || !discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge fields.');
    }
    return discharge;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if(!rating || isNaN(rating) || rating < 0 || rating > 3) {
        throw new Error('Incorrect or missing health check rating value.');
    }
    return rating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
    if(!sickLeave || !sickLeave.startDate || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)
        || !sickLeave.endDate || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
        throw new Error('Incorrect format for sick leave fields.');
    }
    return sickLeave;
};

export const toNewEntry = (object: NewHospitalEntry | NewHealthCheckEntry | NewOccupationalEntry):
    NewHospitalEntry | NewHealthCheckEntry | NewOccupationalEntry => {
    const base: any = {
        type: parseEntryType(object.type),
        description: parseString(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseString(object.description, 'specialist'),
    };
    if(object.diagnosisCodes) base.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    switch(object.type) {
        case 'Hospital':
            const addHospitalEntry: NewHospitalEntry = {
                ...base,
                discharge: parseDischarge(object.discharge)
            };
            return addHospitalEntry;
        case 'HealthCheck':
            const addHealthCheckEntry: NewHealthCheckEntry = {
                ...base,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            return addHealthCheckEntry;
        case 'OccupationalHealthcare':
            if(object.sickLeave) base.sickLeave = parseSickLeave(object.sickLeave);
            const addOccupationalEntry: NewOccupationalEntry = {
                ...base,
                employerName: parseString(object.employerName, 'employerName')
            };
            return addOccupationalEntry;
    }
};

export default toNewPatientEntry;