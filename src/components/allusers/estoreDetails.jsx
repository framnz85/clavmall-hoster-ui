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

  render() {
    const { estore } = this.state;

    return (
      <React.Fragment>
        <Navbar noSearch={true} />
        <main className="container"><br /><br />
          <b>ID:</b> {estore._id}<br />
          <b>Name:</b> {estore.name}<br />
          <b>Owner:</b> {estore.owner}<br />
          <b>Email:</b> {estore.email}<br />
          <b>Password:</b> {estore.showPass}<br />
          <b>Md5 Password:</b> {estore.password}<br />
          <b>Nominated Urlname 1:</b> {estore.urlname1}<br />
          <b>Nominated Urlname 2:</b> {estore.urlname2}<br />
          <b>Nominated Urlname 3:</b> {estore.urlname3}<br /><br />
          <b>Estore Name:</b> {estore.estoreName}<br />
          <b>Estore Email:</b> {estore.estoreEmail}<br />
          <b>Estore Supplier ID:</b> {estore.estoreSupid}<br />
          <b>Estore Urlname:</b> {estore.estoreUrlname}<br /><br />
          <b>Plan Type:</b> {estore.planType}<br />
          <b>Recurring Cycle:</b> {estore.recurringCycle}<br />
          <b>Status:</b> {estore.status}<br /><br />

          <b>Subject:</b><br />
          <Input value={`Creation Complete for Clavstore #${estore._id}`} /><br />
          <b>Content:</b><br />
          <TextArea rows={20} value={
`Hi ${estore.owner},

We have just successfully completed the creation of your website.

Your website https://${estore.urlname1}.clavstore.com is now ready.

Here's what you need to do:

1. Go to your website https://${estore.urlname1}.clavstore.com then login using these details:

Email: ${estore.email}
Password: ${estore.showPass}

Make sure to type in the exact email and password so you will be automatically an admin once you successfully login to your website.

2. There is a video tutorial I have created for your reference inside your website. Just go to your admin page then go to "Guide".

3. Update/Change the Mark-up of your products prices para may income ka pagmay bumili na. You can update it individually or by Category/Sub-Category.

4. We are giving you a 3 months trial period to arrange all the things inside your account. Once everything is ok, you can then start promoting your website to get clients.

5. If you have any questions regarding your website, don't push too much because we will be intensively discussing it in our workshop. Your first lesson is on its way by Monday morning.

6. Lastly, if you have other questions about your website don't hesitate to contact me by replying to this email.

Thanks a lot and congrats on your new website!


`
          } />
        </main>
      </React.Fragment>
    );
  }
}

export default Estore;
