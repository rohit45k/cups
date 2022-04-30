import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="container flex justify-between">
            {/* LOGO */}
            <div>
                <p className="text-xl font-bold">Edible Cups</p>
            </div>
            {/* Nav Links */}
            <nav>
                <ul className="flex space-x-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">SignIn</Link></li>
                    <li><Link to="/">SignOut</Link></li>
                </ul>
            </nav>
            {/* Cart or CTA */}
        </div>
    )
}

export default Header;