import React from "react";
import RightMenu from "./right";
import "./App.css";

const Navbar = (addBlud) => {
    return (
        <nav className="menuBar">
            <div className="logo">
                <a href="/">BL<p style={{ color: 'red', display: 'inline' }}>U</p>D</a>
            </div>
            <div className="menuCon">
                <div className="rightMenu">
                    <RightMenu
                        addBlud={addBlud}
                    />
                </div>
            </div>
        </nav >
    );
}
export default Navbar;
