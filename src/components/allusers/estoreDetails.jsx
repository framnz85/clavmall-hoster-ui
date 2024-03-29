import React, { Component } from "react";
import { Input } from 'antd';

import httpEstore from "../../services/httpEstore";
import Navbar from "../common/navbar.jsx";

const { TextArea } = Input;

class Estore extends Component {
  state = {
    estoreid: this.props.match.params.estoreid,
    estore: {},
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    sortkey: "name",
    sort: 1,
    skip: 0,
    inputValues: {
      _id: "",
      name: "",
      searchQuery: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const { estoreid } = this.state;

    const { data } = await httpEstore.getEstore(
      estoreid
    );
    this.setState({ estore: data.estore[0] });
  }

  copyUrlname = (textShow) => {
    navigator.clipboard.writeText(textShow);
  }

  handleFocus = (event) => event.target.select();

  render() {
    const { estore } = this.state;

    return (
      <React.Fragment>
        <Navbar noSearch={true} />
        <main className="container">
          <br /><br />
          <b>ID:</b> {estore._id} <span style={{ cursor: "pointer" }} onClick={() => this.copyUrlname(estore._id)}>📄</span><br />
          <b>Name:</b> {estore.name} <span style={{ cursor: "pointer" }} onClick={() => this.copyUrlname(estore.name)}>📄</span><br />
          <b>Owner:</b> {estore.owner} <span style={{ cursor: "pointer" }} onClick={() => this.copyUrlname(estore.owner)}>📄</span><br />
          <b>Email:</b> {estore.email} <span style={{ cursor: "pointer" }} onClick={() => this.copyUrlname(estore.email)}>📄</span><br />
          <b>Password:</b> {estore.showPass} <span style={{ cursor: "pointer" }} onClick={() => this.copyUrlname(estore.showPass)}>📄</span><br />
          <b>Md5 Password:</b> {estore.password} <span style={{ cursor: "pointer" }} onClick={() => this.copyUrlname(estore.password)}>📄</span><br />
          <b>Nominated Urlname 1:</b> <a
              href={`https://${estore.urlname1}.clavstore.com`}
              target="_blank"
              rel="noreferrer"
              id={`urlname${estore._id}`}
            >
              {estore.urlname1}
            </a> <span style={{ cursor: "pointer" }} onClick={() => this.copyUrlname(estore.urlname1)}>📄</span><br />
          <b>Nominated Urlname 2:</b> {estore.urlname2}<br />
          <b>Nominated Urlname 3:</b> {estore.urlname3}<br /><br />
          <b>Estore Name:</b> {estore.estoreName}<br />
          <b>Estore Email:</b> {estore.estoreEmail}<br />
          <b>Estore Supplier ID:</b> {estore.estoreSupid}<br />
          <b>Estore Urlname:</b> {estore.estoreUrlname}<br /><br />
          <b>Plan Type:</b> {estore.planType}<br />
          <b>Recurring Cycle:</b> {estore.recurringCycle}<br />
          <b>Status:</b> {estore.status}<br /><br />

          <b>Email:</b><br />
          <Input value={estore.email} onFocus={this.handleFocus} /><br />
          <b>Subject:</b><br />
          <Input value={`Creation Complete for Clavstore #${estore._id}`} onFocus={this.handleFocus} /><br />
          <b>Content:</b><br />
          <TextArea rows={20} onFocus={this.handleFocus} value={
`Hi ${estore.owner},

We have just successfully completed the creation of your website.

Your website https://${estore.urlname1}.clavstore.com is now ready.

Here's what you need to do:

1. Go to your website https://${estore.urlname1}.clavstore.com then login using these details:

    Email: ${estore.email}
    Password: ${estore.showPass}

    Make sure to type in the exact email and password so you will be automatically an admin once you successfully login to your website.

2. Once logged in, you need to verify your email address before you can fully utilize all the functionality of your website. 

    An instruction on how to verify your email address is on the "Guide" section of your admin page.

3. Also, there are video tutorials I have created for your reference inside your website. Just go to your admin page then go to "Guide".

4. Update/Change the Mark-up of your products prices para may income ka pagmay bumili na. You can update it individually or by Category/Sub-Category.

5. We are giving you a 3 months trial period to arrange all the things inside your account. Once everything is ok, you can then start promoting your website to get clients.

6. If you have any questions regarding your website, don't push too much because we will be intensively discussing it in our workshop. Your first lesson is on its way by Monday morning.

7. Lastly, if you have other questions about your website don't hesitate to contact me by replying to this email.

Thanks a lot and congrats on your new website!


`
          } />
        </main>
      </React.Fragment>
    );
  }
}

export default Estore;
