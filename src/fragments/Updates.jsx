import React from "react";
import '../css/Updates.css';
import { UpdatesData } from "../Data/Data";

const Updates = () => {
    // Divide los datos en tres grupos
    const firstRow = UpdatesData.slice(0, Math.ceil(UpdatesData.length / 3));
    const secondRow = UpdatesData.slice(Math.ceil(UpdatesData.length / 3), Math.ceil(2 * UpdatesData.length / 3));
    const thirdRow = UpdatesData.slice(Math.ceil(2 * UpdatesData.length / 3));

    return (
        <div className="updateData">
            <h3>Datos de la Bodega</h3>
            <div className="Updates">
                <div className="row">
                    {firstRow.map((update, index) => (
                        <div className="update" key={index}>
                            <div className="noti">
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <span>{update.name}</span>
                                    <span> {update.noti}</span>
                                </div>
                                <span>{update.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    {secondRow.map((update, index) => (
                        <div className="update" key={index}>
                            <div className="noti">
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <span>{update.name}</span>
                                    <span> {update.noti}</span>
                                </div>
                                <span>{update.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    {thirdRow.map((update, index) => (
                        <div className="update" key={index}>
                            <div className="noti">
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <span>{update.name}</span>
                                    <span> {update.noti}</span>
                                </div>
                                <span>{update.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Updates;
