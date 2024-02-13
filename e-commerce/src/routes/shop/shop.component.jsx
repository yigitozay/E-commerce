import { ProductsContext } from '../../contexts/product.context';
import { useContext } from 'react';
import ProductCard from '../../Components/Product-Card/product-card.component';
import './shop.styles.scss';
const Shop = () =>{
    const {products} = useContext(ProductsContext);
    return (
        <div className='products-container'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Shop;