import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { NewOccupationalEntry, NewHospitalEntry, NewHealthCheckEntry } from "../types";
import { useStateValue } from '../state';

export type EntryFormValues = NewHealthCheckEntry | NewOccupationalEntry | NewHospitalEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions = [
  { value: 'HealthCheck', label: 'Health check' },
  { value: 'OccupationalHealthcare', label: 'Occupational health care' },
  { value: 'Hospital', label: 'Hospital' }
];

export const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const setOptionals = (values: any) => {
    if(values.type === 'OccupationalHealthcare' && values.sickLeaveStart.length) {
      onSubmit({
        ...values,
        sickLeave: {
          startDate: values.sickLeaveStart,
          endDate: values.sickLeaveEnd
        }
      });
      return;
    } else if(values.type === 'Hospital') {
      onSubmit({
        ...values,
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria
        }
      });
    }
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
        employerName: '',
        sickLeaveStart: '',
        sickLeaveEnd: '',
        dischargeDate: '',
        dischargeCriteria: ''
      }}
      onSubmit={setOptionals}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if(!values.description) {
          errors.description = requiredError;
        }
        if(!values.date) {
          errors.date = requiredError;
        }
        if(!values.specialist) {
          errors.specialist = requiredError;
        }
        if(values.type === 'OccupationalHealthcare') {
          if(!values.employerName) {
            errors.employerName = requiredError;
          }
        } else if(values.type === 'Hospital') {
          if(!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if(!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <div className='field'>
              <label>Entry type</label>
              <Field as="select" name='type' className="ui dropdown">
                {entryTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === 'HealthCheck' &&
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            }
            {values.type === 'OccupationalHealthcare' &&
              <div className='field'>
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStart"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEnd"
                  component={TextField}
                />
              </div>
            }
            {values.type === 'Hospital' &&
              <div className='field'>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </div>
            }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
