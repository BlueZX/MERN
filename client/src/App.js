import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Libro from "./components/Libro";
import Navbar from './components/Navbar';
import Agregar from './components/Agregar';

class App extends Component {

  state = {
    add: false
  }

  setAdd = () => {

    this.setState({
      add: true
    });
  }

  noAdd = () => {
    
    this.setState({
      add: false
    });
  }

  render() {
    return (
      <div>
        <Paper>
          <Navbar />
          <Libro add = {this.state.add} noAdd = {this.noAdd}/>
        </Paper>
        <Agregar add = {this.setAdd}/>
      </div>);
  }
}

export default App;
