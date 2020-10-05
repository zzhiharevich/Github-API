import React, { Component } from 'react';
import Repositories from './components/Repositories/Repositories';
import axios from './axios';
import './App.css';

class App extends Component {

  state = {
    inputValue: '',
    isValid: false,
    repositories: null,
    error: null
  }

  inputChangedHandler = (e) => {
    const isValid = this.inputValidation(e.target.value);
    this.setState({ inputValue: e.target.value, isValid: isValid });
  }

  inputValidation = (value) => {
    let isValid = false;
    if (value.trim() !== '') {
      isValid = true;
    }
    return isValid;
  }

  submitForm = (e) => {
    e.preventDefault();
    axios.get(`/repositories?q=${this.state.inputValue}+in%3Aname&sort=stars&order=desc&per_page=10`)
      .then(response => {
        let repositories = [];
        response.data.items.map((repo) => {
          let repInfo = {
            id: repo.id,
            name: repo.full_name,
            url: repo.clone_url,
            language: repo.language,
            stars: repo.stargazers_count,
            owner: repo.owner.login
          }
          repositories.push(repInfo);
        });

        this.setState({ repositories: repositories, inputValue: '', isValid: false })
      })
      .catch(error => {
        this.setState({ error: error, inputValue: '', isValid: false })
      })
  }

  render() {

    let repositories = null;
    if (this.state.repositories) {
      repositories = <Repositories repos={this.state.repositories} />;
    }

    let error = null;
    if (this.state.error) {
      error = <p>Something went wrong. Please try again</p>
    }

    return (
      <>
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.inputChangedHandler}
            placeholder="Repositories name..."
            className={'Input'} />
          <button
            type="submit"
            disabled={!this.state.isValid}
            className={'Button'}>Search</button>
        </form>
        {error}
        {repositories}
      </>
    );
  }
}

export default App;
