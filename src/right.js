import React, { useState } from "react";
import { Button } from "antd";
import Dialog from './dialog'

const RightMenu = (addBlud) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (selectedLocation, startDate, endDate, phoneNumber) => {
        try {
            await addBlud.addBlud.addBlud(selectedLocation, startDate, endDate, phoneNumber, () => setIsModalOpen(false));
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div >
            {/* <Menu.Item key="location">
                <a href="#!"><GoLocation size={12} /> Halduchaur</a>
            </Menu.Item> */}
            <Button type="primary" onClick={showModal}>
                Submission
            </Button>
            <Dialog
                handleCancel={handleCancel}
                handleOk={handleOk}
                open={isModalOpen}
            >
            </Dialog>
        </div >
    );
}

export default RightMenu;
