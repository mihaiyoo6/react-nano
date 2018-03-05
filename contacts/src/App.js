import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreactContact';
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
  createContact = contact => {
    ContastsAPI.create(contact).then(() => {
      this.setState({ contacts: this.state.contacts.concat([contact]) });
    })
  }
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact} />
        )} />
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact);
              history.push('/');
            }} />
        )} />
      </div>
    );
  }
}

export default App;
