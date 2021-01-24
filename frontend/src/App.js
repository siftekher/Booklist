
import React from 'react';
//import './App.css';
import Home from './components/Home';
import Books from './components/Books';
import BookEdit from './components/BookEdit';
import Authorlist from './components/Authorlist';
import Authoradd from './components/Authors';
import AuthorsEdit from './components/AuthorsEdit';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Books">
            <Books />
          </Route>
          <Route path="/BooksEdit/:id">
            <BookEdit />
          </Route>
          <Route path="/Authors">
            <Authorlist />
          </Route>
          <Route path="/Authorsadd">
            <Authoradd />
          </Route>
          <Route path="/AuthorsEdit/:id">
            <AuthorsEdit />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;