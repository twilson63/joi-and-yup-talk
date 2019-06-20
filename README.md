# Talk: Joi and Yup

The art of validation.

Web applications are made up of three layers, the frontend layer, the application/server layer and the database layer, with each layer there is a risk of BADFOOD, or bad data. That is data that is made up of unintended values. Architecture and Validation are our tools to reduce this risk. It is a very challenging problem and we will be focusing on the data validation process and the tools we have to improve our validation process.

Validating data between the layers and at the edges. The two most important places to check your data is when the client is getting ready to submit data to the server/application and when the server/application is accepting data. It is also beneficial to check when the serve/application is submitting to the database and after the database has received the data. But in this post, I will focus on the client to server edge.

## Thall shall not trust

As you receive data from a client as an application/server, you should never trust the contents, it is important to check the contents of the submitted data and make sure that the data meets the context of its purpose. 

> If you are recieving values asking for an email address, there is a specific specification that defines what an email address should be shaped like and you would want to validate upon arrival of the data to reject the request if non email data appeared in the email data field.

There are several validation tools available, I would like to introduce you to Joi, joi is a declarative tool that allows you to create validations by using functions that result into one validate function call. These validation rules are composed together to be both readiable and effective.

Here is the example provided in the joi readme:

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

Joi leverages a chainable api to compose validations together for each item in the document.

Here are the constraints defined by the schema

```
The above schema defines the following constraints:

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

Once a schema is defined, you can take your incoming data and use the validate function to scan that data against the schema, if the result.error is `null` then your data is valid, if the result.error object is not null, it will contain an object providing more information. You can also use a callback handler for validation too.

There are several methods that can be used to validation your incoming data.

https://github.com/hapijs/joi/blob/v16.0.0-rc2/API.md

Lets go through a couple of popular ones.

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

The client is the land of zero trust, also the end user is always likely to do something that does not jive with the expectations of the application. By validating on the client, you can provide input to the user before the data is rejected by the server, ideally while the user is entering information on the form.

There are all kinds of patterns out there on how best to do this, you could either wait until the user presses the CTA (call to action) button and then provide the user with a list of errors. Or you could leverage the blur events and validate after each field exits, or some combination.

> I think it is important reguardless of which patterns you choose, to always perform an additional validation before you send your data packet to the server.

There is a client library modeled after Joi, called Yup, this library gives you the same declarative features of Joi, but without the node overhead.

https://github.com/jquense/yup

  
