import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Container } from './components/Container/Container';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Notification } from './components/Notification/Notification';
import { Input } from './components/Input/Input';

import { H1Styled, H2Styled } from './App.styles';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLowerCase()),
    );
  };

  addContact = newContact => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
      )
    ) {
      alert(
        'You have contact with this name, please remove old contact and create new',
      );
      return;
    }

    this.setState({
      contacts: [newContact, ...this.state.contacts],
    });
  };

  removeContact = data => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== data),
    }));
  };

  changeFilterValue = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const contacts = this.getContacts();

    return (
      <Container>
        <H1Styled>PhoneBook</H1Styled>
        <H2Styled>Add contact</H2Styled>
        <ContactForm onSubmit={this.addContact} />

        <H2Styled>Contacts</H2Styled>
        {this.state.contacts.length > 0 ? (
          <>
            {/* Filter */}
            <Input
              id={uuidv4()}
              label={'Find contacts by name'}
              placeholder={'Boris Britva'}
              name={'search'}
              value={this.state.filter}
              onChange={this.changeFilterValue}
            />

            <ContactList
              contacts={contacts}
              onRemoveContact={this.removeContact}
            />
          </>
        ) : (
          <Notification text={'You don`t have any contacts'} />
        )}
      </Container>
    );
  }
}

export default App;
