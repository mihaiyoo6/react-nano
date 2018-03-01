import React, { Component } from 'react';
import PropTypes from 'prop-types';
import excapeRegEx from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }
  updateQuery = (value) => {
    this.setState({ query: value });
  }
  clearQuery = () => {
    this.updateQuery('');
  }
  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;
    let showingContacts = [];
    if (query) {
      const match = new RegExp(excapeRegEx(query), 'i');
      showingContacts = contacts.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contacts
    }
    showingContacts.sort(sortBy('name'));
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            type="text"
            className="search-contacts"
            value={query}
            onChange={event => this.updateQuery(event.target.value)} />
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className='contact-list' >
          {
            showingContacts.map(contact => (
              <li key={contact.id} className='contact-list-item'>
                <div className='contact-avatar' style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }} />
                <div className="contact-details">
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button
                  className="contact-remove"
                  onClick={() => onDeleteContact(contact)} >
                  Remove
						</button>
              </li>
            ))
          }
        </ol>
      </div>
    )
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}
