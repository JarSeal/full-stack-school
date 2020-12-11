import patients from '../../data/patients';
import { PatientEntry, NewPatientEntry, PublicPatient } from '../types';

const allPatients: PatientEntry[] = patients;

const getEntries = (): PublicPatient[] => {
    return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getOnePatientEntry = (patientId: string): PatientEntry => {
    const patient = allPatients.filter(p => {
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
    allPatients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    addEntry,
    getOnePatientEntry
};