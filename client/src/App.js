// import React, { Component } from 'react'
import axios from 'axios'
// import { Route, Link } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
// import Header from './components/Header'
import Home from './components/Home'
// import Body from './pages/Body';
import React, { Component } from "react";
// import Jumbotron from "./components/Jumbotron";
import Card from "./components/Card";
import Form from "./components/Form";
// import Book from "./components/Book";
import Footer from "./components/Footer";
// import API from "./utils/API";
import { Col, Row, Container } from "./components/Grid";
// import { List } from "./components/List";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from './components/Nav'
import NavBar from './components/NavBar'
import Wrapper from './components/Wrapper'
// import LeftSideBar from './components/LeftSideBar'

// import Board from './components/Board'
// import Message from './components/Message'
// import MessageList from './components/MessageList'
// import Board from './components/Board'
// import CenterBody from './components/CenterBody'



const DisplayLinks = props => {
	if (props.loggedIn) {
		return (

			
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li>
						<Link to="#" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							sign up
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
			// q: ""
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				{/* <h1>This is the main App component</h1>			 */}

				<NavBar className="navBar">
				<Nav>
					{/* <Header user={this.state.user} /> */}
				</Nav>{/* LINKS to our different 'pages' */}
								<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />

				</NavBar>

				

				{/* <Wrapper className="wrapper"> */}
			    {/* <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} /> */}


				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				<Route exact path="/" render={() => <Home user={this.state.user} />} />
				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route exact path="/signup" component={SignupForm} />
				{/* <LoginForm _login={this._login} /> */}

				<Switch>
				{/* <Route exact path="/" component={Home} /> */}
				<Route exact path="/saved" component={Saved} />
				<Route exact path="/nomatch" component={NoMatch} />
				</Switch>
				
		<Container>
        <Row>
          <Col size="md-12">
		  
            {/* <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron> */}
          </Col>
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row> */}
        <Footer />
     
	  </Container>
	  {/* </Wrapper> */}

			</div>
		)
	}
}

export default App
