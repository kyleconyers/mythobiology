// import React from 'react'
// import Body from '../pages/Body';
import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
// import Card from "../components/Card";
// import Form from "../components/Form";
// import Book from "../components/Book";
// import Footer from "../components/Footer";
// import API from "../utils/API";
// import { Col, Row, Container } from "../components/Grid";
// import { List } from "../components/List";


// TODO - add proptypes

const Home = props => {
console.log(props)
	if (props.user) {
		return (

			<div className="Home">
				<p>Current User:</p>
				<code>
					
					{JSON.stringify(props)}
				</code>
			</div>
		)
	} 
	else {
		return (
			<div className="Home">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
			</div>
		)
	}


}

export default Home
