import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies/movie.component";
import Customers from "./components/customers.component";
import Rentals from "./components/rentals.component";
import MovieForm from "./components/movieForm.component";
import NotFound from "./components/notFound.component";
import NavBar from "./components/navBar.component";
import LoginForm from "./components/loginForm.component";
import RegisterForm from "./components/register.component";
import Logout from "./components/logout.component";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
 state = {
  // user: {}
 };

 componentDidMount() {
  const user = auth.getCurrentUser();
  this.setState({ user });
 }
 render() {
  const { user } = this.state;
  return (
   <>
    <ToastContainer />
    <NavBar user={user} />
    <main className="container">
     <Switch>
      <Route path="/login" component={LoginForm}></Route>
      <Route path="/logout" component={Logout}></Route>
      {/* <Route
       path="/movies/:id"
       render={props => {
        if (!user) return <Redirect to="/login" />;
        return <MovieForm {...props} />;
       }}
      /> */}
      <ProtectedRoute path="/movies/:id" component={MovieForm} />

      <Route
       path="/movies"
       render={props => <Movies {...props} user={this.state.user} />}
      />
      <Route path="/customers" component={Customers}></Route>
      <Route path="/rentals" component={Rentals}></Route>
      <Route path="/register" component={RegisterForm}></Route>
      <Route path="/not-found" component={NotFound}></Route>
      {/* <Route path="/movies/:id" component={MovieForm}></Route> */}
      <Redirect exact from="/" to="/movies" />
      <Redirect to="/not-found" />
     </Switch>
    </main>
   </>
  );
 }
}

export default App;
