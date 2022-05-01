import { useState, useEffect } from "react"
import axios from "axios"

const Checkout = () => {

    const initialFormState = {
        name: "",
        email: "",
        phone: "",
        gst: "",
        street: "",
        landmark: "",
        zipcode: "",
        city: "",
        state: ""
    }
    
    const [cart_id] = useState(localStorage.getItem("cart_id"))
    const [cart, setCart] = useState({})

    const [step, setStep] = useState("user")

    const [formData, setFormData] = useState(initialFormState)

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
        const res = await axios.post("http://localhost:5000/api/user", formData)
        console.log(res);
        localStorage.setItem("user_id", res.data._id)

        setStep("payment")
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
                    </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default Checkout