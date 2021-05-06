import React from "react";

export const Product = ({product, onCartClick, onWishlistClick, isInCart, isInWishlist}) => (
    <div key={product.id} className="product-item">
        <h3>{product.id} - {product.category} - {product.title}</h3>
        <h4>{product.price}</h4>
        <p>{product.description}</p>

        <button style={{
            backgroundColor: isInWishlist ? 'red' : ''
        }}
                onClick={onWishlistClick}
        >
            {isInWishlist ? 'remove from wishlist' : 'add to wishlist'}
        </button>

        <button style={{
            backgroundColor: isInCart ? 'red' : ''
        }}
                onClick={onCartClick}
        >
            {isInCart ? 'remove from cart' : 'add to cart'}
        </button>
        <div style={{height: '200px'}}>
            <img style={{height: '100%'}} src={product.image} alt={product.title}/>
        </div>
        <hr/>
    </div>
)