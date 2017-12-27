/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
import {NavLink} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const VideoBlock = ({courseId, moduleId, name, id}) => (
    <NavLink
        activeClassName="active"
        to={`/classroom/${courseId}/${moduleId}/${id}`}
    >
        <p>
            <FontAwesome style={{color:"grey"}} name="youtube-play"/> {name} - (01:45) <FontAwesome style={{color:"green"}} name="check-square-o"/>
        </p>

    </NavLink>
);

export const ClassRoomNav = ({courseId, name, id, modules=[]}) => {
    return (
        <div className="classroom-nav-container">
            <nav className="classroom-nav">
                <h2>{name}</h2>
                <h3>50% completado</h3>
                {modules && modules.map((m, index)=>{
                    return(
                        <div key={index}>
                            <h4>{m.name}</h4>
                            {m.videos && m.videos.map(video=><VideoBlock courseId={courseId} moduleId={m.id} key={video.id} {...video} />)}
                        </div>
                    );
                })}



            </nav>
        </div>

    );
};


