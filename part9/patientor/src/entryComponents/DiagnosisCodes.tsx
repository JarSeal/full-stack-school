import React from 'react';
import { Diagnosis } from '../types';
import { useStateValue } from "../state";

interface Props {
    codes: Array<Diagnosis['code']>
}

const DiagnosisCodes = ({ codes }: Props) => {
    const [{ diagnoses }] = useStateValue();
    if(!codes || !codes.length) return null;

    const listStyles = () => {
        return {
            display: 'inline-block',
            marginRight: '5px',
            marginTop: '5px',
            padding: '3px 8px',
            border: '1px solid #e8e8e8'
        };
    };

    const getNameAndLatin = (code: string) => {
        for(let i=0; i<diagnoses.length; i++) {
            if(diagnoses[i].code === code) {
                return diagnoses[i].name +
                    (diagnoses[i].latin ? ' (' + diagnoses[i].latin + ')' : '');
            }
        }
        return null;
    };

    return (
        <ul style={{listStyle:'none',padding:0}}>
            {codes.map((diag: Diagnosis['code']) =>
                <li key={diag} style={listStyles()}>
                    {diag + ' : '}
                    {getNameAndLatin(diag)}
                </li>
            )}
        </ul>
    );
}

export default DiagnosisCodes;