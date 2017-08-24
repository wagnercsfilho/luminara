import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import Icon from 'react-icons-kit';
import { menu } from 'react-icons-kit/entypo/menu';
import { outlined } from 'react-icons-kit/entypo/outlined';
import { Link } from 'react-router-dom'

class App extends Component {

  state = {
    isMenuOpen: false
  }

  componentWillMount() {
    this._isMenuOpen = this._isMenuOpen.bind(this);
    this._openFavoriteScreen = this._openFavoriteScreen.bind(this);
    this._openMenu = this._openMenu.bind(this);
  }

  _isMenuOpen(state) {
    this.setState({ isMenuOpen: state.isOpen });
    return state.isOpen;
  }

  _renderMenu() {
    return (
      <Menu onStateChange={this._isMenuOpen} customBurgerIcon={false} isOpen={this.state.isMenuOpen} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
        <a className="menu-item" href="/">Home</a>
        <a className="menu-item" href="/favorites">Favorites</a>
        <br/><br/><br/>
        <a className="menu-item" href="https://github.com/wagnercsfilho/luminara">Github Project</a>
        <a className="menu-item" href="https://twitter.com/wagnercsfilho">Twitter</a>
        <a className="menu-item" href="https://www.linkedin.com/in/wagnercsfilho/" >Linkedin</a>
      </Menu>
    )
  }

  _openMenu() {
    this.setState({ isMenuOpen: true })
  }

  _openFavoriteScreen() {
    window.location.href = '/favorites';
  }

  render() {
    return (
      <div className="page-container" id="outer-container">
        {this._renderMenu()}
        <main id="page-wrap">
          <div className="toolbar">
            <div className="toolbar__button" onClick={this._openMenu}>
              <Icon size={28} icon={menu} />
            </div>
            <div className="toolbar__title">
              Luminara
            </div>
            <div className="toolbar__button" onClick={this._openFavoriteScreen}>
              <Icon size={28} icon={outlined} />
            </div>
          </div>
          {this.props.children}
        </main>
      </div>
    )
  }

}

export default App;
