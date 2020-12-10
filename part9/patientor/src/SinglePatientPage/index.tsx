import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container } from "semantic-ui-react";

import { PatientFull } from "../types";
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

  return (
    <Container>
      {!patientsFull[id] && <h3>Loading..</h3>}
      {patientsFull[id] &&
        <div>
          <h2>{patientsFull[id].name}</h2>
        </div>
      }
    </Container>
  );
};

export default SinglePatientPage;
