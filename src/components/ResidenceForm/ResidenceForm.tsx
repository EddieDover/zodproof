import { useState } from 'react';
import { ResidenceFormPart } from './ResidenceFormPart';
import ResidenceFormMetaData from './types';

export const ResidenceForm = () => {
    const [resForms, setResForms] = useState<ResidenceFormMetaData[]>([]);
    let currentSequence = 0
    return (
        <div>
            {resForms.map((resForm, currentSequence) => {
                return <ResidenceFormPart form={resForm} sequence={currentSequence}/>;
            })}
            <button type="button" onClick={() => {
                const newForm = new ResidenceFormMetaData();
                setResForms([...resForms, newForm]);
                currentSequence = currentSequence + 1;
            }}>Add</button>
            { resForms.length > 0 ? (<button type="button" onClick={ () => {
                console.log(resForms);
            }}>Submit</button>) : null }
        </div>
    );
};