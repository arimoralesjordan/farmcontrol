import { Animal, Form, AnimalHasForm } from '../models';

export default class ControlGanadero
{
    static _init ()
    {
        Animal.createTable();
        Form.createTable();
        AnimalHasForm.createTable();
    }

    static _destroy ()
    {
        Animal.dropTable();
        Form.dropTable();
        AnimalHasForm.dropTable();
    }
}