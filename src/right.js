import React, { useState } from "react";
import { Menu, Button, Modal, Input } from "antd";
import { GoLocation } from "react-icons/go";
import { WarningOutlined, PhoneOutlined } from '@ant-design/icons';

const RightMenu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Menu mode="horizontal">
            <Menu.Item key="location">
                <a href="#!"><GoLocation size={12} /> Halduchaur</a>
            </Menu.Item>
            <Button type="primary" onClick={showModal}>
                Submission
            </Button>
            <Modal title="Blood Camp Submission" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>We will need some basic info for adding a blood camp</p>
                <Input placeholder="Camp Name" style={{ "margin-bottom": "12px" }}></Input>
                <Input placeholder="Begin Date" style={{ "margin-bottom": "12px" }}></Input>
                <Input placeholder="End Date" style={{ "margin-bottom": "12px" }}></Input>
                <Input placeholder="Begin Time" style={{ "margin-bottom": "12px" }}></Input>
                <Input placeholder="End Time" style={{ "margin-bottom": "12px" }}></Input>
                <p>UI For selecting Map</p>
            </Modal>
        </Menu>
    );
}

export default RightMenu;
