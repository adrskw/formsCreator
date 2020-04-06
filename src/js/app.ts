import { Form } from './form.js';
import { FieldType, InputField, TextAreaField, SelectField, CheckboxField } from './fields.js';

const form = new Form([
    new InputField("name", "Imię", FieldType.TEXT),
    new InputField("surname", "Nazwisko", FieldType.TEXT),
    new InputField("email", "E-mail", FieldType.EMAIL),
    new SelectField("major", "Wybrany kierunek studiów", ["Informatyka i Ekonometria", "Finanse i Rachunkowość", "Zarządzanie"]),
    new CheckboxField("isElearningPrefered", "Czy preferujesz e-learning?"),
    new TextAreaField("comments", "Uwagi")
]);

form.render(document.getElementById("content")!);