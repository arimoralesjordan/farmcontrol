import { Animal, Form, AnimalHasForm } from '../models';

export default class ControlGanadero {
  static async searchAnimal(text) {
    if (text == undefined) {
      text = '%';
    }
    const options = {
      columns: '*',
      where: {
        name_cont: text
      },
      page: 1,
      limit: 30,
      order: 'name ASC'
    };
    return Animal.query(options);
  }
  static async _init() {
    return Animal.createTable().then(() => {
      return Form.createTable().then(() => {
        return AnimalHasForm.createTable();
      });
    });
  }
  static _drop() {
    return AnimalHasForm.dropTable().then(() => {
      return Form.dropTable().then(() => {
        return Animal.dropTable();
      });
    });
  }
  static async _reset() {
    return this._drop().then(() => {
      return this._init();
    });
  }

  static async createDemoData() {
    var animalList = [];
    return Animal.create({
      name: 'Kristi',
      other_attribute: {
        color: 'white',
        race: 'Puddle',
        type: 'Dog',
        image: require('../assets/imgs/animal_demo.jpg')
      },
      father_id: null,
      mother_id: null,
      uid: Date.now(),
      birthdate: Date.now(),
      timestamp: Date.now()
    }).then(a => {
      animalList.push(a);
      return Animal.create({
        name: 'Toby',
        other_attribute: {
          color: 'white',
          race: 'Puddle',
          type: 'Dog',
          image: require('../assets/imgs/animal_demo.jpg')
        },
        father_id: null,
        mother_id: null,
        uid: Date.now(),
        birthdate: Date.now(),
        timestamp: Date.now()
      }).then(a => {
        animalList.push(a);
        return Animal.create({
          name: 'Lolo',
          other_attribute: {
            color: 'white',
            race: 'Puddle',
            type: 'Dog',
            image: require('../assets/imgs/animal_demo.jpg')
          },
          father_id: 1,
          mother_id: 2,
          uid: Date.now(),
          birthdate: Date.now(),
          timestamp: Date.now()
        }).then(a => {
          animalList.push(a);
          return Animal.create({
            name: 'Gorda',
            other_attribute: {
              color: 'white',
              race: 'Puddle',
              type: 'Dog',
              image: require('../assets/imgs/animal_demo.jpg')
            },
            father_id: 1,
            mother_id: 2,
            uid: Date.now(),
            birthdate: Date.now(),
            timestamp: Date.now()
          }).then(a => {
            animalList.push(a);
            return Animal.create({
              name: 'Tekla',
              other_attribute: {
                color: 'white',
                race: 'Puddle',
                type: 'Dog',
                image: require('../assets/imgs/animal_demo.jpg')
              },
              father_id: 1,
              mother_id: 2,
              uid: Date.now(),
              birthdate: Date.now(),
              timestamp: Date.now()
            }).then(a => {
              animalList.push(a);
              console.log('animalList', animalList);
              return Form.create({
                name: 'Medicacion',
                uid: Date.now(),
                timestamp: Date.now(),
                fields: [
                  { name: 'Medicia', type: 'string', require: true },
                  { name: 'Nota', type: 'text', require: false },
                  {
                    name: 'Fecha',
                    type: 'date',
                    require: true
                  }
                ]
              }).then(form => {
                console.log('form', form);
                animalList.forEach(animal => {
                  console.log('animal,form ', animal, form);
                  return AnimalHasForm.create({
                    form_id: form.id,
                    uid: Date.now(),
                    timestamp: Date.now(),
                    animal_id: animal.id,
                    fields: [
                      { name: 'Medicia', value: 'La Medicina de ' + animal.name },
                      { name: 'Nota', value: 'La Nota Demo de ' + animal.name },
                      {
                        name: 'Fecha',
                        value: Date.now()
                      }
                    ]
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  static _destroy() {
    Animal.dropTable();
    Form.dropTable();
    AnimalHasForm.dropTable();
  }

  static async _createAnimal(animal) {
    return Animal.create({
      name: animal.name,
      other_attribute: {
        image: animal.image
      },
      father_id: animal.father.id,
      mother_id: animal.mother.id,
      uid: Date.now(),
      birthdate: animal.birthdate,
      timestamp: Date.now()
    });
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
