import { BaseModel } from 'expo-sqlite-orm';

export default class FormRepository extends BaseModel {
  //...another model methods...
  static searchHistorial() {
    const sql =
      'SELECT * FROM form, animals_has_form WHERE animals_has_form.animals_id = ? and animals_has_form.form_id=form.id order by animals_has_form.timestamp DESC limit ? OFFSET ?';
    const params = [options.animal_id, options.limit, options.page];
    return this.repository.databaseLayer
      .executeSql(sql, params)
      .then(({ rows }) => rows)
      .catch(({ error }) => error);
  }
}
