import { Router } from './router.js';
import { Form } from './form.js';
import { FieldType, InputField, TextAreaField, SelectField, CheckboxField } from './fields.js';
import { DocumentList } from "./documentList.js";
class App {
    constructor() {
        this.docList = new DocumentList();
        this.initialize();
    }
    initialize() {
        switch (Router.getPath()) {
            case '/new-document.html':
                this.initializeNewDocument();
                break;
            case '/edit-document.html':
                this.initializeEditDocument();
                break;
            case '/document-list.html':
                this.initializeDocumentList();
                break;
        }
    }
    initializeNewDocument() {
        const form = new Form([
            new InputField("name", "Imię", FieldType.TEXT),
            new InputField("surname", "Nazwisko", FieldType.TEXT),
            new InputField("email", "E-mail", FieldType.EMAIL),
            new SelectField("major", "Wybrany kierunek studiów", ["Informatyka i Ekonometria", "Finanse i Rachunkowość", "Zarządzanie"]),
            new CheckboxField("isElearningPrefered", "Czy preferujesz e-learning?"),
            new TextAreaField("comments", "Uwagi")
        ]);
        form.render(document.getElementById("content"));
    }
    initializeEditDocument() {
        const documentId = Router.getParam("id");
        if (documentId && documentId !== "") {
            const savedDocument = this.docList.getDocument(documentId);
            let formFields = [];
            for (const fieldInfo of savedDocument) {
                let field;
                switch (fieldInfo.fieldType) {
                    case FieldType.TEXT:
                    case FieldType.DATE:
                    case FieldType.EMAIL:
                        field = new InputField(fieldInfo.name, fieldInfo.label, fieldInfo.fieldType, fieldInfo.value);
                        break;
                    case FieldType.TEXTAREA:
                        field = new TextAreaField(fieldInfo.name, fieldInfo.label, fieldInfo.value);
                        break;
                    case FieldType.SELECT:
                        field = new SelectField(fieldInfo.name, fieldInfo.label, fieldInfo.options, fieldInfo.value);
                        break;
                    case FieldType.CHECKBOX:
                        field = new CheckboxField(fieldInfo.name, fieldInfo.label, fieldInfo.value);
                        break;
                }
                formFields.push(field);
            }
            const form = new Form(formFields, true, documentId);
            form.render(document.getElementById("content"));
        }
        else {
            document.getElementById("content").innerHTML = "<p>Given document was not found</p>";
        }
    }
    initializeDocumentList() {
        this.docList.getDocumentList();
        this.docList.render(document.getElementById("content"));
    }
}
const app = new App();
