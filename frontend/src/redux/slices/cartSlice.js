import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {products: []}
}

const SaveCartToStorage = (cart) => {
    localStorage.setItem("cart",JSON.stringify(cart))
}

//Fetch cart for a user or guest 
export const fetchCart = createAsyncThunk('cart/fetchCart', async ({userId, guestId}, {rejectWithValue }) => {
   try {
    const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
            params: {userId, guestId },
        }
    )
    return response.data;
    
   } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
   }
}
)

//Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk("cart/addToCart", async({productId, quantity,size, color, guestId, userId }, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId, quantity, size, color, guestId, userId
            })
            return response.data;
            } catch (error) {
                console.error(error);
                return rejectWithValue(error.response.data);
                }
})


//Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",async ({ productId, quantity, guestId, userId, size, color},
        {rejectWithValue}) => {
            try {
                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                    productId, quantity, guestId, userId, size, color
                    })
                    return response.data;
            } catch (error) {
                console.error(error);
                return rejectWithValue(error.response.data);
                
            }
        }
)


//Remove an item from the cart 
export const removeCartItem = createAsyncThunk("cart/removeFromCart", async({productId, guestId,
    userId, size, color}, {rejectWithValue}) => {
        try {
            const response = await axios ({
                method: 'DELETE',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                data: {productId, guestId, userId, size, color}
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

//Merge guest cart into User cart 
export const mergeCart = createAsyncThunk("cart/mergeCart", async({guestId, userId}, {rejectWithValue})
=> {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {
                guestId, userId
            },
            {
                headers : {
                    Authorization : ` Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        )
        return response.data;
    } catch (error) {
        return rejectWithValue (error.response.data);
    
    }
}
)

const cartSlice = createSlice({
    name: " cart ",
    initialState : {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = {products: []}
            localStorage.removeItem("cart")
        }
    },
    extraReducers: (builder) => {
        builder
        
    }
})
