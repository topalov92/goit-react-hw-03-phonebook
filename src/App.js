import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import Form from "./Form/Form.js";
import ContactList from "./ContactLIst/ContactList.js";
import Filter from "./Filter/Filter.js";

export default class App extends Component {
  static defaultProps = {
    contacts: [
      { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
      { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
      { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
      { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
    ],
  };

  state = {
    contacts: [...this.props.contacts],
    filter: "",
  };

  addContact = (data) => {
    this.setState({
      contacts: [data, ...this.state.contacts],
    });
  };

  changeFilter = (ev) => {
    this.setState({
      filter: ev.currentTarget.value,
    });
  };

  visibleItems = () => {
    const { contacts } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = (contactID) => {
    // console.log(contactID)
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactID
      ),
    }));
  };
  render() {
    const { filter } = this.state;
    const { changeFilter, addContact } = this;
    return (
      <>
        <Form addContactItem={addContact} contacts={this.state.contacts} />
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          itemsRender={this.visibleItems()}
          deleteItem={this.deleteContact}
        />
      </>
    );
  }
}
