import { useState, useEffect } from "react"
import axios from "axios"

// import products from "../data"
import { Products } from "../components"

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('http://localhost:5000/api/products')
            setProducts(res.data)
        }

        fetchProducts()
    }, [])

    if(!products.length) {
        return <h1 className="text-center text-2xl">Loading...</h1>
    }

    return (
        <section>
            <h1 className="text-5xl text-center">Home Page</h1>
            <Products products={products} />
        </section>
    )
}

export default Home;