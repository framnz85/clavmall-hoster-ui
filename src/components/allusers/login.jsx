import React, { Component } from "react";
import Joi from "joi-browser";
import companyMainLogo from "../../images/clavmallmain.png";
import httpHostusers from "../../services/httpHostusers";
import Input from "../common/inputText";

class LoginForm extends Component {
  state = {
    account: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details)
      if (!errors[item.path[0]]) errors[item.path[0]] = item.message;

    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    try {
      await httpHostusers.postHostAuth(this.state.account);
      window.location = "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = e.response.data;
        errors.password = e.response.data;
        this.setState({ errors });
      }
    }
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <React.Fragment>
        <div
          className="container rounded-3"
          style={{
            width: "500px",
            backgroundColor: "#009A57",
            padding: "40px",
            marginTop: "100px",
          }}
        >
          <div align="center">
            <img src={companyMainLogo} alt="Clavmall Main" />
          </div>
          <form onSubmit={this.handleSubmit}>
            <Input
              value={account.email}
              onChange={this.handleChange}
              name="email"
              label="Email"
              error={errors.email}
              style={{ color: "#ffffff" }}
            />
            <Input
              value={account.password}
              onChange={this.handleChange}
              name="password"
              label="Password"
              error={errors.password}
              style={{ color: "#ffffff" }}
            />
            <div
              className="d-grid gap-2 d-md-flex justify-content-md-end"
              style={{ marginTop: "20px" }}
            >
              <button className="btn btn-outline-light">Login</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
