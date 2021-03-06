import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'
import Home from './Home';
import DynamicPage from './DynamicPage';
import Submit from './Submit';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import LoginForm from './login-form';
import Signup from './sign-up'
import First from './First';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn : false,
      username : null
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('http://localhost:8000/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
  return (
    <Router>
      <div>
        <NavBar active = 'feed' updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Switch>
          <Route exact path="/" component={First} loggedIn={this.state.loggedIn} />
          <Route exact path="/home" render = {() => <Home loggedIn={this.state.loggedIn} /> } />
          <Route exact path="/profile" render ={ () => <DynamicPage loggedIn={this.state.loggedIn} /> } />
          <Route exact path="/submit" render = { () => <Submit loggedIn={this.state.loggedIn} /> } />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
  }
};

export default App;
