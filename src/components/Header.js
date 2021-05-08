import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

export const Header = () => {
    const {products} = useSelector(store => store.products);
    const {productsInCart} = useSelector(store => store.cart);
    const {productsInWishlist} = useSelector(store => store.wishlist);

    const history = useHistory();

    const culculatedCartSum = useMemo(() => {
        return products
            .filter(el => productsInCart.includes(el.id))
            .reduce((acc, el) => acc += el.price, 0)
    }, [products, productsInCart])

    const culculatedWishlistSum = useMemo(() => {
        return products
            .filter(el => productsInWishlist.includes(el.id))
            .reduce((acc, el) => acc += el.price, 0)
    }, [products, productsInWishlist])

    return (
        <header>
            <h2 onClick={()=>history.push('/')}>HEADER</h2>

            <div className="counters">
                <span>
                    wishlist: {productsInWishlist.length} ($ {culculatedWishlistSum})
                </span>

                <span>
                    cart: {productsInCart.length} ($ {culculatedCartSum})
                </span>
            </div>
        </header>
    )
}
