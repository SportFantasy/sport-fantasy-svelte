import Ajv from 'ajv'
import pointer from 'json-pointer'


const ajv = new Ajv({ jsonPointers: true })


export const validate = (schema, data) => {
    return ajv.validate(schema, data)
        ? [] : ajv.errors;
}

 export const buildHumanErrors = (userSchema, errors) => {
    return errors.map(function(error) {
        if (error.params.missingProperty) {
            const property = pointer.get(userSchema, '/properties/' + error.params.missingProperty);
            return property.title + ' is a required field';
        }
        const property = pointer.get(userSchema, '/properties' + error.dataPath);
        if (error.keyword == 'format' && property.example) {
            return property.title + ' is in an invalid format, e.g: ' + property.example;
        }
        return property.title + ' ' + error.message;
    });
}
