import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AdminUploadPageDisplay} from './AdminUploadPageDisplay';
import {AdminCoursesList} from "./AdminCoursesList";
import {Route} from 'react-router-dom';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';


class AdminUploadPage extends Component {

    state = {};

    componentWillMount(){
        if(!localStorage.getItem("isStaff")) {
            toastr.error("no tienes permiso de estar aqui, lo siento ;)")
            this.props.history.push("/");
        }
    }

    render() {
        const {courses, fetched, authors} = this.props;
        return (
            <div>
                <AdminUploadPageDisplay

                />
                <AdminCoursesList
                    courses={courses}
                    fetched={fetched}
                    authors={authors}
                />


                <Route path="/admin/:id" component={CourseForm}/>

                <FloatingActionButton
                    onClick={()=>this.props.history.push("/admin/new")}
                    backgroundColor="orange"
                    style={{position:"fixed", bottom:40, right:40}}
                >
                    <ContentAdd/>
                </FloatingActionButton>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses.list,
        authors: state.authors.object,
        fetched: Object.keys(state.authors.object).length > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(dispatch)
    };
}

export default AdminUploadPage = connect(mapStateToProps, mapDispatchToProps)(AdminUploadPage);