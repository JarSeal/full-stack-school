import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container, Icon } from "semantic-ui-react";

import { PatientFull, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setFullPatientData } from "../state";

const SinglePatientPage: React.FC = () => {
  const [{ patientsFull }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

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
        return 'transgender alternate';
      default:
        throw new Error('CUSTOM ERROR');
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
        </div>
      }
    </Container>
  );
};

export default SinglePatientPage;
