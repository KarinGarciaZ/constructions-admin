import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

import Home from '../../Containers/Home';
import CreateConstruction from '../../Containers/CreateConstruction';
import Construction from '../../Containers/Construction';
import EditOwnUser from '../../Containers/EditOwnUser';
import AddUser from '../../Containers/AddUser';
import EditConstruction from '../../Containers/EditConstruction';
import AllConstructions from '../../Containers/AllConstructions';
import Types from '../../Containers/Types';

class MainLayout extends Component {

  render() {
    console.log('render mainlayout')

    return (
      <div className='main-layout'>
        <Switch>
          <Route path="/construction/:id" component={Construction}/>
          <Route path="/editConstruction/:id" component={EditConstruction}/>
          <Route path="/construction" component={Construction}/>
          <Route path="/editConstruction" component={EditConstruction}/>
          <Route path="/allConstructions" component={AllConstructions}/>
          <Route path="/createConstruction" component={CreateConstruction}/>
          <Route path="/editOwnUser" component={EditOwnUser}/>
          <Route path="/addUser" component={AddUser}/>
          <Route path="/types" component={Types}/>
          <Route path="/" component={Home}/>
        </Switch> 
      </div>
    )
  }
}

export default MainLayout;