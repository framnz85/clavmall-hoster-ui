import React, { Component } from "react";
import Joi from "joi-browser";
import httpEstore from "../../services/httpEstore";
import Input from "../common/inputText";

class MigrateRequest extends Component {
  state = {
      account: {
          name: "",
          owner: "",
          email: "",
          mobile: "",
          password: "",
          repassword: "",
          urlname1: "",
      },
    errors: {},
  };

  schema = {
    name: Joi.string().min(5).max(255).required(),
    owner: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
    urlname1: Joi.string().required(),
  };

  validate = () => {
    const values = { ...this.state.account };
    delete values.mobile;
    const result = Joi.validate(values, this.schema, {
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
      const estore = await httpEstore.postEstores2(this.state.account);
      window.location = "/submitted/" + estore.data._id;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = e.response.data;
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
    document.title = "Clavstore Registration";
    const { account, errors } = this.state;

    return (
      <React.Fragment>
        <div
          className="container rounded-3"
          style={{
            width: "500px",
            padding: "40px",
            marginTop: "20px",
          }}
        >
          <div align="center" style={{
            color: "#009A57",
            fontSize: 32,
            marginBottom: "20px",
          }}>
            Clavstore Registration
          </div>
          <div align="center" style={{
            color: "#333",
            fontSize: 18,
            marginBottom: 20
          }}>
            Registration Instructions
            <button type="button" className="btn btn-primary"
              onClick={() => window.open("https://vimeo.com/739883065/b98be82fbe", '_blank', 'noopener,noreferrer')}
            >Watch Video Instruction HERE</button>
          </div>
          <form onSubmit={this.handleSubmit}>
            <Input
              value={account.name}
              onChange={this.handleChange}
              name="name"
              label="Store Name"
              error={errors.name}
            />
            <Input
              value={account.owner}
              onChange={this.handleChange}
              name="owner"
              label="Full Name"
              error={errors.owner}
            />
            <Input
              value={account.email}
              onChange={this.handleChange}
              name="email"
              label="Email"
              error={errors.email}
            />
            <Input
              value={account.mobile}
              onChange={this.handleChange}
              name="mobile"
              label="Mobile (Optional)"
            />
            <Input
              value={account.password}
              onChange={this.handleChange}
              name="password"
              label="Password"
              error={errors.password}
              type="password"
            />
            <Input
              value={account.repassword}
              onChange={this.handleChange}
              name="repassword"
              label="Re-Enter Password"
              error={errors.repassword}
              type="password"
            />
            <Input
              value={account.urlname1}
              onChange={this.handleChange}
              name="urlname1"
              label="Nominated URL Name 1"
              error={errors.urlname1}
              style={{width: "280px", float: "left", clear: "both"}}
            />
            {account.urlname1.length > 0 && <><br/>
              <div><h6>You will be given this url:</h6></div>
              <div>https://{account.urlname1}.clavstore.com</div>
              <div>https://{account.urlname1}.clavmall.com</div>
              <div>https://{account.urlname1}.etnants.com</div>
              <div style={{ clear: "both" }}></div>
            </>}
            <div
              className="d-grid gap-2 d-md-flex justify-content-md-center"
              style={{ margin: "40px 0" }}
            >
              <button type="submit" className="btn btn-success" style={{padding: "8px 30px"}}>Submit Registration</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MigrateRequest;
