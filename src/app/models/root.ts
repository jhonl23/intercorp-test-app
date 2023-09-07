import { Person } from "./person";

export class Root{
    id!: number;
    person: Person = new Person();
    random!: number;
    random_float!: number;
    bool!: boolean;
    date!: string;
    regEx!: string;
    enumValue!: string;
    elt!: string;
    last_update!: string;
    last_modified!: string;
}