import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../components/sidebar";
import { getUser } from '../utils/auth';
import AllPatients from "../views/AllPatients";
import AuditLog from "../views/AuditLog";
import CreatePatient from "../views/CreatePatient";
import MyPatients from "../views/MyPatients";


const Dashboard = () => {
    const user = getUser();

    const [showSidebar, setShowSidebar] = useState(false);
    const [currentView, setCurrentView] = useState<string>(
        user?.role === 'admin' ? 'View Patients' : 'Create Patient'
    );
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setShowSidebar(!mobile);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderView = (): React.ReactNode => {
        switch (currentView) {
            case 'Patients':
                return <AllPatients />;
            case 'Audit Logs':
                return <AuditLog />;
            case 'Create Patient':
                return <CreatePatient />;
            case 'My Patients':
                return <MyPatients />;
            default:
                return <div>Select an option from the sidebar.</div>;
        }
    };

    const handleViewChange = (view: string) => {
        setCurrentView(view);
    };

    return (
        <div className="dashboard-container">
            {isMobile && (
                <button
                    className="hamburger-btn"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <GiHamburgerMenu className="hamburger-icon" />
                </button>
            )}

            <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                setCurrentView={handleViewChange}
                isMobile={isMobile}
                role={user?.role || 'clinician'}
            />

            <div
                className={`main-container ${!isMobile && showSidebar ? 'with-sidebar' : ''} ${isMobile && showSidebar ? 'overlay' : ''}`}
                onClick={() => {
                    if (isMobile && showSidebar) {
                        setShowSidebar(false);
                    }
                }}
            >
                <main className="main-content">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;