import { Animal, Form, AnimalHasForm } from '../models';
import AnimalDemo from '../constants/Images';

export default class ControlGanadero {
  static _init() {
    Animal.createTable();
    Form.createTable();
    AnimalHasForm.createTable();
  }

  async createDemoData() {
    var animalList = [];
    animalList.push(
      Animal.create({
        name: 'Kristi',
        other_attribute: { color: 'white', race: 'Puddle', type: 'Dog', image: AnimalDemo },
        father_id: null,
        mother_id: null,
        birthdate: Date.now()
      })
    );
    animalList.push(
      Animal.create({
        name: 'Toby',
        other_attribute: { color: 'white', race: 'Puddle', type: 'Dog', image: AnimalDemo },
        father_id: null,
        mother_id: null,
        birthdate: Date.now()
      })
    );
    animalList.push(
      Animal.create({
        name: 'Lolo',
        other_attribute: { color: 'white', race: 'Puddle', type: 'Dog', image: AnimalDemo },
        father_id: 1,
        mother_id: 2,
        birthdate: Date.now()
      })
    );
    animalList.push(
      Animal.create({
        name: 'Gorda',
        other_attribute: { color: 'white', race: 'Puddle', type: 'Dog', image: AnimalDemo },
        father_id: 1,
        mother_id: 2,
        birthdate: Date.now()
      })
    );
    animalList.push(
      Animal.create({
        name: 'Tekla',
        other_attribute: { color: 'white', race: 'Puddle', type: 'Dog', image: AnimalDemo },
        father_id: 1,
        mother_id: 2,
        birthdate: Date.now()
      })
    );
    var form = Form.create({
      name: 'Medicacion',
      attribute: {
        field: [
          { name: 'Medicia', type: 'string', require: true },
          { name: 'Nota', type: 'text', require: false },
          {
            name: 'Fecha',
            type: 'date',
            require: true,
            default: () => {
              return Date.now();
            }
          }
        ]
      }
    });
    animalList.forEach(animal => {
      AnimalHasForm.create({
        form_id: form.id,
        animal_id: animal.id,
        attribute: [
          { name: 'Medicia', value: 'La Medicina de ' + animal.name },
          { name: 'Nota', value: 'La Nota Demo de ' + animal.name },
          {
            name: 'Fecha',
            value: Date.now()
          }
        ]
      });
    });
  }

  static _destroy() {
    Animal.dropTable();
    Form.dropTable();
    AnimalHasForm.dropTable();
  }

  async registerAnimal(animal) {
    var animal = Animal.create(animal);
    return animal;
  }

  async registerForm(form) {
    var form = Form.create(form);
    return form;
  }

  async registerAnimalHasForm(animalHasForm) {
    var animalHasForm = AnimalHasForm.create({
      form_id: animalHasForm.form.id,
      animal: animalHasForm.animal.id,
      attribute: animalHasForm.attribute
    });
    return animalHasForm;
  }

  async getAnimalByName(name) {
    return Animal.findBy({ name: name });
  }
  async getFormByName(name) {
    return Form.findBy({ name: name });
  }
  async getAnimalHasForm(animalHasForm) {
    var filter = {};
    if (typeof animalHasForm.animal != undefined) {
      filter.animal_id = animalHasForm.animal.id;
    }
    if (typeof animalHasForm.form != undefined) {
      filter.form_id = animalHasForm.form.id;
    }
    var animalHasForm = AnimalHasForm.findBy(filter);
    var animalHasFormList = [];
    animalHasForm.forEach(element => {
      animalHasFormList.push({
        animalHasForm: element,
        form: Form.findBy({ id: element.form_id }),
        animal: Animal.findBy({ id: element.animal_id })
      });
    });
    return animalHasFormList;
  }
}
