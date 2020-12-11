import patients from '../../data/patients';
import { PatientEntry, NewPatientEntry, NewEntry, Entry, PublicPatient } from '../types';

let allPatients: PatientEntry[] = patients;

const createDummyId = () => {
    let newId = 'd';
    for(let i=0; i<7; i++) {
        const rndNum = Math.round(Math.random() * 10);
        newId += rndNum < 10 ? rndNum.toString() : '9';
    }
    newId += '-f723-11e9-8f0b-362b9e155667';
    return newId;
};

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
    const newPatientEntry = {
        id: createDummyId(),
        ...entry
    };
    allPatients.push(newPatientEntry);
    return newPatientEntry;
};

const addSubEntry = (entry: NewEntry, id: string): Entry => {
    const entryWithId: any = {
        id: createDummyId(),
        ...entry
    };
    for(let i=0; i<allPatients.length; i++) {
        if(allPatients[i].id === id) {
            allPatients[i].entries.push(entryWithId);
        }
    }
    return entryWithId;
};

export default {
    getEntries,
    addEntry,
    addSubEntry,
    getOnePatientEntry
};