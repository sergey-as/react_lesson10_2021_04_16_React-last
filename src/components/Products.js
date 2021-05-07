import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    loadProducts,
    toggleItemInCart,
    toggleItemInWishlist
} from "../redux/action-creators";
import {Product} from './Product';
import {useHistory} from "react-router-dom";

const LIMIT_STEP = 5;

export const Products = () => {
    const {products, isLoading} = useSelector(store => store.products);
    const {productsInCart} = useSelector(store => store.cart);
    const {productsInWishlist} = useSelector(store => store.wishlist);
    const history = useHistory();
    const [currentLimit, setCurrentLimit] = useState(5);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProducts({limit: currentLimit}));
    }, [currentLimit]);

    return (
        <>
            <div className="product-wrapper">
                {isLoading && (
                    <h1 style={{color: 'red'}}>LOADING</h1>
                )}

                {!isLoading && !!products.length && products.map(el => (
                    <div key={el.id} className="product-item" onClick={() => history.push(`/products/${el.id}`)}>
                        <Product
                            product={el}
                            onCartClick={() => dispatch(toggleItemInCart(el.id))}
                            onWishlistClick={() => dispatch(toggleItemInWishlist(el.id))}
                            isInCart={productsInCart.includes(el.id)}
                            isInWishlist={productsInWishlist.includes(el.id)}
                        />
                    </div>
                ))}
            </div>
            {products.length < 20 &&
            <button onClick={() => setCurrentLimit(prev => prev += LIMIT_STEP)}>load more</button>}
        </>
    )
}
