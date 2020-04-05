enum FieldType {
    TEXT = "text",
    TEXTAREA = "textarea",
    DATE = "date",
    EMAIL = "email",
    SELECT = "select",
    CHECKBOX = "checkbox"
}

interface Field {
    name: string,
    label: string,
    type: FieldType,
    render(parent: HTMLElement): void,
    getValue(): string;
}

class FieldLabel {
    field: Field;

    constructor(field: Field) {
        this.field = field;
    }

    generate(): HTMLLabelElement {
        let label = document.createElement("label");
        label.htmlFor = this.field.name;
        label.innerHTML = this.field.label;

        return label;
    }
}

class InputField implements Field {
    element: HTMLInputElement;
    name: string;
    label: string;
    type: FieldType;

    constructor(name: string, label: string, type: FieldType) {
        this.name = name;
        this.label = label;

        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type = type;
    }

    render(parent: HTMLElement): void {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate() as HTMLLabelElement;

        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }

    getValue(): string {
        return this.element.value;
    }
}

class TextAreaField implements Field {
    element: HTMLTextAreaElement;
    name: string;
    label: string;
    type = FieldType.TEXTAREA;

    constructor(name: string, label: string) {
        this.name = name;
        this.label = label;

        this.element = document.createElement("textarea");
        this.element.name = this.element.id = name;
    }

    render(parent: HTMLElement): void {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate() as HTMLLabelElement;

        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }

    getValue(): string {
        return this.element.value;
    }
}

class SelectField implements Field {
    element: HTMLSelectElement;
    name: string;
    label: string;
    type = FieldType.TEXTAREA;

    constructor(name: string, label: string, options: string[]) {
        this.name = name;
        this.label = label;

        this.element = document.createElement("select");
        this.element.name = this.element.id = name;

        for (const optionValue of options) {
            let optionElement = document.createElement("option");
            optionElement.value = optionElement.text = optionValue;

            this.element.appendChild(optionElement);
        }
    }

    render(parent: HTMLElement): void {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate() as HTMLLabelElement;

        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }

    getValue(): string {
        return this.element.value;
    }
}

class CheckboxField implements Field {
    element: HTMLInputElement;
    name: string;
    label: string;
    type = FieldType.CHECKBOX;

    constructor(name: string, label: string) {
        this.name = name;
        this.label = label;

        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type.toString();
    }

    render(parent: HTMLElement): void {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate() as HTMLLabelElement;

        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }

    getValue(): string {
        return this.element.value;
    }
}

class Form {
    private fields: Field[];
    
    constructor(fields: Field[]) {
        this.fields = fields;
    }

    render(parent: HTMLElement): void {
        const formElement = document.createElement("form");

        for (const field of this.fields) {
            // wrap field with div
            const div = document.createElement("div");
            div.className = "form-element";

            field.render(div);

            formElement.appendChild(div);
        }

        const button = document.createElement("button");
        button.type = "submit";
        button.innerHTML = "Wyślij"
        button.addEventListener("click", (e) => {
            console.log(this.getValue());
            e.preventDefault();
        });
        formElement.appendChild(button);

        parent.appendChild(formElement);
    }

    getValue(): {[key: string]: string}{
        let resultValues: {[key: string]: string} = {};
        
        for (const field of this.fields) {
            resultValues[field.type + "_" + field.name] = field.getValue(); 
        }

        return resultValues;
    }
}

const form = new Form([
    new InputField("name", "Imię", FieldType.TEXT),
    new InputField("surname", "Nazwisko", FieldType.TEXT),
    new InputField("email", "E-mail", FieldType.EMAIL),
    new SelectField("major", "Wybrany kierunek studiów", ["Informatyka i Ekonometria", "Finanse i Rachunkowość", "Zarządzanie"]),
    new CheckboxField("isElearningPrefered", "Czy preferujesz e-learning?"),
    new TextAreaField("comments", "Uwagi")
]);

form.render(document.body);