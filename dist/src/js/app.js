"use strict";
var FieldType;
(function (FieldType) {
    FieldType["INPUT"] = "text";
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
    function InputField(name, label) {
        this.type = FieldType.INPUT;
        this.name = name;
        this.label = label;
        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type.toString();
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
var DateField = /** @class */ (function () {
    function DateField(name, label) {
        this.type = FieldType.DATE;
        this.name = name;
        this.label = label;
        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type.toString();
    }
    DateField.prototype.render = function (parent) {
        var fieldLabel = new FieldLabel(this);
        var labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    };
    DateField.prototype.getValue = function () {
        return this.element.value;
    };
    return DateField;
}());
var EmailField = /** @class */ (function () {
    function EmailField(name, label) {
        this.type = FieldType.EMAIL;
        this.name = name;
        this.label = label;
        this.element = document.createElement("input");
        this.element.name = this.element.id = name;
        this.element.type = this.type.toString();
    }
    EmailField.prototype.render = function (parent) {
        var fieldLabel = new FieldLabel(this);
        var labelElement = fieldLabel.generate();
        parent.appendChild(labelElement);
        parent.appendChild(this.element);
    };
    EmailField.prototype.getValue = function () {
        return this.element.value;
    };
    return EmailField;
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
            field.render(formElement);
        }
        var button = document.createElement("button");
        button.type = "submit";
        button.addEventListener("click", function () {
            console.log(_this.getValue());
        });
        formElement.appendChild(button);
        parent.appendChild(formElement);
    };
    Form.prototype.getValue = function () {
        var resultValues = {};
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            resultValues[field.type + " + " + field.name] = field.getValue();
        }
        return resultValues;
    };
    return Form;
}());
var form = new Form([
    new InputField("in1", "etykietai1"),
    new InputField("in2", "etykietai2"),
    new TextAreaField("in3", "etykietai3"),
    new InputField("in4", "etykietai4"),
    new InputField("in5", "etykietai5")
]);
form.render(document.body);
