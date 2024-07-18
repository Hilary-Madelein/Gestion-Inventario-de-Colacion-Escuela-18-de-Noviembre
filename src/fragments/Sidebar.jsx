import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import '../css/Sidebar.css';
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from '../Data/Data';
import Logo from '../img/logoNutriLog.png';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const currentPath = location.pathname;
        const currentIndex = SidebarData.findIndex(item => item.route === currentPath);
        if (currentIndex !== -1) {
            setSelected(currentIndex);
        }
    }, [location.pathname]);

    return (
        <div className="Sidebar">
            {/* logo */}
            <div className="logo">
                <img src={Logo} alt="Logo app" />
                <span className="titulo">
                    <span className='titulo2'>NutriLog</span>
                </span>
            </div>

            {/* menu */}
            <div className="menu">
                {SidebarData.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={selected === index ? 'menuItem active' : 'menuItem'}
                            onClick={() => {
                                setSelected(index);
                                navigate(item.route);
                            }}
                        >
                            <item.icon />
                            <span>{item.heading}</span>
                        </div>
                    );
                })}
            </div>

            {/* logout button */}
            <div className="logout">
                <div className="menuItem">
                    <UilSignOutAlt />
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
