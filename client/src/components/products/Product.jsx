import {Link} from "react-router-dom"

const Product = ({ product }) => {

    console.log(product);

    return (
        <div className="flex flex-col items-center w-full py-4">
            {/* img of the product */}
            <div>
                <img src={product.image} alt="our edible cup" loading="lazy" className="w-auto h-40 mb-4"/>
            </div>
            {/* details of the product and CTA button */}
            <div className="mb-2">
                <h3 className="capitalize">{product.name}</h3>
                <h4>₹ {product.price} ({product.pcs}-pcs)</h4>
                <Link to={product._id} className="capitalize order-2">order now</Link>
            </div>
        </div>
    )
};

export default Product;