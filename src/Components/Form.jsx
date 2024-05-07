import { useState } from 'react';
import './CSS/form.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Form = ({message, handleSubmit, buttonName, username, gmail, password, setUsername, setGmail, setPassword}) => {
    const [passType, setPassType] = useState('password')

    const togglePasswordVisibility = () => {
        setPassType(passType === 'password' ? 'text' : 'password');
    };

    return ( 
        <div className="form-container">
            <label htmlFor="username">
                თქვენი სახელი
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id='username' name='username' placeholder='სახელი' />
            </label>

            <label htmlFor="gmail">
                თქვენი Gmail
                <input value={gmail} onChange={(e) => setGmail(e.target.value)} type="text" id='gmail' name='gmail' placeholder='example@gmail.com' />
            </label>

            <label htmlFor="password">
                თქვენი პაროლი
                <input  value={password} onChange={(e) => setPassword(e.target.value)} type={passType} id='password' name='password' placeholder='თქვენი პაროლი' />
                <button onClick={togglePasswordVisibility} className='just'>
                    {passType === 'password' ? <FaEyeSlash /> : <FaEye />}
                </button>
            </label>

            {message && <p style={{textAlign: 'center'}}>{message}</p>}

            <button onClick={handleSubmit} className="submit-btn">
                {buttonName}
            </button>
        </div>
     );
}
 
export default Form;
