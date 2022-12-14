import { useState } from "react";
import { FormObject, ResidenceFormType, ResidenceFormZodType } from "./types";

interface ResidenceFormPartProps {
    form: any;
    sequence: number;
}

export const ResidenceFormPart = (props: ResidenceFormPartProps) => {
    const { form, sequence } = props;
    const [errors, setErrors] = useState<{[field_name: string]:string[]}>({});

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const field = form.fieldDefinitions.find((field: FormObject) => field.label === id.split('_')[0]);

        const result = validateField(field.label)(value);
        const errorsObject = {[field.label]: result};
        field.value = value;
        setErrors({...errors, ...errorsObject});
    };

    const validateField = (field_name: keyof ResidenceFormType) =>
    (value: unknown): string => {
        const field = ResidenceFormZodType.pick({ [field_name]: true });
        const result = field.safeParse({ [field_name]: value });

        return !result.success ? result.error.errors[0].message : "";
    }

    const createFormField = (field: FormObject, sequence: number = 0, onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
        if (!field.label) return;
        return (
            <div key={`${field.label}_${sequence}_key`}>
                <label htmlFor={`${field.label}_${sequence}`}>{field.label}</label>
                {field.type === 'text' && <input type="text" onChange={onFieldChange} id={`${field.label}_${sequence}`} />}
                {field.type === 'Date' && <input type="date" onChange={onFieldChange} id={`${field.label}_${sequence}`} />}
                {field.type === 'number' && <input type="number" onChange={onFieldChange} id={`${field.label}_${sequence}`} />}
                <div style={{color: 'red'}}>{errors[field.label]}</div>
            </div>
        );
    };

    return (
        <form style={{display: 'flex', flexDirection:'column'}}>
        {form.fieldDefinitions.map((field: FormObject) => {
            return createFormField(field, sequence, onFieldChange);
        })}
        </form>
    )
};
