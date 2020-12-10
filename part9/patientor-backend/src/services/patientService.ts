import patientData from '../../data/patients.json';
import { PatientEntry, NewPatientEntry, PublicPatient } from '../types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getOnePatientEntry = (patientId: string): PatientEntry => {
    const patient = patients.filter(p => {
        if(p.id === patientId) return p;
        return null;
    });
    return patient[0];
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
    addEntry,
    getOnePatientEntry
};