import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCaretDown, faCaretUp, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import * as actionsCreators from '../../store/actions/index';
import logo from '../../Assets/Images/Project/logo.png'

class Header extends Component {

  state = {
    menuActive: false
  }

  onLogout = () => {
    this.props.onLogout( { isAuth: false } );
    this.props.onUpdateFormState( {} );
    localStorage.removeItem('userToken');
  }

  onMenuClick = () => {
    this.setState( state => { 
      return { menuActive: !state.menuActive } 
    })
  }

  render() {    

    let menuClasses = ['header__user--menu']
    if ( this.state.menuActive )
      menuClasses.push('header__user--menu-active')

    let dropdown = (
      <div className='header__user' onClick={this.onMenuClick}>
        <h4 className='header__user--username'>
          <FontAwesomeIcon icon={faUserCircle} size='lg'/> 
          {this.props.user.username}
          <FontAwesomeIcon icon={this.state.menuActive ? faCaretUp : faCaretDown}/>
        </h4>
        <nav className={menuClasses.join(' ')}>
          <div className='header__user--menu__info'>
            <p className='header__user--menu__info--name'>{this.props.user.name}</p>
            <p className='header__user--menu__info--email'>{this.props.user.email}</p>
          </div>
          <NavLink className='header__user--menu__edit' to='/editOwnUser' >Edit User</NavLink>
          <p className=''>Change Password</p>
          <p className='header__user--menu__logout' onClick={this.onLogout}>
            Logout
            <FontAwesomeIcon icon={faSignOutAlt}/>
          </p>
        </nav>
      </div>
    )

    return (
      <div className='header'>      
        <img src={logo} alt='logo' className='header__logo' />
        <p className='header__title'>{this.props.headerTitle}</p>
        { this.props.user.username ? dropdown : null }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    headerTitle: state.headerTitle.title,
    user: state.auth.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: payload => dispatch(actionsCreators.login( payload )),    
    onUpdateFormState: payload => dispatch( actionsCreators.updateFormState( payload ) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);