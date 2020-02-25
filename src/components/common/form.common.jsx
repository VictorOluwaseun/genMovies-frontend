import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input.component";
import Select from "./select.common";

class Form extends Component {
 state = {
  data: {},
  error: {}
 };

 validate = () => {
  const options = {
   abortEarly: false
  };
  const { error } = Joi.validate(this.state.data, this.schema, options); //Joi stops as soon as it finds error, it's called abort early

  if (!error) return null;

  const errors = {};
  //To map array into an object
  // errors.result.error.details[0];

  for (let item of error.details) {
   //Use reduce
   errors[item.path[0]] = item.message;
  }
  return errors;

  // console.log(result);

  // const errors = {};

  // const { data } = this.state;
  // if (data.username.trim() === "") errors.username = "Username is required.";
  // if (data.password.trim() === "") errors.password = "Password is required.";

  // return Object.keys(errors).length === 0 ? null : errors;
 };

 validateProperty = ({ name, value }) => {
  const obj = { [name]: value };
  // const schema = {
  //  [name]: Joi.string()
  //   .required()
  //   .label(name[0].toUpperCase() + name.slice(1))
  // };
  const schema = {
   [name]: this.schema[name]
  };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
 };

 handleSubmit = e => {
  e.preventDefault();

  const errors = this.validate();

  this.setState({ errors: errors || {} });
  if (errors) return;

  // console.log("Submitted");
  // //Call the server This is moved to doSubmit since is only the upper part that is reusable
  this.doSubmit();
  // const username = this.username.current.value;
  // const username = this.username.current.focus();
  //The use of ref: sometimes you want to manage to focus of an input field, you really want to get reference to that elelment, maybe you want to work with animation or some dom libraries. It is ok to use ref. Don't overuse them
 };

 handleChange = ({ currentTarget: input }) => {
  const errors = { ...this.state.errors };
  // const errors = this.validate(); this cannot be used because we want to do only for current field
  const errorMessage = this.validateProperty(input);
  if (errorMessage) errors[input.name] = errorMessage;
  else delete errors[input.name];

  const data = { ...this.state.data };
  // data.username = e.target.value;
  // data.username = e.currentTarget.value;
  data[input.name] = input.value;
  this.setState({ data, errors });
 };

 renderButton(label, action = this.validate()) {
  return (
   <button type="submit" className="btn btn-primary" disabled={action}>
    {label}
   </button>
  );
 }

 renderSelect(name, label, options) {
  const { data, errors } = this.state;

  return (
   <Select
    name={name}
    value={data[name]}
    label={label}
    options={options}
    onChange={this.handleChange}
    error={errors[name]}
   />
  );
 }

 renderInput(name, label, type = "text") {
  const { data, errors } = this.state;
  return (
   <Input
    // autoFocus
    type={type}
    name={name}
    value={data[name]}
    label={label}
    error={errors[name]}
    onChange={this.handleChange}
   />
  );
 }
}

export default Form;
