import Product from "./Product";


const Products = ({ products }) => {
    return (
        <section>
            <div className="px-4">
                {
                    products?.map(product => <Product key={product.id} product={product}/>)
                }
            </div>
        </section>
    )
};

export default Products;