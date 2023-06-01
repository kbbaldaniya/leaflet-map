import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from "leaflet";

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});


const LeafletMap = () => {
    const center = [19.7515, 75.7139];

    function LocationMarker() {
        const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);

        const map = useMap();

        useEffect(() => {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
                const circle = L.circle(e.latlng);
                circle.addTo(map);
                setBbox(e.bounds.toBBoxString().split(","));
            });
        }, [map]);

        return position === null ? null : (
            <Marker position={position} icon={icon}>
                <Popup>
                    You are here. <br />
                    Map bbox: <br />
                    <b>Southwest lng</b>: {bbox[0]} <br />
                    <b>Southwest lat</b>: {bbox[1]} <br />
                    <b>Northeast lng</b>: {bbox[2]} <br />
                    <b>Northeast lat</b>: {bbox[3]}
                </Popup>
            </Marker>
        );
    }

    return (
        <section className='map-component' >
            <div className='map'>
                <MapContainer center={center} zoom={10} style={{ height: '100vh', width: '100%' }} >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker />
                </MapContainer>
            </div>
        </section>
    )
}

export default LeafletMap
