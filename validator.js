var validateObject = validateInput(2, "a");
console.log(validateObject.Message());

function validateInput(type, value) {
  var type = parseInt(type);
  var validateObject = constructValidateObject(type, value);
  switch (type) {
    case 1:
      validateObject.TypeName = "Undefined";
      break;
    case 2:
      validateObject.TypeName = "Integer";
      validateObject.Valid = validateInt(value);
      break;
    case 3:
      validateObject.TypeName = "Monetary";
      validateObject.Valid = validateMonetary(value);
      break;
    case 4:
      validateObject.TypeName = "Float";
      validateObject.Valid = validateFloat(value);
      break;
    case 5:
      validateObject.TypeName = "Date";
      validateObject.Valid = validateDate(value);
      break;
    case 6:
      validateObject.TypeName = "Text";
      break;
    default:
      validateObject.TypeName = "Invalid Type";
      validateObject.Valid = false;
      break;
  }
  return validateObject;
}

function validateInt(value) {
  var string = value.toString();
  var n = string.search(/^[-+]?\d+$/);
  return n > -1
}

function validateMonetary(value) {
  var string = value.toString();
  var n = string.search(/^\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/);
  return n > -1
}

function validateFloat(value) {
  var string = value.toString();
  var n = string.search(/^-?(\d+(\.|(\.\d+)))$/);
  return n > -1
}

function validateDate(value) {
  //use moment
}

function constructValidateObject(type, value) {
  return {
    "Type": type,
    "TypeName": '',
    "InputValue": value,
    "Valid": true,
    "Message": function() {
      if (this.Valid) {
        return "The value '" + this.InputValue + "' is valid";
      } else {
        return "The value '" + this.InputValue + "' is invalid for the column type " + this.TypeName;
      }
    },
  }
}
