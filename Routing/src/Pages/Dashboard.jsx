// Dashboard.js
//   ;
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const Dashboard = () => {
    const navigate = useNavigate();

    function handleLogOut() {
        if (window.confirm("Are you sure to Log-Out...?")) {
            localStorage.removeItem('userLogin');
            navigate('/');
        }
    }

    return (

        <div style={{ backgroundColor: "white" }} id='dashboard'>
            <ResponsiveAppBar handleLogOut={handleLogOut} />
        </div>

        // <div className="container">
        //     <div className="dashboard-container">
        //         <div>
        //             <h2>Dashboard</h2>
        //             <nav>
        //                 <ul>
        //                     <li><Link to="/dashboard/home">Home</Link></li>
        //                     <li><Link to="/dashboard/about">About</Link></li>
        //                     <li><Link to="/dashboard/profile">Profile</Link></li>
        //                     {/* <li><Link to="/dashboard/profile">Profile</Link></li> */}
        //                 </ul>
        //             </nav>
        //             <button onClick={handleLogOut}>LogOut</button>
        //         </div>
        //         <div>
        //             <Outlet />
        //         </div>
        //     </div>
        // </div>
    );
}

export default Dashboard;
