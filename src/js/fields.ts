export { FieldType, IField, InputField, TextAreaField, SelectField, CheckboxField }

enum FieldType {
    TEXT = "text",
    TEXTAREA = "textarea",
    DATE = "date",
    EMAIL = "email",
    SELECT = "select",
    CHECKBOX = "checkbox"
}

interface IField {
    name: string,
    label: string,
    type: FieldType,
    render(parent: HTMLElement): void,
    getValue(): string;
}

class FieldLabel {
    field: IField;

    constructor(field: IField) {
        this.field = field;
    }

    generate(): HTMLLabelElement {
        let label = document.createElement("label");
        label.htmlFor = this.field.name;
        label.innerHTML = this.field.label;

        return label;
    }
}

class InputField implements IField {
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

class TextAreaField implements IField {
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

class SelectField implements IField {
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

class CheckboxField implements IField {
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