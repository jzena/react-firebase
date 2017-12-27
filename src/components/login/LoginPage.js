import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {LoginPageDisplay} from './LoginPageDisplay';

//userActions
import {loginWithFacebook, loginWithEmail} from "../../redux/actions/userActions";


class LoginPage extends Component {

    state = {
        auth:{
            password:'',
            email:''
        }
    };

    componentWillMount(){
        if(localStorage.getItem("user")) this.props.history.push("/profile");
    }

    onFormChange = (e) => {
        const value = e.target.value;
        const field = e.target.name;
        let {auth} = this.state;
        auth[field] = value;
        this.setState({auth});
    };

    loginWithEmail = (e) => {
        e.preventDefault();
        this.props.loginWithEmail(this.state.auth)
            .then(()=>{
                this.props.history.push("/profile")
            });
    };

    loginWithFacebook = () => {
        this.props.loginWithFacebook()
            .then(()=>{
                this.props.history.push("/profile")
            });
    };

    render() {
        return (
            <div>
                <LoginPageDisplay
                    onFormChange={this.onFormChange}
                    {...this.state.auth}
                    loginWithFacebook={this.loginWithFacebook}
                    loginWithEmail={this.loginWithEmail}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state: state
    };
}


export default LoginPage = connect(mapStateToProps, {loginWithFacebook, loginWithEmail})(LoginPage);