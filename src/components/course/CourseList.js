import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CourseListDisplay} from './CourseListDisplay';

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

export const CourseList = connect(mapStateToProps, mapDispatchToProps)(CourseListDisplay);