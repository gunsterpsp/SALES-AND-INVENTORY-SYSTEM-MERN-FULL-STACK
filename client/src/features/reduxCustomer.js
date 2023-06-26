import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    customer: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const getCustomer = createAsyncThunk("customer/getCustomer", async(customer, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:8000/customers/spGetAllCustomers/value1/value2/value3/value4', {
            customer_id: customer.customer_id,
            customer_code: customer.customer_code,
            customer_name: customer.customer_name,
            customer_status: customer.customer_status
        });
        return response.data[0];
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});


export const reduxCustomer = createSlice({
    name: "customer",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(getCustomer.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getCustomer.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getCustomer.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const {reset} = reduxCustomer.actions;
export default reduxCustomer.reducer;