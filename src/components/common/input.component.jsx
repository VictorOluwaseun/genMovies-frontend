import React from "react";

// const Input = ({ name, label, value, type, error, onChange }) => {
const Input = ({ name, label, error, ...otherProps }) => {
 return (
  <div className="form-group">
   <label htmlFor={name}>{label}</label>
   <input
    // autoFocus
    {...otherProps}
    name={name}
    // ref={this.username}
    id={name}
    className="form-control"
   />
   {error && <div className="alert alert-danger">{error}</div>}
  </div>
 );
};

export default Input;
