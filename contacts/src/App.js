import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContastsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContastsAPI.getAll().then(contacts => this.setState({ contacts }));
  }
  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));
    ContastsAPI.remove(contact);
  }
  render() {
    return (
      <div className="App">
        <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact} />
      </div>
    );
  }
}

export default App;
