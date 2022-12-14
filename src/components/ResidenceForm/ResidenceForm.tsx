import { useState } from 'react';
import { ResidenceFormPart } from './ResidenceFormPart';
import ResidenceFormMetaData from './types';

export const ResidenceForm = () => {
    const [resForms, setResForms] = useState<ResidenceFormMetaData[]>([]);
    return (
        <div>
            {resForms.map((resForm, index) => {
                return <ResidenceFormPart form={resForm} sequence={index}/>;
            })}
            <button type="button" onClick={() => {
                const newForm = new ResidenceFormMetaData();
                setResForms([...resForms, newForm]);
            }}>Add</button>
            { resForms.length > 0 ? (<button type="button" onClick={ () => {
                console.log(resForms);
            }}>Submit</button>) : null }
        </div>
    );
};