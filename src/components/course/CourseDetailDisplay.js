/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const portada = "https://ibin.co/2t1lLdpfS06F.png";
const elAuthor = "https://cdn-images-1.medium.com/max/1200/0*jp3IFb08Sy3_k3N_.";

export const CourseDetailDisplay = ({cover, authorPhoto, name, body, modules, displayName, bio, photoURL, title, id}) => {
    if(!cover) cover = portada;
    if(!authorPhoto) authorPhoto = elAuthor;
    return (
        <div>
            <section className="course-detail-container">
                <article style={{backgroundImage:`url(${cover})`}} className="course-detail-cover">
                    <Link style={{position:"absolute"}} className="course-action-call" to={"/classroom/"+id}>
                        Ingresar al curso
                    </Link>
                </article>
                <article>
                    <h1>{name}</h1>
                    <p>
                        {body}
                    </p>
                </article>
                <article>
                    <h3>Tu Instructor</h3>
                    <img src={photoURL} alt="author"/>
                    <br/>
                    <span>{displayName}</span>
                    <p style={{fontSize:15, textAlign:"center"}}>{title}</p>
                    <p>
                        {bio}
                    </p>
                </article>
                <article className="course-syllabus">

                    {modules.map((m, index)=>{
                        return(
                            <div key={index}>
                                <h5>
                                    {m.name}
                                </h5>
                                {m.videos && m.videos.map((v, index)=>{
                                    return(
                                        <p key={index}>
                                            <FontAwesome
                                                name="play"
                                            />
                                            {v.name} - (2:30)
                                        </p>
                                    );
                                })}
                            </div>
                        );
                    })}

                </article>
                <article style={{margin:50}}>
                    <Link className="course-action-call" to={"/classroom/" + id}>
                        Ingresar al curso
                    </Link>
                </article>

            </section>
        </div>
    );
};


