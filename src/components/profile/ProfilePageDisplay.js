/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
//import {CircularProgress} from 'material-ui';
//import {Dialog} from 'material-ui';
import {SimpleLoader} from "../common/SimpleLoader";
import {CircularProgress} from 'material-ui';

const defaultImg = "https://fthmb.tqn.com/cD0PNhMM0BxevlBvAgD1ntpQLac=/3558x2363/filters:fill(auto,1)/Cat-rolling-GettyImages-165893132-58ac5ef05f9b58a3c90a144f.jpg";
const defaultPortada = "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAjrAAAAJDcyOTAwZGFmLWViN2ItNDQ2My05M2Q1LTU2MTY1NWI0ZTMwOA.jpg";

let theInput;
let secondInput;

export const ProfilePageDisplay = ({completed, logOut, loading, onChange, fetched, changePic, changeCover, onSubmit, photoURL, title, displayName, fullName, email, age, sex, facebook, twitter, github, linkedIn, bio, portada}) => {
    if(!portada) portada = defaultPortada;
   if(!fetched) return <SimpleLoader/>;
    function clickCover(){
        theInput.click();
    }
    function clickPic(){
        secondInput.click();
    }
    return (
        <div>

            <div className="profile-portada" style={{backgroundImage:`url('${portada}')`}}>
                <button onClick={clickCover} >{loading ? <CircularProgress mode="determinate" value={completed}/> : "Cambiar Portada"}</button>
                <figure>
                    <div onClick={clickPic}>
                        <span>Cambiar Foto</span>
                    </div>
                    <img src={photoURL ? photoURL:defaultImg} alt="user"/>
                    <input accept="image/*" ref={input=>secondInput=input} onChange={changePic} hidden type="file"/>
                </figure>
                <input accept="image/*" ref={input=>theInput=input} onChange={changeCover} hidden type="file"/>
            </div>

            <form onSubmit={onSubmit} className="profile-form">
                <div
                    className="cerrar-sesion"
                    onClick={logOut}
                >
                    Cerrar Sesión
                </div>

                <h2>Tus datos:  <input value="Guardar" type="submit"/></h2>

                <label>
                    <h5>Título</h5>
                    <input
                        name="title"
                        onChange={onChange}
                        value={title}
                        placeholder="Dr., Lic., Ing., Hacker" type="text"/>
                </label>

                <label>
                    <h5>Tu Nombre de usuario</h5>
                    <input
                        name="displayName"
                        onChange={onChange}
                        value={displayName}
                        placeholder="@BlisS" type="text"/>
                </label>

                <label>
                    <h5>Tu Nombre completo</h5>
                    <input
                        name="fullName"
                        onChange={onChange}
                        value={fullName}
                        type="text"/>
                </label>

                <label>
                    <h5>Tu Correo Electrónico</h5>
                    <input
                        disabled
                        name="email"
                        onChange={onChange}
                        value={email}
                        type="text"/>
                </label>

                <label>
                    <h5>Tu Edad</h5>
                    <input
                        name="age"
                        onChange={onChange}
                        value={age}
                        type="text"/>
                </label>

                <label>
                    <h5>Tu Genero</h5>
                    <input
                        name="sex"
                        onChange={onChange}
                        value={sex}
                        type="text"/>
                </label>

                <label>
                    <h5>Tu Facebook</h5>
                    <input
                        name="facebook"
                        onChange={onChange}
                        value={facebook}
                        type="text"/>
                </label>

                <label>
                    <h5>Tu Twitter</h5>
                    <input
                        name="twitter"
                        onChange={onChange}
                        value={twitter}
                        type="text"/>
                </label>

                <label>
                    <h5>Tu LinkedIn</h5>
                    <input
                        name="linkedIn"
                        onChange={onChange}
                        value={linkedIn}
                        type="text"/>
                </label>

                <label>
                    <h5>Tu Github</h5>
                    <input
                        name="github"
                        onChange={onChange}
                        value={github}
                        type="text"/>
                </label>
                <label>
                    <h5>Mini Bio</h5>
                    <textarea
                        value={bio}
                        name="bio"
                        onChange={onChange}
                    ></textarea>
                </label>


            </form>
        </div>
    );
};

