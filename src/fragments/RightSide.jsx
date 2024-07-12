import React from "react";
import '../css/RightSide.css';
import Updates from "./Updates";
import CustomerReview from "./CustomerReview";

const RightSide = () => {
    return (

            <div className="RightSide">
                <div className="prueba">
                    
                    <Updates/>
                </div>
                <div>
                    
                    <CustomerReview/>
                </div>
            </div>
    );
};

export default RightSide;
