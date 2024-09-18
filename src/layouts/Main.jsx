import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar'
import Footer from '../components/Shared/Footer/Footer.jsx'
const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='pt-6 min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Main
