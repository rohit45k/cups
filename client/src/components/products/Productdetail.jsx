import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"

const ProductDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`http://localhost:5000/api/products/${id}`)
            setProduct(res.data[0])
        }

        fetchProducts()
    }, [id])

    const addQuantity = () => {
        setQuantity(prevQty => prevQty + 1)
    }

    const subtractQuantity = () => {
        setQuantity(prevQty => prevQty > 2 ? prevQty - 1 : 1)
    }

    const saveCart = async () => {
        const res = await axios.post(`http://localhost:5000/api/cart`, {
            prod_id: id,
            qty: quantity
        })
        console.log(res);
        navigate("/checkout")
    }

    return (
        <div className="flex space-x-4">
            <div className="w-auto h-72">
                <img src={product.image} alt="cup" className="w-full h-full"/>
            </div>
            <div>
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <h2 className="text-xl font-bold">{product.desc}</h2>
                <h2 className="text-xl font-bold">{product.price}</h2>
                <h2 className="text-xl font-bold">{product.code}</h2>
                <h2 className="text-xl font-bold">{product.available}</h2>
                <div>
                    <button onClick={addQuantity}>+</button>
                    <input className="w-6" type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
                    <button onClick={subtractQuantity}>-</button>
                </div>
                <button onClick={saveCart}>Checkout</button>
            </div>
        </div>
    )
}

 export default ProductDetail