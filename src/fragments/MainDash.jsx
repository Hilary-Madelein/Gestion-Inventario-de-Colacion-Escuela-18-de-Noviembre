import React from "react";
import Card from "./Cards";
import TableData from "./TableData";
import '../css/MainDash.css';

const MainDash = () => {
    return (
        <div className="MainDash">
            <h1>
                Dashboard
            </h1>
            <Card/>

            <h3>Recent Orders</h3>
            <TableData/>

            

        </div>

    )
}

export default MainDash;