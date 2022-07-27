import React, { useContext } from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext)

  return (
    <div className="sidebar">
         <div className="top">
            <Link to="/" style={{textDecoration:"none"}}>
            <div className="logo">lamadev</div>
            </Link>
          
         </div>

         <hr />
        <div className="center">
            <ul>
                <p className="title">
                    MAIN
                </p>
                <li>
                    <DashboardIcon className='icon'/>    
                    <span>Dashbord</span></li>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{textDecoration:"none"}}>
                    <li>
                    <PersonOutlineOutlinedIcon className='icon'/>
                    <span>Users</span></li>
                    </Link>
                    <Link to="/products" style={{textDecoration:"none"}}>
                <li>
                    <StoreIcon className='icon'/> 
                    <span>Products</span></li>
                    </Link>
                <li>
                <CreditCardIcon className='icon'/> 
                    <span>Orders</span></li>
                <li>
                <LocalShippingIcon className='icon'/> 
                    <span>Delivery</span></li>
                    <p className="title">USEFUL</p>
                <li>
                <ShowChartIcon className='icon'/> 
                    <span>Stats</span></li>
                <li>
                <NotificationsIcon className='icon'/> 
                    <span>Notifications</span></li>
                    <p className="title">SERVICE</p>
                <li>
                <SettingsSystemDaydreamOutlinedIcon className='icon'/> 
                    <span>System Health</span></li>
                <li>
                <PsychologyOutlinedIcon className='icon'/> 
                    <span>Logs</span></li>
                <li>
                <SettingsIcon className='icon'/> 
                    <span>Settings</span></li>
                    <p className="title">USER</p>
                <li>
                <AccountCircleOutlinedIcon className='icon'/> 
                    <span>Profile</span></li>
                <li>
                <ExitToAppIcon className='icon'/> 
                    <span>Logout</span></li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption" onClick={()=> dispatch({type:"LIGHT"})}></div>
            <div className="colorOption" onClick={()=> dispatch({type:"DARK"})}></div>
        </div>
    </div>
  
  )

}

export default Sidebar