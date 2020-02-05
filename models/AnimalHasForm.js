import { SQLite } from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class AnimalHasForm extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db');
  }

  static get tableName() {
    return 'animals_has_form';
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      form_id: { type: types.INTEGER, not_null: true },
      animal_id: { type: types.INTEGER, not_null: true },
      attribute: { type: types.JSON },
      uid: { type: types.INTEGER, unique: true, default: () => Date.now() },
      sync_at: { type: types.INTEGER, not_null: true },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    };
  }
}
