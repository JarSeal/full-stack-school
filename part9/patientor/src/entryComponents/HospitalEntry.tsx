import React from 'react';
import { List } from 'semantic-ui-react';
import { HospitalEntry } from '../types';
import DiagnosisCodes from './DiagnosisCodes';

interface Props {
    entry: HospitalEntry;
}

const HospitalEntryComp = ({ entry }: Props) => {
    return (
        <List.Item key={entry.id}>
            <List.Icon name='hospital' size='large' verticalAlign='top' />
            <List.Content>
                <List.Header>{entry.date}</List.Header>
                <List.Description>{entry.description}</List.Description>
                <List.Description>Discharged: {entry.discharge.date}</List.Description>
                <List.Description>Discharge criteria: {entry.discharge.criteria}</List.Description>
                <DiagnosisCodes codes={entry.diagnosisCodes || []} />
            </List.Content>
        </List.Item>
    );
};

export default HospitalEntryComp;