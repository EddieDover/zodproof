import { z } from "zod";

export class ResidenceFormMetaData {
    fieldDefinitions: FormObject[] = [
        { label: "address1", type: "text", value: "" },
        { label: "address2", type: "text", value: "" },
        { label: "city", type: "text", value: "" },
        { label: "state", type: "text", value: "" },
        { label: "zip", type: "number", value: "" },
        { label: "fromDate", type: "text", value: "" },
        { label: "toDate", type: "text", value: "" }
    ];
    isValid: boolean = false;
};

export type ResidenceFormType = z.infer<typeof ResidenceFormZodType>;

export const ResidenceFormZodType = z.object({
    address1: z.string().min(1, "Address1 is required"),
    address2: z.string().min(1, "Address2 is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.number().min(10000, "Zip code is invalid").max(99999, "Zip code is invalid"),
    fromDate: z.date().min(new Date(1900, 0, 1), "Invalid Date").max(new Date(), "Invalid Date"),
    toDate: z.date().min(new Date(), "Invalid Date").max(new Date(3000, 0, 1), "Invalid Date"),
});

export class FormObject {
    label: string | null = null;
    type: string | null = null;
    value: string | number | null = null;
};

export default ResidenceFormMetaData;