export { FieldType, IField, ISavedField, InputField, TextAreaField, SelectField, CheckboxField }

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
    options: any,
    render(parent: HTMLElement): void,
    getValue(): string;
}

interface ISavedField {
    name: string,
    label: string,
    fieldType: FieldType,
    options: any,
    value: string
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
    options = null;

    constructor(name: string, label: string, type: FieldType, value: any = null) {
        this.name = name;
        this.label = label;

        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type = type;
        
        this.setValue(value);
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

    private setValue(value: any): void {
        this.element.value = value;
    }
}

class TextAreaField implements IField {
    element: HTMLTextAreaElement;
    name: string;
    label: string;
    type = FieldType.TEXTAREA;
    options = null;

    constructor(name: string, label: string, value: any = null) {
        this.name = name;
        this.label = label;

        this.element = document.createElement("textarea");
        this.element.name = this.element.id = name;

        this.setValue(value);
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

    private setValue(value: any): void {
        this.element.value = value;
    }
}

class SelectField implements IField {
    element: HTMLSelectElement;
    name: string;
    label: string;
    options: string[];
    type = FieldType.SELECT;

    constructor(name: string, label: string, options: string[], value: any = null) {
        this.name = name;
        this.label = label;
        this.options = options;

        this.element = document.createElement("select");
        this.element.name = this.element.id = name;

        this.generateOptions();
        this.setValue(value);
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
    
    private setValue(value: any): void {
        this.element.value = value;
    }

    private generateOptions(): void {
        for (const optionValue of this.options) {
            let optionElement = document.createElement("option");
            optionElement.value = optionElement.text = optionValue;

            this.element.appendChild(optionElement);
        }
    }
}

class CheckboxField implements IField {
    element: HTMLInputElement;
    name: string;
    label: string;
    type = FieldType.CHECKBOX;
    options = null;

    constructor(name: string, label: string, value: any = "false") {
        this.name = name;
        this.label = label;

        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type.toString();

        this.setValue(value);
    }

    render(parent: HTMLElement): void {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate() as HTMLLabelElement;

        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }

    getValue(): string {
        return this.element.checked.toString();
    }

    private setValue(value: any): void {
        if (value == "true") {
            this.element.checked = true;
        }
        else {
            this.element.checked = false;
        }
    }
}