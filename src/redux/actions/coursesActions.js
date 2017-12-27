import firebase from '../../api/firebase';

const db = firebase.database().ref().child("dev");

//get each course from firebase

export const GET_COURSE_SUCCESS = "GET_COURSE_SUCCESS";

function getCourseSuccess(course){
    return {
        type:GET_COURSE_SUCCESS,
        course
    }
}

function listen(dispatch){
    db.child("courses")
        .on("child_added", s=>{
            let course = s.val();
            course["id"] = s.key;
            console.log(course);
            dispatch(getCourseSuccess(course));
        });
}

export const getCourse = () => (dispatch) => {

    listen(dispatch);

    db.child("courses")
        .on("child_changed", s=>{
            let course = s.val();
            course["id"] = s.key;
            dispatch(getCourseSuccess(course));
        });
};
//get each course from firebase


//save course

export const saveCourse = (course) => (dispatch, getState) => {
    let updates = {};
    const userUid = getState().user.profile.uid;
    course["author"] = userUid;
    if(course.id){
        updates[`/courses/${course.id}/`] = course;
        updates[`/users/${userUid}/author/${course.id}`] = true;
    }else{
        let id = db.child("courses").push().key;
        updates[`/courses/${id}/`] = course;
        updates[`/users/${userUid}/author/${id}`] = true;
    }
    return db.update(updates)
        .then(r=>{
            return Promise.resolve(r);
        })
        .catch(e=>{
            console.log(e);
            return Promise.reject(e.message);
        });
};

//save course
