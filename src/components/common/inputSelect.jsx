import React from "react";

const Select = ({ name, label, options, value, error, onChange, style }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} style={style}>
        {label}
      </label>
      <select
        className="form-control"
        name={name}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled hidden>
          - choose -
        </option>
        {options.map((option) => (
          <option key={option.desc} value={option.desc}>
            {option.desc}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
