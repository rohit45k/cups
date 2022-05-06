import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

const Success = () => {

    const { orderID } = useParams()
    console.log(orderID);
    useEffect(() => {
        const updateOrderPaymentStatus = async() => {
            const res = axios.put(`http://localhost:5000/api/order/${orderID}`, {
                payment: 'success'
            })

            console.log(res);
        }

        updateOrderPaymentStatus();
    }, [orderID])

    return <h1 className="text-3xl font-bold text-center">Sucess Payment</h1>
}

export default Success;