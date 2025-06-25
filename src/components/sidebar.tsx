import React, { useState, useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { TbMessageChatbotFilled } from "react-icons/tb";

interface SidebarProps {
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
    setCurrentView: (view: string) => void;
    isMobile: boolean;
    role: "admin" | "clinician";
}

const Sidebar = ({ showSidebar, setShowSidebar, setCurrentView, isMobile, role }: SidebarProps) => {
    const links =
        role === "admin"
            ? [
                { name: "Patients", icon: <IoPersonOutline /> },
                { name: "Audit Logs", icon: <TbMessageChatbotFilled /> },
            ]
            : [
                { name: "Create Patient", icon: <FaUserDoctor /> },
                { name: "My Patients", icon: <IoPersonOutline /> },
            ];

    const [activeLink, setActiveLink] = useState(links[0].name);

    useEffect(() => {
        setActiveLink(links[0].name);
        setCurrentView(links[0].name);
    }, [role]);

    const handleLinkClick = (linkName: string) => {
        console.log(`Link clicked: ${linkName}`);
        setActiveLink(linkName);
        setCurrentView(linkName);
        if (isMobile) {
            setShowSidebar(false);
        }
    };

    return (
        <aside className={`sidebar ${showSidebar ? "sidebar-show" : "sidebar-hide"} ${isMobile ? "mobile-sidebar" : ""}`}>

            <div className="sidebar-content">
                <div className="dashboard-button">
                    <span className="dashboard-text">Dashboard</span>
                    <RxDashboard className="dashboard-icon" />
                </div>

                <ul className="nav-links">
                    {links.map((link) => (
                        <li
                            key={`${role}-${link.name}`}
                            onClick={() => handleLinkClick(link.name)}
                            className={`nav-item ${activeLink === link.name ? "active" : ""}`}
                        >
                            {React.cloneElement(link.icon, { style: { fontSize: "1.2rem", marginRight: '5px' } })}
                            <span>{link.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;