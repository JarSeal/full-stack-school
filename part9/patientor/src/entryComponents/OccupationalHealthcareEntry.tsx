import React from 'react';
import { List } from 'semantic-ui-react'
import { OccupationalHealthcareEntry } from '../types';
import DiagnosisCodes from './DiagnosisCodes';

interface Props {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryComp = ({ entry }: Props) => {
    return (
        <List.Item key={entry.id}>
            <List.Icon name='address card' size='large' verticalAlign='top' />
            <List.Content>
                <List.Header>{entry.date}</List.Header>
                <List.Description>{entry.description}</List.Description>
                <List.Description>Employer: {entry.employerName}</List.Description>
                {entry.sickLeave !== undefined &&
                    <List.Description>
                        Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                    </List.Description>
                }
                <DiagnosisCodes codes={entry.diagnosisCodes || []} />
            </List.Content>
        </List.Item>
    );
};

export default OccupationalHealthcareEntryComp;