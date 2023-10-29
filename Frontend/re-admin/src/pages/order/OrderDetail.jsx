import React, { useState, useEffect } from "react"
import "./order.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useParams } from 'react-router-dom'
const OrderDetail = () => {
    const { id } = useParams()
    const [order, setOrder] = useState({})

    useEffect(() => {
        
    })
  return (
    <div>
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                
            </div>
        </div>
    </div>
  )
}

export default OrderDetail