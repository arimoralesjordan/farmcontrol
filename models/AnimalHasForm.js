import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class AnimalHasForm extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase('database');
  }

  static get tableName() {
    return 'animals_has_form';
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      form_id: { type: types.INTEGER, not_null: true },
      animal_id: { type: types.INTEGER, not_null: true },
      fields: { type: types.JSON },
      uid: { type: types.INTEGER, unique: true },
      sync_at: { type: types.INTEGER },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    };
  }
}
