import React from 'react';
// Navbar nada mas que comentar, es simplemente y efectivamente... una Navbar
const Navbar = ({brand}) => {
    return ( 
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a href="#!" className="navbar-brand">{brand}</a>
            </div>
        </nav>
    );
}
 
export default Navbar;