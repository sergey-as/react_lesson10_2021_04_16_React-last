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

import React from "react";

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import {Header, Products, ProductDetails} from './components';

function App() {

    return (
        <Router>
            <div className="App">
                <Header/>

                <Switch>
                    <Route path='/' exact>
                        <Redirect to="/products"/>
                    </Route>
                    // 59:59
                    <Route path='/products' exact>
                        <Products/>
                    </Route>

                    <Route path='/products/:id'>
                        <ProductDetails/>
                    </Route>

                    <Route path='/cart'>
                        <div>cart</div>
                    </Route>

                    <Route path='/wishlist'>
                        <div>wishlist</div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;