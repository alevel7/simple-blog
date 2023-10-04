import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
    return (
        <header>
            <h1>Company List</h1>
            <div className="user-info">
                <Link to="/addCompany">
                    <p><span>+</span> Add company</p>
                </Link>
                <Link to="/dashboard">
                    <p>All company</p>
                </Link>
                <p>Welcome {user?.firstName || 'User'}</p>
                <p onClick={() => logout()}>Logout</p>
            </div>
        </header>
    );
}

export default Navbar;