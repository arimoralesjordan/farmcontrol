import { SQLite } from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class Animal extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase('database.db');
  }

  static get tableName() {
    return 'animals';
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, // For while only supports id as primary key
      name: { type: types.TEXT, not_null: true },
      other_attribute: { type: types.JSON },
      father_id: { type: types.INTEGER },
      mother_id: { type: types.INTEGER },
      birthdate: { type: types.DATE },
      uid: { type: types.INTEGER, unique: true },
      sync_at: { type: types.INTEGER, not_null: true },
      timestamp: { type: types.INTEGER, default: () => Date.now() }
    };
  }
}
