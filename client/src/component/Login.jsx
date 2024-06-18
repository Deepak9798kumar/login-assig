import React, { useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { name, phoneNumber });
            console.log("response",response.data); 
            
            Swal.fire({
                title: "Login Status",
                text: response.data.message, 
                icon: "success"
            });
           
            navigate('/home', { state: { user: response.data.user } });
            
            setName('');
            setPhoneNumber('');
            
        } catch (error) {
            console.error("Error:", error);
            
            Swal.fire({
                title: "Error",
                text: "Failed to login. Please try again later.",
                icon: "error"
            });
        }
    };

    return (
        <>
            <h4 className='signupheading'>This is Log In Page</h4>
            <div className="mainform">
                <div className="seconddiv">
                    <div className="input-group">
                        <span className="input-group-text"> Name </span>
                        <input
                            type="text"
                            aria-label="Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text"> Phone No. </span>
                        <input
                            type="tel"
                            aria-label="Phone number"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button onClick={handleLogin} className="btn btn-success">Log In!</button>
                </div>
            </div>
        </>
    );
}
