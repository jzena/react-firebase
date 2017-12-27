/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {SimpleLoader} from "../common/SimpleLoader";
//redux
import {connect} from 'react-redux';

//const defaultImg = "https://www.gcppodcast.com/images/icons/firebase.png"
//const defaulUserImg = "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:30,height:30/https://www.filepicker.io/api/file/FfKibc1hRnCM5E3HEzfx";

const CourseCard = ({autor={}, author, body, cover, id, isFree, price, slug, name, summary}) => (
    <Link style={{textDecoration:"none", color:"black"}} to={"/courses/"+slug}>
        <article className="course-list-card">
            <img className="portada" src={cover} alt="portada"/>
            <h5>{name}</h5>
            <p>{summary}</p>
            <div className="course-card-footer">
                <div>
                    <img src={autor.photoURL} alt="user"/>
                    <span>{autor.displayName}</span>
                </div>
                <span>{isFree ? "GRATIS":price}</span>
            </div>

        </article>
    </Link>
);

export const CourseListDisplay = ({courses, fetched, authors}) => {
    if(!fetched) return <SimpleLoader/>;
    return (
        <div>
            <section className="course-list-container">
                {courses.map(c=><CourseCard key={c.id} {...c} autor={authors[c.author]}/>)}
            </section>
        </div>
    );
};




// {courses.map(c=><CourseCard key={c.id} {...c} autor={authors[c.author]}/>)}

