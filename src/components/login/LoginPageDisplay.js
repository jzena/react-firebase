/**
 * Created by BlisS on 22/03/17.
 */
import React from 'react';
import FontAwesome from 'react-fontawesome';
import logo from '../../assets/logo.png';


export const LoginPageDisplay = ({password, email, onFormChange, loginWithEmail, loginWithFacebook}) => {
    return (
        <div>
            <section className="login-container">
                <form onSubmit={loginWithEmail}>
                    <span>Es bueno verte de nuevo!</span>
                    <input name="email" onChange={onFormChange} value={email} required placeholder="Tu correo electrónico" type="text"/>
                    <input name="password" onChange={onFormChange} value={password} required placeholder="Tu contraseña" type="password"/>
                    <button>
                        Iniciar Sesión
                        <FontAwesome
                            name="long-arrow-right"
                        />
                    </button>
                    <div
                        onClick={loginWithFacebook}
                    >
                        <FontAwesome
                            name="facebook"
                        />
                        Inicia con Facebook
                    </div>

                </form>

                <img className="floating-logo" src={logo} alt="logo"/>
            </section>

        </div>
    );
};



