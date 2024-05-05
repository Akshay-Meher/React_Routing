// Registration.js
import React, { useState } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields before submission
        let formValid = true;
        const newErrors = {};

        Object.entries(formData).forEach(([name, value]) => {
            let error = '';
            switch (name) {
                case 'username':
                    // Validate username
                    if (!value.trim()) {
                        error = `username can't be empty`;
                    } else {
                        const usernameRegex = /^[a-zA-Z_]+$/;
                        error = !usernameRegex.test(value) ? 'Username can only contain letters and underscores' : '';
                    }
                    break;
                case 'email':
                    // Validate email
                    if (!value.trim()) {
                        error = 'Email is required';
                    } else {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        error = !emailRegex.test(value) ? 'Invalid email address' : '';
                    }
                    break;
                case 'password':
                    // Validate password
                    if (!value.trim()) {
                        error = 'Password is required';
                    } else {
                        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                        error = !passwordRegex.test(value)
                            ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                            : '';
                    }
                    break;
                case 'confirmPassword':
                    // Validate confirmPassword
                    if (!value.trim()) {
                        error = `Confirm password can't be empty`;
                    } else {
                        error = value !== formData.password ? 'Passwords do not match' : '';
                    }
                    break;
                default:
                    break;
            }

            // Update formValid and newErrors
            if (error) {
                formValid = false;
                newErrors[name] = error;
            }
        });

        setErrors(newErrors);

        if (formValid) {
            // Submit your form data here
            // console.log('Form submitted:', formData);
            axios.post('http://localhost:3000/users', formData)
                .then(function (response) {
                    console.log(response.status);
                    if (response.status === 201) {
                        navigate('/login');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            console.log('Form submission failed. Please fill in all fields correctly.');
        }
    };



    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'username':
                // Validate username
                const usernameRegex = /^[a-zA-Z_]+$/;
                error = !usernameRegex.test(value) ? 'Username can only contain letters and underscores' : '';
                break;
            case 'email':
                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                error = !emailRegex.test(value) ? 'Invalid email address' : '';
                break;
            case 'password':
                // Validate password
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                error = !passwordRegex.test(value)
                    ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                    : '';
                break;
            case 'confirmPassword':
                error = value !== formData.password ? 'Passwords do not match' : '';
                break;
            default:
                break;
        }
        setErrors({
            ...errors,
            [name]: error,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container registration-container">
            <div className="form-container">
                <h2 style={{ textAlign: 'center' }}>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group" style={{ display: "flex", flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input-field"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <span className="toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? <i className='bx bxs-hide'></i> : <i className='bx bxs-show'></i>}
                            </span>
                        </div>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="input-field"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="btn">
                        Register
                    </button>
                </form>
                <p style={{ textAlign: 'center' }}  >
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;










// import React, { useState } from 'react';
// import './Registration.css';

// const Registration = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//         validateField(name, value);
//     };

//     const validateField = (name, value) => {
//         let error = '';
//         switch (name) {
//             case 'username':
//                 error = value.length < 3 ? 'Username must be at least 3 characters long' : '';
//                 break;
//             case 'email':
//                 // Simple email validation, you may need more robust validation
//                 error = !value.includes('@') ? 'Invalid email address' : '';
//                 break;
//             case 'password':
//                 error = value.length < 6 ? 'Password must be at least 6 characters long' : '';
//                 break;
//             case 'confirmPassword':
//                 error = value !== formData.password ? 'Passwords do not match' : '';
//                 break;
//             default:
//                 break;
//         }
//         setErrors({
//             ...errors,
//             [name]: error,
//         });
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <div className="container">
//             <div className="form-container">
//                 <h2>Registration</h2>
//                 <form>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             className="input-field"
//                             placeholder="Username"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                         />
//                         {errors.username && <span className="error">{errors.username}</span>}
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             className="input-field"
//                             placeholder="Email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                         {errors.email && <span className="error">{errors.email}</span>}
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             className="input-field"
//                             placeholder="Password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                         <span className="toggle-password" onClick={togglePasswordVisibility}>
//                             {showPassword ? <i class='bx bx-show'></i> : <i class='bx bxs-hide'></i>}
//                         </span>
//                         {errors.password && <span className="error">{errors.password}</span>}
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             className="input-field"
//                             placeholder="Confirm Password"
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                         />
//                         {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
//                     </div>
//                     <button type="submit" className="btn">
//                         Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Registration;

















// import './Registration.css';

// const Registration = () => {
//     return (
//         <div className="container">
//             <div className="form-container">
//                 <h2>Registration</h2>
//                 <form>
//                     <div className="form-group">
//                         <input type="text" className="input-field" placeholder="Username" />
//                     </div>
//                     <div className="form-group">
//                         <input type="email" className="input-field" placeholder="Email" />
//                     </div>
//                     <div className="form-group">
//                         <input type="password" className="input-field" placeholder="Password" />
//                     </div>
//                     <div className="form-group">
//                         <input type="password" className="input-field" placeholder="ConformPassword" />
//                     </div>
//                     <button type="submit" className="btn">Register</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Registration;
