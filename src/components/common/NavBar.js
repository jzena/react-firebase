import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink, withRouter, Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import logo from '../../assets/logo.png';

class NavBar extends Component {

    state = {
        showMenu:false,
        isStaff:false
    };

    componentWillMount(){
        const isStaff = localStorage.getItem("isStaff");
        console.log(isStaff);
        if(isStaff) this.setState({isStaff});
    }

    toggleMenu = () => {
        this.setState({showMenu:!this.state.showMenu});
    };

    render() {
        const {showMenu, isStaff} = this.state;
        return (
            <div>
                <nav className="nav-bar">
                    <div>
                        <Link to="/">
                             <img src={logo} alt="logo"/>
                        </Link>
                        <span>FirebaseMx</span>
                        <span className="alpha">Versión Alpha</span>
                    </div>
                    <div className={showMenu ? "show-menu":"noshow-menu"}>
                        {isStaff &&
                        <NavLink
                            activeStyle={styles.active}
                            onClick={this.toggleMenu}
                            to="/admin">
                            Admin
                        </NavLink>

                        }
                        <NavLink
                            activeStyle={styles.active}
                            onClick={this.toggleMenu}
                            to="/courses">
                            Cursos
                        </NavLink>
                        <NavLink
                            exact
                            activeStyle={styles.active}
                            onClick={this.toggleMenu}
                            to="/">
                            Blog
                        </NavLink>
                        <Link
                            onClick={this.toggleMenu}
                            to="/login">
                            <FontAwesome
                                name="user-circle-o"
                            />
                            Cuenta
                        </Link>
                    </div>
                    <FontAwesome
                        name="bars"
                        onClick={this.toggleMenu}
                        className="menu-button" />
                </nav>
            </div>
        );
    }
}

const styles = {
    active:{
        backgroundColor:"lightgrey",
        borderRadius:5
    }
};

function mapStateToProps(state, ownProps) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(dispatch)
    };
}

export default NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));