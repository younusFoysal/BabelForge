import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import Footer from "../components/Shared/Footer.jsx";
import Navbar from "../components/Shared/Navbar.jsx";

const DashboardLayout = () => {
    return (
        <div className='relative min-h-screen md:flex'>
            <Navbar />
            {/* Sidebar */}
            <Sidebar />

            {/* Outlet --> Dynamic content */}
            <div className='flex-1 md:ml-64'>
                <div className='p-5 mt-12'>
                    <Outlet />
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default DashboardLayout
