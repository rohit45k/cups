import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

const Fail = () => {

    const { orderId } = useParams()

    useEffect(() => {
        const updateOrderPaymentStatus = async() => {
            const res = axios.put(`http://localhost:5000/api/order/${orderId}`, {
                payment: 'failed'
            })

            console.log(res);
        }

        updateOrderPaymentStatus();
    }, [orderId])

    return <h1 className="text-3xl font-bold text-center">Fail Payment</h1>
}

export default Fail;