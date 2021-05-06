import {
    START_PRODUCTS_LOADING,
    END_PRODUCTS_LOADING,
    SET_PRODUCTS,
} from "../action-types";

const startProductsLoading = () => ({type: START_PRODUCTS_LOADING})
const endProductsLoading = () => ({type: END_PRODUCTS_LOADING})
const setProducts = (payload) => ({type: SET_PRODUCTS, payload})

const qsHelper = (params) => {
    const keys = Object.keys(params);
    let result = '';
    if(!keys?.length) return result;

    keys.forEach((el,i) => {
        result += `${el}=${params[el]}`;
        // if (i !== keys.length-1) result+= '&'
        (i !== keys.length-1) && (result+= '&')
    })
    // console.log(result);
    return result
}

const loadProducts = (params) => async (dispatch) => {

    try {
        dispatch(startProductsLoading());
        const resp = await fetch(`https://fakestoreapi.com/products?${qsHelper(params)}`);
        const json = await resp.json();
        dispatch(setProducts(json));
        // console.log(json);
    } catch (e) {
        console.error(e);
    } finally {
        dispatch(endProductsLoading());
    }
}

export {
    startProductsLoading,
    endProductsLoading,
    setProducts,
    loadProducts,
}