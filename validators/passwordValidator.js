// src/validators/passwordValidator.js

function validatePassword(password) {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return lengthCriteria && uppercaseCriteria && lowercaseCriteria && numberCriteria && symbolCriteria;
}

