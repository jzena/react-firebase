import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CourseDetailDisplay} from "./CourseDetailDisplay";
import {SimpleLoader} from "../common/SimpleLoader";

class CourseDetailPage extends Component {

    state = {};

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    render() {
        if(!this.props.fetched) return <SimpleLoader/>
        return (
            <div>
                <CourseDetailDisplay
                    {...this.props.course}
                    {...this.props.author}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let course = {};
    let author = {};
    let found = state.courses.list.find(c=>c.slug === ownProps.match.params.slug);
    if(found){
        course = found;
        let authorId = course.author;
        author = state.authors.list.find(a=>a.uid === authorId);
    }
    return {
        course,
        author,
        fetched:Object.keys(course).length > 0
    };
}



export default CourseDetailPage = connect(mapStateToProps, {})(CourseDetailPage);