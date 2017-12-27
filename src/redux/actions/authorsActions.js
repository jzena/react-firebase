import firebase from '../../api/firebase';

const db = firebase.database().ref("dev");

//get authors

export const GET_AUTHOR_SUCCESS = "GET_AUTHOR_SUCCESS";

function getAuthorSuccess(author){
    return {
        type:GET_AUTHOR_SUCCESS,
        author
    }
}

export const getAuthor = () => (dispatch) => {
    db.child("users")
        .on("child_added", s=>{
            let author = s.val();
            author["uid"] = s.key;
            console.log(author);
           dispatch(getAuthorSuccess(author)) ;
        });
};

//get authors