import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ClassRoomNav} from "./ClassRoomNav";
import {SimpleLoader} from "../common/SimpleLoader";
import {Route, Switch} from 'react-router-dom';
import ClassRoomVideo from './ClassRoomVideo';

class ClassRoomPage extends Component {

    state = {};

    componentWillMount(){
        //check for permissions
        if(!localStorage.getItem("user")){
            this.props.history.push("/login");
        }
    }

    render() {
        const {course, fetched, courseId} = this.props;
        if (!fetched) return <SimpleLoader/>
        return (
            <div className="classroom-container">
                <ClassRoomNav
                    {...course}
                    courseId={courseId}
                />
                <div className="classroom-video">
                    <Switch>
                        <Route path="/classroom/:courseId/:moduleId/:videoId" component={ClassRoomVideo}/>
                        <Route render={()=><h2>Bienvenido al curso!</h2>} />
                    </Switch>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    let course;
    if(id) course = state.courses.list.find(c=>c.id === id);
    if(course === undefined) course={};
    return {
        courseId:id,
        course,
        fetched:Object.keys(course).length > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(dispatch)
    };
}

export default ClassRoomPage = connect(mapStateToProps, mapDispatchToProps)(ClassRoomPage);