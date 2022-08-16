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
          password: "",
          repassword: "",
          urlname1: "",
          urlname2: "",
          urlname3: "",
          estoreName: "",
          estoreEmail: "",
          estoreSupid: "",
          estoreUrlname: "",
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
    urlname2: Joi.string().required(),
    urlname3: Joi.string().required(),
  };

  validate = () => {
    const values = {...this.state.account};
    delete values.estoreEmail;
    delete values.estoreName;
    delete values.estoreSupid;
    delete values.estoreUrlname;
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
    
    if (this.state.account.estoreName === ""
      && this.state.account.estoreEmail === ""
      && this.state.account.estoreSupid === ""
      && this.state.account.estoreUrlname === "") {
      this.setState({ errors: { estoreInfo: "Requires at least one of these fields" } })
      return;
    }

    try {
      const estore = await httpEstore.postEstores(this.state.account);
      window.location = "/migratesubmitted/" + estore.data._id;
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
            eStore to Clavstore
          </div>
          <div align="center" style={{
            color: "#333",
            fontSize: 18,
          }}>
            Migration Request Form (New Platform Info)
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
            /><div style={{float: "left"}}>.clavstore.com</div>
            <Input
              value={account.urlname2}
              onChange={this.handleChange}
              name="urlname2"
              label="Nominated URL Name 2"
              error={errors.urlname2}
              style={{width: "280px", float: "left", clear: "both"}}
            /><div style={{float: "left"}}>.clavmall.com</div>
            <Input
              value={account.urlname3}
              onChange={this.handleChange}
              name="urlname3"
              label="Nominated URL Name 3"
              error={errors.urlname3}
              style={{width: "280px", float: "left", clear: "both"}}
            /><div style={{float: "left"}}>.etnants.com</div>
            <div style={{clear: "both"}}></div>
            <div align="center" style={{
              color: "#333",
              fontSize: 18,
              marginTop: "30px",
            }}>
              eStore Information (Old Platform Info)
            </div>
            <Input
              value={account.estoreName}
              onChange={this.handleChange}
              name="estoreName"
              label="Full Name"
              error={errors.estoreInfo}
            />
            <Input
              value={account.estoreEmail}
              onChange={this.handleChange}
              name="estoreEmail"
              label="Email"
              error={errors.estoreInfo}
            />
            <Input
              value={account.estoreSupid}
              onChange={this.handleChange}
              name="estoreSupid"
              label="Supplier ID"
              error={errors.estoreInfo}
            />
            <Input
              value={account.estoreUrlname}
              onChange={this.handleChange}
              name="estoreUrlname"
              label="eStore Url Name"
              error={errors.estoreInfo}
            />
            <div
              className="d-grid gap-2 d-md-flex justify-content-md-center"
              style={{ margin: "40px 0" }}
            >
              <button type="submit" className="btn btn-success" style={{padding: "8px 30px"}}>Submit Request</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MigrateRequest;
