import { Modal, Input } from "antd";
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import DatePicker from "react-datepicker";
import { React, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import 'leaflet/dist/leaflet.css'
import './leaflet.css';
import L from 'leaflet';

const myIcon = L.icon({
    iconUrl: 'images/location-pin.png',
    iconSize: [38, 38],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

const Dialog = ({ open, handleOk, handleCancel }) => {
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setSelectedLocation(e.latlng);
            },
        });
    };

    return <Modal title="Blood Camp Submission" open={open} onOk={() => handleOk(selectedLocation, startDate, endDate, phoneNumber)} onCancel={handleCancel}>
        <p>We will need some basic info for adding a blood camp</p>
        <MapContainer
            center={[29.208514556408236, 79.493723]}
            zoom={12}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution=''
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEvents />
            {selectedLocation && (
                <Marker position={selectedLocation} icon={myIcon} />
            )}
        </MapContainer>
        <div style={{ margin: "12px 12px" }}></div>

        <Input type="tel" placeholder="Phone Number" style={{
            marginBottom: "12px"
        }} onChange={(phoneNumber) => setPhoneNumber(phoneNumber.target.value)} ></Input >
        <DatePicker
            dateFormat="Pp" placeholder="Start Date" className="ant-input css-dev-only-do-not-override-uxn03c" showTimeSelect selected={startDate}
            onChange={(date) => setStartDate(date)} />
        <div style={{ margin: "12px 12px" }}></div>
        <DatePicker placeholder="End Date" className="ant-input css-dev-only-do-not-override-uxn03c"
            dateFormat="Pp"
            showTimeSelect selected={endDate}
            onChange={(date) => setEndDate(date)} />
        <div style={{ margin: "12px 12px" }}></div>
    </Modal >;
}

export default Dialog;