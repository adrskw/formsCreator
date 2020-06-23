export { FieldType, InputField, TextAreaField, SelectField, CheckboxField };
var FieldType;
(function (FieldType) {
    FieldType["TEXT"] = "text";
    FieldType["TEXTAREA"] = "textarea";
    FieldType["DATE"] = "date";
    FieldType["EMAIL"] = "email";
    FieldType["SELECT"] = "select";
    FieldType["CHECKBOX"] = "checkbox";
})(FieldType || (FieldType = {}));
class FieldLabel {
    constructor(field) {
        this.field = field;
    }
    generate() {
        let label = document.createElement("label");
        label.htmlFor = this.field.name;
        label.innerHTML = this.field.label;
        return label;
    }
}
class InputField {
    constructor(name, label, type, value = null) {
        this.options = null;
        this.name = name;
        this.label = label;
        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type = type;
        this.setValue(value);
    }
    render(parent) {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }
    getValue() {
        return this.element.value;
    }
    setValue(value) {
        this.element.value = value;
    }
}
class TextAreaField {
    constructor(name, label, value = null) {
        this.type = FieldType.TEXTAREA;
        this.options = null;
        this.name = name;
        this.label = label;
        this.element = document.createElement("textarea");
        this.element.name = this.element.id = name;
        this.setValue(value);
    }
    render(parent) {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }
    getValue() {
        return this.element.value;
    }
    setValue(value) {
        this.element.value = value;
    }
}
class SelectField {
    constructor(name, label, options, value = null) {
        this.type = FieldType.SELECT;
        this.name = name;
        this.label = label;
        this.options = options;
        this.element = document.createElement("select");
        this.element.name = this.element.id = name;
        this.generateOptions();
        this.setValue(value);
    }
    render(parent) {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }
    getValue() {
        return this.element.value;
    }
    setValue(value) {
        this.element.value = value;
    }
    generateOptions() {
        for (const optionValue of this.options) {
            let optionElement = document.createElement("option");
            optionElement.value = optionElement.text = optionValue;
            this.element.appendChild(optionElement);
        }
    }
}
class CheckboxField {
    constructor(name, label, value = "false") {
        this.type = FieldType.CHECKBOX;
        this.options = null;
        this.name = name;
        this.label = label;
        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type.toString();
        this.setValue(value);
    }
    render(parent) {
        let fieldLabel = new FieldLabel(this);
        let labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    }
    getValue() {
        return this.element.checked.toString();
    }
    setValue(value) {
        if (value == "true") {
            this.element.checked = true;
        }
        else {
            this.element.checked = false;
        }
    }
}
