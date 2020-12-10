// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}