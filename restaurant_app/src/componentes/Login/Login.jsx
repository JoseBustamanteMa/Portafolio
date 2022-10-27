import React, {Fragment, useState} from 'react'
import Title from './components/Title/Title';
import Input from './components/Input/Input';
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(name, value){
        if(name==='usuario'){
            setUser(value)
        }else{
            setPassword(value)
        }
    }

    function handleSubmit(){
        let account = {user, password}
        if(account){
            console.log('account:',account)
        }
    }

    return (
        <div className='login'>
            <Fragment>
                <section className='container box col-12' >
                    <div className="design">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className='container row col-12'>
                        <Title text='Iniciar Sesión'/>
                        <div className='container'>
                            <Input 
                            attribute={{
                                id:"usuario",
                                name: "usuario",
                                type: 'text',
                                placeholder: 'Ingrese su usuario'
                            }}
                            handleChange={handleChange}    
                            />
                        </div>
                        <div className='container'>

                            <Input 
                            attribute={{
                                id:"contraseña",
                                name: "contraseña",
                                type: 'password',
                                placeholder: 'Ingrese su contraseña'
                            }}
                            handleChange={handleChange}    
                        />
                        </div>
                        <div className='container col-6 '>
                            <Link  to='./registro'>¿Registrarse?</Link>
                        </div>
                        <div className='container col-8'>
                            <button onClick={handleSubmit} className='btn btn-primary'>
                                Ingresar
                            </button>
                        </div>
                    </div>
                </section>
            </Fragment>
        </div>
  )
};
export default Login;
