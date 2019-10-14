import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component'; 
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
      // meaningOfLife: 47
    };
  }

  // Happen after constructor -> render -> componentDidMount(API calls should happen here)
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  handleChange = (e) => {
    this.setState(
      { searchField: e.target.value }, 
      // Add second params for access async setState action result
      ()=> console.log(this.state)
    )
  }

  // handleChange = (e) => {
  //   // below function is better to use if this.state... is used for calculation
  //   this.setState((prevState, prevProps) => {
  //      return { meaningOfLife: prevState.meaningOfLife + 1}
  //    }, 
  //     ()=> console.log(this.state)
  //   )
  // }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase())
    });
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox 
          placeholder='search monster' 
          handleChange={this.handleChange}/>
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;
