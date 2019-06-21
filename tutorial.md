# Form validation with Joi and Yup

This is a short tutorial that covers the basics of field, form, and server data validation using Joi and Yup.

## Objectives

The objective of this tutorial is to walk you through three areas where validation is important and should be leveraged to recieve quality data from your user base.

Upon completion of this tutorial, you should have a basic understanding of the integration points for schema validation in an application, and how you may leverage tools like Yup and Joi for creating strong validation support for your applications.

* Server-Side Validation: Validating data once received from the API; in a trusted area, so they can be easily controlled by the developer
* Form-Level Validation: Enables front-end to pre-validate before sending requests to the API
* Field-Level Validation: Alerts the user when they exit the input area; allows corrections as they occur

Additionally, feel free to save the file and test your form after any step to check for bugs. The page will automatically refresh with an updated version based on your saved changes. 

## Requirements

* NodeJS
* git

## Install demo

```sh
npx degit twilson63/joi-and-yup-talk tutorial
cd tutorial/demo
npm install
```

### Test-running the server
```
npm run dev
```
Now open your preferred web browser and navigate to `localhost:5000`.


## Lesson 1: Server-Side Validation

Once received from an endpoint, **all data** should be validated server-side and checked for errors. `@hapi/joi` provides a solid toolkit to create validation middleware for your API endpoints.

In this lesson, we will accomplish the following:

* install `@hapi/joi`
* define a schema for joi to follow
* create express middleware to validate incoming data
* return a 400 status error if invalid
* return a 200 status message if valid

### Installing Joi
Once you have installed the demonstration packagae and navigated to your project folder, install the Joi validator from the `@hapi/joi` repository:
```sh
npm install --save @hapi/joi
```
This installation method will also add Joi to your dependencies.

Now open your favorite text editor and make sure to also require the newly installed Joi repository at the top of your `./server.js` file:
```
const Joi = require(`@hapi/joi`)
```
You can now use Joi for server-side validation.

### Defining a schema
Still in your `./server.js` file, let's outline a schema for each of the form's fields:
```js
const schema = Joi.object().keys({
  firstName: Joi.string().alphanum().max(50),
  lastName: Joi.string().alphanum().max(50),
  title: Joi.string().alphanum().max(50),
  company: Joi.string().max(50),
  email: Joi.string().email(),
  preference: Joi.string(),
  notes: Joi.string().max(255)
})
```
* .string() ensures data inputted is read of type string
* .alphanum() ensures data inputted is comprised of completely alphanumeric characters
* .max([value]) ensures data inputted is less than the number of characters specified
* .email() ensures data inputted follows the `email` guidelines, including the use of valid domain structure (ie. an `@` symbol in the field.)

### Creating middleware and returning server status
Now that we've established the schema framework, let's write the actual function for checking validation.

Using Express, we use a module to pass in the data:
```js
function validateForm(req, res, next) {
 Joi.validate(req.body, schema, (err, body) => {
  if(err) {
   console.log(err)
   return res.status(400).send({error: 'bad request'})
   }
  res.status(200).send('OK')
  next()
 })
 ```
This takes the inputted data and checks for an error. If any errors are found, they are output to the console and a status is returned. Otherwise, the response sends OK and continues.

### Tying it all together
Still in `./server.js`, let's finalize this validation by including the function we just created, `validateForm`, into the existing `app.post` call:

```js
 app.post('/api', express.json(), validateForm, (req, res) => { ... }
```

Now try refreshing your server and inputting some test data.

The console should automatically output a 200 status if information is correct, or it should kick back a 400 error if the request is invalid once data is actually submitted.

### Summary

This lesson gives you a basic example of how you might use Joi to provide server-side validation to your data.

## Lesson 2: Form Validation

When building forms, it can be valuable to users to get a preemptive check of their data before submitting it to the server and let them address any errors that they may have. This pre-check not only saves the servers some work, but it allows you to provide more detailed error messages as to what may be incorrect to the end-user.

In this lesson, we will do the following:

* install yup
* define a schema for yup to follow
* validate data (in the handleSubmit function)
* trigger an error notification to display 

### Yup intro and install
Now that we've finished using Joi, we need to install Yup to our project to handle the form- and field-level validation:
```sh
npm install --save yup
```

Once installed, let's open `./src/App.svelte` to import the repository:
```svelte
import yup from 'yup'
```

### Defining the schema
Now, let's define the schema for the form- and field-level validation under the import statement in the `<script>` tag:
```svelte
let schema = yup.object().shape({
 firstName: yup.string().required(),
 lastName: yup.string().required(),
 title: yup.string(),
 company: yup.string(),
 email: yup.string().email(),
 notes: yup.string(),
 preference: yup.string().required()
})
```
This schema reiterates the schema expressed previously, but for Yup on the client-side as opposed to Joi on the server-side.

### Calling the schema
Now, in order to call the schema we just wrote, let's move down to the `//TO-DO: Validation` step at the end of the `<script>` tag:
```svelte
schema.validate(developer)
 .then(valid => {
   fetch( ... )
   ...
 })
 .catch(err => { 
   console.log(err) 
 }
 ...
</script>
```
### Creating an error message
Still in the `./src/App.svelte` file, let's create a UI element to display in case the user tries to submit invalid data:

At the top of the `<script>` with the other declarations:
```svelte
let message = ''
```

In the `.catch(err => { ... })` arrow function we just wrote:
```svelte
error = err.path
message = err.errors[0]
```

Now that the error message is set up, we have to actually display it. In the second `<section>`:
```svelte
<div class= "box">
 {#if error} 
  <div class= "notification is-danger:>
    {message}
  </div>
 </if>
 ...
```
Please note that the first `<div>` (box class) tag is already written, just replace the existing comment. 

Now save your changes. The page should automatically refresh. If any of the criteria previously described are not met, a red box should appear at the top of the form with an error message.

### Summary

Great Job! Now you have secondary protection for your data and you are providing informative information to your users without giving away vulnerable details to curious intruders.

## Lesson 3: Field Validation

What if we want to validate the information users enter into our forms as they enter it? Now that we have a solid endpoint and form validation, we can further increase the user experience by providing field-level validation using the same tools. With field-level validation, you can check data when the user moves out of focus of a given form element. This process quickly notifies users of specific problems with the data they have (or have not) entered.

In this lesson, we will do the following:

* set up field level validation state
* listen to the blur event to trigger the validation
* use yup to only validate a specific field
* show a nicely worded help message
* trigger a class to outline the element as danger to provide feedback to the user

### Setting up the validation state
Let's return to `./src/App.svelte`; underneath the `let developer{}` declaration, let's utilize the schema we created in the previous lesson to write the following function:

```svelte
function validateField(name) {
 return function() {
  error = null
  schema.validateAt(name, developer)
  .catch(err => {
   error = name
   message = err.errors[0]
  })
 }
}
```
When called, this function validates a given field for the matching value that the developer object (the client's data) gives.

### The on:blur Event Handler
Finally, let's call this function.

Below in the markup, you will see a series of labels with values matching to those in your form.

In the input field of each `<div>`, after binding the input to the matching label, add an on:blur event to call validateField when a user stops entering text into (or tabs out of) a field:

```svelte
<input id ... bind:value{dev.firstName} on:blur={validateField('firstName')} />
``` 
Copy and paste for each input, changing `firstName` for the respective field's label.

### Finishing up

Save the `./src/App.svelte` file and reopen `localhost:5000` if you closed it. You should now have a fully functioning form that will output errors at three different verification levels!

### Summary

Fantastic! We have a basic form that provides the user informative feedback to empower them to enter rich and accurate data.

## Conclusion

There are so many more things to cover on the topic of validation, but this tutorial should get you started down a path of greatness with the basics. Form validation is not the most entertaining aspect of software development, but in terms of investing time on the front end opposed to tracking down data anomolies it is incredible time spent.
