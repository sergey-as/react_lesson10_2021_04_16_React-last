// https://www.youtube.com/watch?v=_ZK-FWGWRdk   - Redux-middlewares-async
//https://www.youtube.com/watch?v=IzJwxfMoQnc   - Redux-middlewarer-hw
// https://www.youtube.com/watch?v=HEPH5W9lkwA   - React-last
//
// hw:
// 1. Написати усе, що було у лекції - ОК
// 2. Кожному товару додати кнопку "Add to wishlist" та "Add to Shopping Cart"
// після кліку та додавання кнопки змінюють колір
// при повторному кліку вилучаємо з (корзини, вішліста)
// 3. header: count in wishlist, count in Shopping Cart, total summa in wishlist, total summa in Shopping Cart
// 4!!! зберегти це все на localStorage (через middleware, або не через middleware, або на рівні action

import {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from "react-redux";

import './App.css';

import {
    loadProducts,
    toggleItemInCart,
    toggleItemInWishlist,
} from './redux/action-creators'

// import {store} from "./redux";

const Header = () => {
    const {products} = useSelector(store => store.products);
    const {productsInCart} = useSelector(store => store.cart);
    const {productsInWishlist} = useSelector(store => store.wishlist);

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
            <h2>HEADER</h2>

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

const Products = () => {
    const {products, isLoading} = useSelector(store => store.products);
    // console.log('products', products, 'isLoading', isLoading);
    const {productsInCart} = useSelector(store => store.cart);
    const {productsInWishlist} = useSelector(store => store.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        // fetchProducts();
        // setProducts();
        dispatch(loadProducts());
    }, []);

    return (
        <div className="product-wrapper">
            <h1>
                products list
            </h1>
            {isLoading && (
                <h1 style={{color: 'red'}}>LOADING</h1>
            )}

            {!isLoading && !!products.length && (
                products.map(el => (
                    <div key={el.id} className="product-item">
                        <h3>{el.id} - {el.category} - {el.title}</h3>
                        <h4>{el.price}</h4>
                        <h4>{el.description}</h4>

                        <button style={{
                            backgroundColor: productsInWishlist.includes(el.id) ? 'red' : ''
                        }}
                                onClick={() => dispatch(toggleItemInWishlist(el.id))}
                        >
                            {productsInWishlist.includes(el.id) ? 'remove from wishlist' : 'add to wishlist'}
                        </button>

                        <button style={{
                            backgroundColor: productsInCart.includes(el.id) ? 'red' : ''
                        }}
                                onClick={() => dispatch(toggleItemInCart(el.id))}
                        >
                            {productsInCart.includes(el.id) ? 'remove from cart' : 'add to cart'}
                        </button>

                        <img style={{width: '100%'}} src={el.image} alt={el.title}/>
                        <hr/>
                    </div>
                ))
            )}
        </div>
    )
}


function App() {

    return (
        <div className="App">
            <Header/>
            <Products/>
        </div>
    );
}

export default App;