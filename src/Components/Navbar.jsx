import { Link } from 'react-router-dom';
import './CSS/navbar.css'


const Navbar = () => {

    const LinkStyles = {
        color: '#20263C',
        textDecoration: 'none',
    }

    return ( 
        <header>
            <nav>
                <Link to='/' style={LinkStyles}><p>მთავარი</p></Link>
                <p>რეცეპტები</p>
                <p>შენახულები</p>
                <p>დაგვიკავშირდით</p>
                <Link to='/Register' style={LinkStyles}><p>რეგისტრაცია</p></Link>
                <Link to='/LogIn' style={LinkStyles}><p>შესვლა</p></Link>
            </nav>
        </header>
     );
}
 
export default Navbar;