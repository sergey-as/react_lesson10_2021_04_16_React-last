import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    loadProducts,
    toggleItemInCart,
    toggleItemInWishlist
} from "../redux/action-creators";
import {Product} from './Product';

export const Products = () => {
    const {products, isLoading} = useSelector(store => store.products);
    const {productsInCart} = useSelector(store => store.cart);
    const {productsInWishlist} = useSelector(store => store.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProducts({limit: 5}));
    }, []);

    return (
        <div className="product-wrapper">
            {isLoading && (
                <h1 style={{color: 'red'}}>LOADING</h1>
            )}

            {!isLoading && !!products.length && products.map(el => (
                <Product
                    key={el.id}
                    product={el}
                    onCartClick={() => dispatch(toggleItemInCart(el.id))}
                    onWishlistClick={() => dispatch(toggleItemInWishlist(el.id))}
                    isInCart={productsInCart.includes(el.id)}
                    isInWishlist={productsInWishlist.includes(el.id)}
                />
            ))}
            <button>load more</button>
            // 41:15
        </div>
    )
}
