import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionsCreators from '../store/actions/index';

import Footer from  '../Components/Layout/Footer';
import Sidebar from  '../Components/Layout/Sidebar';
import Header from  '../Components/Layout/Header';
import MainLayout from  '../Components/Layout/MainLayout';
import Login from '../Containers/Login';
import Aux from '../hoc/Auxiliar';
import Loading from '../Components/Layout/Loading';
import axios from '../axios-connection';

class Layout extends Component {

  state = {
    render: ''
  }

  componentWillMount() {
    this.renderAccess()
  }

  componentWillUpdate() {
    console.log('will update');
    this.renderAccess()
  }

  shouldComponentUpdate( nextProps, nextState ) {
    console.log('nextProps: ', nextProps);
    if ( this.props.isAuth === nextProps.isAuth && this.state.render === nextState.render )
      if( this.props.location.pathname === nextProps.location.pathname && this.props.match.params === nextProps.match.params )
        return false;
    return true;
  }

  renderAccess = () => {
    let containerToRender = '';

    if ( this.props.isAuth && localStorage.getItem('userToken') ){
      console.log('Tiene token y auth');
      containerToRender = 'Aux';

    } else if ( localStorage.getItem('userToken') && !this.props.isAuth ) {
      axios.get( 'auth/getUserByToken', {headers: {authorization: localStorage.getItem('userToken')}} )
      .then( resp => {
        if ( !this.props.isAuth ) {
          resp.data.isAuth = true;
          this.props.onLogin( resp.data );
        }
        containerToRender = 'Aux';
      })
      .catch( err => {
        containerToRender = 'Login'        
      })
      .finally( fin => {
        if( this.state.render !== containerToRender )  
        this.setState({render: containerToRender})
      })
    }
    else 
      containerToRender = 'Login'
      
    if( this.state.render !== containerToRender )      
      this.setState({render: containerToRender})
  }

  render() {
    console.log('RENDER LAYOUT');

    let renderContainer = <Loading />;    

    if ( this.state.render === 'Login' )
      renderContainer = <Login />

    if ( this.state.render === 'Aux' )
      renderContainer = (
        <Aux>
          <Sidebar />
          <MainLayout />
        </Aux>
      )

    return (
      <div className='container'>
        <Header />
          {renderContainer}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.userInfo.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: payload => { dispatch(actionsCreators.login( payload )) }    
  }
}


export default withRouter(connect( mapStateToProps, mapDispatchToProps )(Layout));