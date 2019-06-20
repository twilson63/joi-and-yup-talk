# Talk: Joi and Yup

The art of validation.

Web applications are made up of three layers: the front-end layer, the application/server layer, and the database layer; with each layer, there is a risk of BADFOOD (bad data): Data made up of unintended values. In order to reduce risk of unintended data infiltrating our software, we have developed Architecture and Validation tools to effectively minimize this possibility. As more and more malware is developed to infiltrate harmful systems, ensuring these tools are completely secure is a very challenging problem. Today, we will be focusing on the data validation process as well as outlining these tools we have to improve our validation process.

### Validating data between the layers and at the edges
The two most important places to check your data are:
1. When the client is getting ready to submit data to the server/application.
2. When the server/application is accepting data.
It is also beneficial to check when the server/application is submitting to the database and after the database has received the data itself; however, I will be focusing on the client to server edge in this discussion.

## Thall shall not trust

When receiving data from a client in an application/server, you should automatically never trust the contents. It is important to always check the contents of the submitted data, ensuring that it meets the context of its purpose. 

> For example, if you have a form asking for an email address, there is a specific specification that defines what an email address should be shaped like. You would want to validate upon arrival of the data to reject the request if non-email data, like malicious code, appeared in the data field.

There are several validation tools available, I would like to introduce you to Joi. Joi is a declarative tool that allows you to create validation sequences using multiple functions. These functions then are passed into a singular function call (validate()). These validation rules are composed together to be both readiable and effective.

Here is the example provided in the Joi ReadMe:

```js
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainSegments: 2 })
}).with('username', 'birthyear').without('password', 'access_token');

// Return result.
const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
// result.error === null -> valid

// You can also pass a callback which will be called synchronously with the validation result.
Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { });  // err === null -> valid
```

Joi leverages a chainable API to compose validations together for each item in the document.

Additionally, here are the constraints defined by the schema:

```
username

- a required string
- must contain only alphanumeric characters
- at least 3 characters long but no more than 30
- must be accompanied by birthyear

password

- an optional string
- must satisfy the custom regex
- cannot appear together with access_token

access_token

- an optional, unconstrained string or number

birthyear

- an integer between 1900 and 2013

email

- a valid email address string
- must have two domain parts e.g. example.com
```

Once a schema is defined, you can take incoming client data and your newly created validate function to scan for abnormalities. If the result.error is `null`, then your data is valid; if the result.error object is `!null`, it will contain an object providing more information. You can also use a callback handler for validation if desired.

There are several methods that can be used to validation your incoming data:

https://github.com/hapijs/joi/blob/v16.0.0-rc2/API.md

Let's go through a couple of popular ones.

### String Validations

- alphanum - Requires the string value to only contain a-z, A-Z, 0-9, and underscore _
- min - minimum amount of characters
- max - max amount of characters
- email - email address
- uri - web address
- isoDate - valid iso8601 date

### Any validations

- required - indicates if this property is required
- allow - a set of values allowed for this property

### Customization

If you can't find a rule to validate your use case, you can create your own extension:

https://github.com/hapijs/joi/blob/v16.0.0-rc2/API.md#extendextension

### Demo

TODO:

## Validating on the client

The client is the land of zero trust; always assume the end user will do something that does not jive with the application's expectations. By validating on the client itself, you can provide input to the user before the data is rejected by the server, ideally while the user is entering information on the form.

There are all kinds of patterns out there on how best to do this; typically, you could either wait until the user presses the CTA (call to action) button and then provide the user with a list of errors, or you could leverage the blur events and validate after each field exits (or any such combination of the two).

> I think it is important, reguardless of which patterns you choose, to always perform an additional validation before you send your data packet to the server for processing.

There is another client library modeled after Joi called Yup; this library gives you the same declarative features of Joi, but without the node overhead.

https://github.com/jquense/yup


Example

``` js 
import * as yup from 'yup';

let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function() {
    return new Date();
  }),
});

// check validity
schema
  .isValid({
    name: 'jimmy',
    age: 24,
  })
  .then(function(valid) {
    valid; // => true
  });

// you can try and type cast objects to the defined schema
schema.cast({
  name: 'jimmy',
  age: '24',
  createdOn: '2014-09-23T19:25:25Z',
});
```

With yup, you can also customize local.

```
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Não é válido',
  },
  number: {
    min: 'Deve ser maior que ${min}',
  },
});

// now use Yup schemas AFTER you defined your custom dictionary
let schema = yup.object().shape({
  name: yup.string(),
  age: yup.number().min(18),
});

schema.validate({ name: 'jimmy', age: 11 }).catch(function(err) {
  err.name; // => 'ValidationError'
  err.errors; // => ['Deve ser maior que 18']
});
```

 

