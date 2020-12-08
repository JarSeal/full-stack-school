import patientData from '../../data/patients.json';
import { PatientEntry } from '../types';

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

const addEntry = (): null => {
    return null;
};

export default {
    getEntries,
    addEntry
};