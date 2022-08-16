import React from "react";

const Input = ({ name, type, label, value, error, onChange, style }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={style}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type ? type : "text"}
        className="form-control"
        style={style}
      />
      {error && <div className="alert alert-danger" style={{clear: "both"}}>{error}</div>}
    </div>
  );
};

export default Input;
