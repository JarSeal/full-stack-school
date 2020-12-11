import React from 'react';
import { List } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';
import DiagnosisCodes from './DiagnosisCodes';
import HealthRatingBar from '../components/HealthRatingBar';

interface Props {
    entry: HealthCheckEntry;
}

const HealthCheckEntryComp = ({ entry }: Props) => {
    return (
        <List.Item key={entry.id}>
            <List.Icon name='calendar alternate' size='large' verticalAlign='top' />
            <List.Content>
                <List.Header>{entry.date}</List.Header>
                <List.Description>{entry.description}</List.Description>
                <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
                <DiagnosisCodes codes={entry.diagnosisCodes || []} />
            </List.Content>
        </List.Item>
    );
};

export default HealthCheckEntryComp;