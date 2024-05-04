import { useState } from 'react';
import './CSS/form.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Form = ({buttonName}) => {
    const [passType, setPassType] = useState('password')

    const togglePasswordVisibility = () => {
        setPassType(passType === 'password' ? 'text' : 'password');
    };

    return ( 
        <div className="form-container">
            <label htmlFor="username">
                თქვენი სახელი
                <input type="text" id='username' name='username' placeholder='სახელი' />
            </label>

            <label htmlFor="gmail">
                თქვენი Gmail
                <input type="text" id='gmail' name='gmail' placeholder='example@gmail.com' />
            </label>

            <label htmlFor="password">
                თქვენი პაროლი
                <input type={passType} id='password' name='password' placeholder='თქვენი პაროლი' />
                <button onClick={togglePasswordVisibility} className='just'>
                    {passType === 'password' ? <FaEye /> : <FaEyeSlash />}
                </button>
            </label>

            <button className="submit-btn">
                {buttonName}
            </button>
        </div>
     );
}
 
export default Form;
