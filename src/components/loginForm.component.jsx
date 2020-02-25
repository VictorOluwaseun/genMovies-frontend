import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form.common";
import auth from "./../services/authService";

class LoginForm extends Form {
 //  username = React.createRef();
 state = {
  data: { username: "", password: "" },
  errors: {}
 };

 //  componentDidMount() {
 //   this.username.current.focus();
 //  }

 //A schema should not be part of the state because it not supposed to change
 schema = {
  username: Joi.string()
   .required()
   .label("Username"),
  password: Joi.string()
   .required()
   .label("Password")
 };

 doSubmit = async () => {
  try {
   const { data } = this.state;
   await auth.login(data.username, data.password);

   const { state } = this.props.location;
   window.location = state ? state.from.pathname : "/";
  } catch (ex) {
   if (ex.response && ex.response.status === 400) {
    const errors = { ...this.state.errors };
    errors.username = ex.response.data;
    this.setState({ errors });
   }
  }
 };

 //  validateProperty = ({ name, value }) => {
 //   // if (name === "username") {
 //   if (value.trim() === "")
 //    return `${name[0].toUpperCase() + name.slice(1)} is required.`;
 //   //.. other rules
 //   // }
 //   // if (name === "password") {
 //   //  if (value.trim() === "") return "Password is required.";
 //   //  //.. other rules
 //   // }
 //  };

 render() {
  if (auth.getCurrentUser()) return <Redirect to="/" />;
  return (
   <div>
    <h1>Login</h1>
    <form onSubmit={this.handleSubmit}>
     {this.renderInput("username", "Username")}
     {this.renderInput("password", "Password", "password")}
     {this.renderButton("Login")}
    </form>
   </div>
  );
 }
}

export default LoginForm;

/* <Input
      // autoFocus
      name="username"
      value={data.username}
      label="Username"
      error={errors.username}
      onChange={this.handleChange}
     />
     <Input
      name="password"
      value={data.password}
      label="Password"
      error={errors.password}
      onChange={this.handleChange}
     /> */

/* 
<div>
<form onSubmit={this.handleSubmit}>
     <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
       autoFocus
       name="username"
       value={data.username}
       onChange={this.handleChange}
       ref={this.username}
       type="text"
       id="username"
       className="form-control"
      />
     </div>
     <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
       type="text"
       name="password"
       onChange={this.handleChange}
       value={data.password}
       id="password"
       className="form-control"
      />
     </div>
     <button className="btn btn-primary">Login</button>
    </form>
   </div> */

//  validate = () => {
//   const options = {
//    abortEarly: false
//   };
//   const { error } = Joi.validate(this.state.data, this.schema, options); //Joi stops as soon as it finds error, it's called abort early

//   if (!error) return null;

//   const errors = {};
//   //To map array into an object
//   // errors.result.error.details[0];

//   for (let item of error.details) {
//    //Use reduce
//    errors[item.path[0]] = item.message;
//   }
//   return errors;

//   // console.log(result);

//   // const errors = {};

//   // const { data } = this.state;
//   // if (data.username.trim() === "") errors.username = "Username is required.";
//   // if (data.password.trim() === "") errors.password = "Password is required.";

//   // return Object.keys(errors).length === 0 ? null : errors;
//  };

//  validateProperty = ({ name, value }) => {
//   const obj = { [name]: value };
//   // const schema = {
//   //  [name]: Joi.string()
//   //   .required()
//   //   .label(name[0].toUpperCase() + name.slice(1))
//   // };
//   const schema = {
//    [name]: this.schema[name]
//   };
//   const { error } = Joi.validate(obj, schema);
//   return error ? error.details[0].message : null;
//  };
