// eslint-disable-next-line @typescript-eslint/no-empty-interface

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

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface HealthCheck extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheck;

interface Discharge {
    date: string;
    criteria: string;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}