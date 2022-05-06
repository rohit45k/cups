import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const getUserData = async(user_id) => {
    const user = await axios.get(`http://localhost:5000/api/user/${user_id}`)
    return await user.data
}

const Checkout = () => {

    const navigate = useNavigate()


    const initialFormState =  {
        name: "",
        email: "",
        phone: "",
        gst: "",
        street: "",
        landmark: "",
        zipcode: "",
        city: "",
        state: "",
    }

    
    const [cart_id] = useState(localStorage.getItem("cart_id"))
    const [cart, setCart] = useState({})

    const [step, setStep] = useState("user")

    const [formData, setFormData] = useState(initialFormState)

    useEffect(() => {
        const user_id = localStorage.getItem("user_id") || null
        if(user_id) {
            getUserData(user_id).then(data => setFormData(data))
        }
    }, [])

    useEffect(() => {
        const fetchCart = async() => {
            const res = await axios.get(`http://localhost:5000/api/cart/${cart_id}`)
            setCart(res.data)
        }

        fetchCart()
    }, [cart_id])

    const handleFormChange = (e) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const user_id = localStorage.getItem("user_id") || null;
        if(!user_id) {
            const res = await axios.post("http://localhost:5000/api/user", formData)
            localStorage.setItem("user_id", res.data._id)
        }

        setStep("payment")
    }

    const onPaymentSuccess = async() => {
        const user_id = localStorage.getItem("user_id");
        const cart_id = localStorage.getItem("cart_id")
        const res = await axios.post("http://localhost:5000/api/order", {
            user_id: user_id,
            cart_id: cart_id
        })
        localStorage.removeItem("cart_id")
        const order_id = localStorage.getItem("order") || null
        // if(order_id) {
        //     localStorage.setItem("order", `${res.data._id} ${order_id}`)
        // } else {
        //     localStorage.setItem("order", res.data._id)
        // }
        localStorage.setItem("order", res.data._id)
        console.log(order_id);
        const paytm_res = await axios.post("http://localhost:5000/api/payment", {
            user_id: user_id,
            order_id: order_id
        })
        console.log(paytm_res);
        navigate(`/checkout/success/${res.data._id}`)
    }

    return (
        <div>
            <div>
                <p className="text-lg">Quantity : {cart.qty}</p>
                <p className="text-lg">Subtotal : {cart.subtotal}</p>
                <p className="text-lg">Tax : {cart.tax}</p>
                <p className="text-lg">Total : {cart.total}</p>
            </div>
            <div>

                {
                    step === "user" 
                    ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                Name 
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                Email 
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                Phone 
                                <input 
                                    type="text" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>GST No. <input type="text" name="gst" value={formData.gst} onChange={handleFormChange} /></div>
                            <div>Street<input type="text" name="street" value={formData.street} onChange={handleFormChange}/></div>
                            <div>Landmark<input type="text" name="landmark" value={formData.landmark} onChange={handleFormChange}/></div>
                            <div>Zip<input type="text" name="zipcode" value={formData.zipcode} onChange={handleFormChange}/></div>
                            <div>City<input type="text" name="city" value={formData.city} onChange={handleFormChange}/></div>
                            <div>State<input type="text" name="state" value={formData.state} onChange={handleFormChange}/></div>
                            <button>Next</button>
                        </form>
                    ) : (
                    <div>
                        <h1 className="text-3xl font-semibold">Payment here</h1>
                        <button onClick={onPaymentSuccess}>Pay Success</button>
                        <button>Pay Cancel</button>
                    </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default Checkout