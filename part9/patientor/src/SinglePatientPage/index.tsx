import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container, Icon, List, Button } from "semantic-ui-react";

import { PatientFull, Gender, Entry } from "../types";
import AddPatientEntryModal from "../AddPatientEntryModal";
import { apiBaseUrl } from "../constants";
import { useStateValue, setFullPatientData } from "../state";

import HospitalEntryComp from '../entryComponents/HospitalEntry';
import HealthCheckEntryComp from '../entryComponents/HealthCheckEntry';
import OccupationalHealthcareEntryComp from '../entryComponents/OccupationalHealthcareEntry';

const SinglePatientPage: React.FC = () => {
  const [{ patientsFull }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    if(!patientsFull[id]) {
      const fetchPatient = async () => {
        try {
          const { data: patientDataFromApi } = await axios.get<PatientFull>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setFullPatientData(patientDataFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [dispatch, id, patientsFull]);

  const labelStyle = () => {
    return {
      minWidth: '100px',
      display: 'inline-block'
    };
  };

  const setIcon = (gender: Gender) => {
    switch(gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      case 'other':
        return 'genderless';
      default:
        throw new Error('Unhandled enum type for Gender (icon): ' + gender.toString());
    }
  };

  const entryDetails = (entry: Entry) => {
    switch(entry.type) {
      case 'Hospital':
        return <HospitalEntryComp entry={entry} key={entry.id} />;
      case 'HealthCheck':
        return <HealthCheckEntryComp entry={entry} key={entry.id} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryComp entry={entry} key={entry.id} />;
      default:
        throw new Error('Unhandled Entry type: ' + JSON.stringify(entry));
    }
  };

  return (
    <Container>
      {!patientsFull[id] && <h3>Loading..</h3>}
      {patientsFull[id] &&
        <div style={{fontWeight: 700}}>
          <h2>
            {patientsFull[id].name + ' '}
            <Icon name={setIcon(patientsFull[id].gender)} title={'gender: ' + patientsFull[id].gender} />
          </h2>
          <div><span style={labelStyle()}>ssn:</span> {patientsFull[id].ssn}</div>
          <div><span style={labelStyle()}>occupation:</span> {patientsFull[id].occupation}</div>
          <div><span style={labelStyle()}>date of birth:</span> {patientsFull[id].dateOfBirth}</div>
          {patientsFull[id].entries.length ?
            <div style={{marginTop: '16px'}}>
              <h3>Entries <Button onClick={() => openModal()}>Add new entry</Button></h3>
              <List divided relaxed>
              {patientsFull[id].entries.map((entry: Entry) =>
                entryDetails(entry)
              )}
              </List>
            </div> :
            <div style={{marginTop:'16px'}}>
              <Button onClick={() => openModal()}>Add entry</Button>
            </div>
          }
          <AddPatientEntryModal
            modalOpen={modalOpen}
            onSubmit={() => console.log('EXPLOSION!')}
            error={error}
            onClose={closeModal}
          />
        </div>
      }
    </Container>
  );
};

export default SinglePatientPage;
