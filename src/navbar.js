import React, { Component } from "react";
import RightMenu from "./right";
import { Drawer, Button } from "antd";
import "./App.css";

class Navbar extends Component {
    state = {
        current: "mail",
        visible: false
    };
    showDrawer = () => {
        this.setState({
            visible: true
        });
    };
    onClose = () => {
        this.setState({
            visible: false
        });
    };
    render() {
        return (
            <nav className="menuBar">
                <div className="logo">
                    <a href="#">BL<p style={{ color: 'red', display: 'inline' }}>U</p>D</a>
                </div>
                <div className="menuCon">
                    <div className="rightMenu">
                        <RightMenu />
                    </div>
                </div>
            </nav >
        );
    }
}
export default Navbar;
