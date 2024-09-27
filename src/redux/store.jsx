import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState:{
        name:"Ashik",
        age:"26"
    },
    reducers:{
        updateName:(state,action)=>{
            state.age = action.payload;
        }
    }
});

export const {updateName,updateAge} = userSlice.actions;

const store = configureStore({
    reducer:{
        user: userSlice.reducer
    },
});

export default store;