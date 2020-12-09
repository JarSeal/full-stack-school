import patientData from '../../data/patients.json';
import { PatientEntry, NewPatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Omit<PatientEntry, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    let newId = 'd';
    for(let i=0; i<7; i++) {
        const rndNum = Math.round(Math.random() * 10);
        newId += rndNum < 10 ? rndNum.toString() : '9';
    }
    newId += '-f723-11e9-8f0b-362b9e155667';
    const newPatientEntry = {
        id: newId,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry
};