import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CourseList} from './CourseList';

class CoursePage extends Component {

    state = {};

    render() {
        return (
            <div className="course-page-container">
                <h2>Cursos destacados</h2>
                <CourseList/>
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

export default CoursePage = connect(mapStateToProps, mapDispatchToProps)(CoursePage);