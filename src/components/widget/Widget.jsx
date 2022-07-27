import React, { useEffect, useState } from 'react'
import "./widget.scss"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import {collection, query, where , getDoc, getDocs} from "firebase/firestore"
import {db} from '../../firebase'
const Widget = ({type}) => {

    const [amount, setAmount] = useState(null)
    const diff = 20

    let data 
    //temp 




    switch (type) {
        case 'user':
            data={
                title:"USERS",
                isMoney: false,
                link:"See all users",
                icon:(
                    <PersonOutlineOutlinedIcon className='icon' style={{color:"crimson", backgroundColor:"rgba(255,0,0,0.2)"}}/>
                )
            }
            break;
            case 'order':
                data={
                    title:"ORDERS",
                    isMoney: false,
                    link:"View all orders",
                    icon:(
                        <ShoppingCartOutlinedIcon className='icon' style={{color:"goldenrod", backgroundColor:"rgba(218,165,32,0.2)"}}/>
                    )
                }
                break;    case 'earning':
                data={
                    title:"EARNINGS",
                    isMoney: true,
                    link:"View net earnings",
                    icon:(
                        <MonetizationOnOutlinedIcon className='icon' style={{color:"green", backgroundColor:"rgba(0,128,0,0.2)"}}/>
                    )
                }
                break;    case 'balance':
                data={
                    title:"BALANCE",
                    isMoney: true,
                    link:"See all users",
                    icon:(
                        <AccountBalanceOutlinedIcon className='icon' style={{color:"purple", backgroundColor:"rgba(128,0,128,0.2)"}}/>
                    )
                }
                break;
        default:
            break;
    }


    useEffect(()=>{
            const fetchData = async () => {
                const today = new Date()
                const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
                const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
          
                const lastMonthQuery = query(
                  collection(db, data.query),
                  where("timeStamp", "<=", today),
                  where("timeStamp", ">", lastMonth)
                );
                const prevMonthQuery = query(
                  collection(db, data.query),
                  where("timeStamp", "<=", lastMonth),
                  where("timeStamp", ">", prevMonth)
                );
          
                const lastMonthData = await getDocs(lastMonthQuery);
                const prevMonthData = await getDocs(prevMonthQuery);
          
                setAmount(lastMonthData.docs.length);
               
              };
              fetchData();
    },[])

  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && '$'} {amount}</span>
            <span className="link">{data.link}</span>   
        </div>
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpOutlinedIcon/>
                {diff} %
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget