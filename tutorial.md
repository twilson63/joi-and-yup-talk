# Form validation with Yup and Joi

This is a short tutorial that covers the basics of field validation, form validation and server data validation using Yup and Joi.

## Objectives

The objective of this tutorial is to walk you through three areas where validation is important and should be leveraged to recieve quality data from your user base.

Upon completion of this tutorial, you should have a basic understanding of the integration points for schema validation in an application, and how to leverage tools like Yup and Joi to create strong validation support for you applications.

* Server-Side Validation
* Form Level Validation
* Field Level Validation

## Requirements

* NodeJS
* git

## Install demo

```sh
npx degit twilson63/joi-and-yup-talk tutorial
cd tutorial/demo
npm install
```

## Lesson 1: ServerSide Validation

All data should be validated at the server-side once received from an endpoint, and it should return errors when the data is not valid. `@hapi/joi` provides a solid toolkit to create validation middleware for your api endpoints.

In this lesson, we will accomplish the following:

* install `@hapi/joi`
* define a schema
* create express middleware to validate incoming data
* return a 400 error if invalid
* return a 200 error if valid

### Summary

This lesson gives you a basic example of how you might want to tackle validating server-side data to increase the quality of the data being added to your system.

## Lesson 2: Form Validation

When building forms, it can be verify valuable to users to get a pre-emtive check of their data before submitting to the server, and let them address any errors that they may have. This pre-check saves some effort on the servers, but it allows you to provide more detailed error messages.

In this lesson, we will do the following:

* install yup
* define a schema
* in the handleSubmit function validate data
* trigger the error notification to display 

### Summary

Great Job! Now you have double protection for you data and you are providing informative information to your users, without giving away vunerable details to curious intruders.

## Lesson 3: Field Validation

Now that we have a solid endpoint and form validation, we can take the user experience to the next level and provide field level validation using the same tools. With field level validation you want to quickly perform a validation when the user moves out of focus of a given form element. This process can present the user with a clean visual that they have a problem with the data in that particular field.

In this lesson, we will do the following:

* setup field level validation state
* listen to the blur event to trigger the validation
* use yup to only validate a specific field
* show a nicely worded help message
* trigger a class to outline the element as danger to provide feedback to the user.

### Summary

Fantastic! We have a basic form giving the user the feedback they need when they need it to empower them to enter rich and accurate information.

## Conclusion

There are so many more things to cover with the topic of validation, but this tutorial should get you started down a path of greatness with the validation basics. Form validation is not the most entertaining aspects of software development, but in terms of time investment up front opposed to tracking down data anomolies it is incredible time spent.

 
