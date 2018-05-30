import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './Landing'
import HotelDetail from './HotelDetail'
import Confirmation from './Confirmation'
import Admin from './Admin'
import Nav from './Nav'

class App extends Component {
  render() {
    return (
      <section>
        <Nav />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/hotel/:hotelID' component={HotelDetail} />
            <Route path='/confirmation/:bookID' component={Confirmation} />
            <Route path='/admin' component={Admin} />
          </Switch>
        </BrowserRouter>
      </section>
    )
  }
}

export default App
