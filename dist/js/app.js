"use strict";
var FieldType;
(function (FieldType) {
    FieldType["TEXT"] = "text";
    FieldType["TEXTAREA"] = "textarea";
    FieldType["DATE"] = "date";
    FieldType["EMAIL"] = "email";
    FieldType["SELECT"] = "select";
    FieldType["CHECKBOX"] = "checkbox";
})(FieldType || (FieldType = {}));
var FieldLabel = /** @class */ (function () {
    function FieldLabel(field) {
        this.field = field;
    }
    FieldLabel.prototype.generate = function () {
        var label = document.createElement("label");
        label.htmlFor = this.field.name;
        label.innerHTML = this.field.label;
        return label;
    };
    return FieldLabel;
}());
var InputField = /** @class */ (function () {
    function InputField(name, label, type) {
        this.name = name;
        this.label = label;
        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type = type;
    }
    InputField.prototype.render = function (parent) {
        var fieldLabel = new FieldLabel(this);
        var labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    };
    InputField.prototype.getValue = function () {
        return this.element.value;
    };
    return InputField;
}());
var TextAreaField = /** @class */ (function () {
    function TextAreaField(name, label) {
        this.type = FieldType.TEXTAREA;
        this.name = name;
        this.label = label;
        this.element = document.createElement("textarea");
        this.element.name = this.element.id = name;
    }
    TextAreaField.prototype.render = function (parent) {
        var fieldLabel = new FieldLabel(this);
        var labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    };
    TextAreaField.prototype.getValue = function () {
        return this.element.value;
    };
    return TextAreaField;
}());
var SelectField = /** @class */ (function () {
    function SelectField(name, label, options) {
        this.type = FieldType.TEXTAREA;
        this.name = name;
        this.label = label;
        this.element = document.createElement("select");
        this.element.name = this.element.id = name;
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var optionValue = options_1[_i];
            var optionElement = document.createElement("option");
            optionElement.value = optionElement.text = optionValue;
            this.element.appendChild(optionElement);
        }
    }
    SelectField.prototype.render = function (parent) {
        var fieldLabel = new FieldLabel(this);
        var labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    };
    SelectField.prototype.getValue = function () {
        return this.element.value;
    };
    return SelectField;
}());
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label) {
        this.type = FieldType.CHECKBOX;
        this.name = name;
        this.label = label;
        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type.toString();
    }
    CheckboxField.prototype.render = function (parent) {
        var fieldLabel = new FieldLabel(this);
        var labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    };
    CheckboxField.prototype.getValue = function () {
        return this.element.value;
    };
    return CheckboxField;
}());
var Form = /** @class */ (function () {
    function Form(fields) {
        this.fields = fields;
    }
    Form.prototype.render = function (parent) {
        var _this = this;
        var formElement = document.createElement("form");
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            // wrap field with div
            var div = document.createElement("div");
            div.className = "form-element";
            field.render(div);
            formElement.appendChild(div);
        }
        var button = document.createElement("button");
        button.type = "submit";
        button.innerHTML = "Wyślij";
        button.addEventListener("click", function (e) {
            console.log(_this.getValue());
            e.preventDefault();
        });
        formElement.appendChild(button);
        parent.appendChild(formElement);
    };
    Form.prototype.getValue = function () {
        var resultValues = {};
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            resultValues[field.type + "_" + field.name] = field.getValue();
        }
        return resultValues;
    };
    return Form;
}());
var form = new Form([
    new InputField("name", "Imię", FieldType.TEXT),
    new InputField("surname", "Nazwisko", FieldType.TEXT),
    new InputField("email", "E-mail", FieldType.EMAIL),
    new SelectField("major", "Wybrany kierunek studiów", ["Informatyka i Ekonometria", "Finanse i Rachunkowość", "Zarządzanie"]),
    new CheckboxField("isElearningPrefered", "Czy preferujesz e-learning?"),
    new TextAreaField("comments", "Uwagi")
]);
form.render(document.body);
