import React, { useState } from "react";
import { Button } from "antd";
import Dialog from './dialog'

const RightMenu = (setBlud, blud, addBlud) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        await addBlud();
        setIsModalOpen(false);
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
                setBlud={setBlud}
                blud={blud}
            >
            </Dialog>
        </div >
    );
}

export default RightMenu;
