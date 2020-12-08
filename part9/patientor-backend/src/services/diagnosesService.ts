import diagnoseData from '../../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getEntries = (): Array<DiagnoseEntry> => {
    return diagnoses;
};

const addEntry = (): null => {
    return null;
};

export default {
    getEntries,
    addEntry
};