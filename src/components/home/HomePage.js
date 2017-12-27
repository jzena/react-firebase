import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HomePageDisplay} from './HomePageDisplay';

class HomePage extends Component {

    state = {};

    render() {
        return (
            <div>
                <HomePageDisplay/>
            </div>
        );
    }
}

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

export default HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);