import { Modal, Input } from "antd";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import DatePicker from "react-datepicker";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import './leaflet.css';

const Dialog = ({ open, handleOk, handleCancel, setBlud, blud }) => {
    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setBlud({ ...blud['lat'] = e.latlng.lat });
                console.log(e.latlng.lat);
                setBlud({ ...blud['long'] = e.latlng.lng });
                console.log(e.latlng.lng);
            },
        });
    };

    return <Modal title="Blood Camp Submission" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>We will need some basic info for adding a blood camp</p>
        <MapContainer
            center={[33.8735578, 35.86379]}
            zoom={9}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution=''
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEvents />
        </MapContainer>
        <div style={{ margin: "12px 12px" }}></div>

        <Input placeholder="Camp Name" style={{ marginBottom: "12px" }} onChange={(name) => setBlud({ ...blud['name'] = name })}></Input>
        <Input type="tel" placeholder="Phone Number" style={{
            marginBottom: "12px"
        }} onChange={(phoneNumber) => setBlud({ ...blud['phoneNumber'] = phoneNumber })} ></Input >
        <DatePicker placeholder="Start Date" className="ant-input css-dev-only-do-not-override-uxn03c" showTimeSelect selected={blud['startDate']}
            onChange={(date) => setBlud({ ...blud['startDate'] = date })} />
        <div style={{ margin: "12px 12px" }}></div>
        <DatePicker placeholder="End Date" className="ant-input css-dev-only-do-not-override-uxn03c"
            showTimeSelect selected={blud['endDate']}
            onChange={(date) => setBlud({ ...blud, endDate: date })} />
        <div style={{ margin: "12px 12px" }}></div>
    </Modal >;
}

export default Dialog;