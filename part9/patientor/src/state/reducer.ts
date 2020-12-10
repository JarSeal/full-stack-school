import { State } from "./state";
import { Patient, PatientFull } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_FULL_PATIENT_DATA";
      payload: PatientFull;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const setFullPatientData = (patientData: PatientFull): Action => {
  return {
    type: "SET_FULL_PATIENT_DATA",
    payload: patientData
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_FULL_PATIENT_DATA":
      return {
        ...state,
        patientsFull: {
          ...state.patientsFull,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
