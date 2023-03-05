import { createAsyncThunk, createSlice, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit"
import { itemAddType, ItemType } from "../../types/types"
import { getCartItemFromDBType } from "../../types/types"
import { register } from "./util"
// const addItemIntoCart=

const regi = createAsyncThunk("", async () => {
    try {

        const res = register()
        console.log({ res })
    } catch (err) {
        console.log(err)
        return
    }
})

type initialType = {
    items: ItemType[],
    totalItem: number,
    amount: number
}
const initialState: initialType = {
    items: [],
    totalItem: 0,
    amount: 0

}
type productsType = {
    products: ItemType[],
    isAuth: boolean
}
const productsItems: productsType = {
    products: [],
    // isAuth: Boolean(localStorage.getItem("userId"))
    isAuth: false
}

const ItemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        loadAllItemsIntoCart: (state, { payload }: PayloadAction<getCartItemFromDBType>) => {
            if (payload && payload.items) {
                state.items = payload.items
                state.totalItem = payload.totalItems
                state.amount = payload.totalAmount
            }
        },
        addItem: (state, action: PayloadAction<ItemType>) => {
            let totalItem: number = 0;
            let totalAmount: number = 0
            const isItemExist = state.items.some(item => item.id === action.payload.id)
            if (isItemExist) {
                const getItemsIndex = state.items.findIndex(item => item.id === action.payload.id)
                if (getItemsIndex !== -1) {
                    const updateCount = {
                        ...state.items[getItemsIndex],
                        count: state.items[getItemsIndex].count + 1
                    }
                    state.items.splice(getItemsIndex, 1, updateCount)
                    state.items.forEach((item) => {
                        totalItem += item.count
                        totalAmount += (item.count * Math.round(item.price))
                    })
                    state.totalItem = totalItem
                    state.amount = totalAmount
                }
            }
            else {
                state.items.push({ ...action.payload, count: 1 })
                state.totalItem = state.totalItem + 1
                state.amount = state.amount + Math.round(action.payload.price)
            }
        },
        removeItem: (state, action: PayloadAction<Pick<ItemType, "id">>) => {
            let totalItems = 0;
            let totalAmount = 0;
            const findItemIndex = state.items.findIndex((item) => item.id === action.payload.id)
            if (findItemIndex !== -1) {
                state.items.splice(findItemIndex, 1)
            }
            state.items.forEach((item) => {
                totalAmount += item.count * Math.round(item.price)
                totalItems += item.count
            })
            state.totalItem = totalItems
            state.amount = totalAmount
        },
        decreaseItemCount: (state, action: PayloadAction<Pick<ItemType, "id">>) => {
            const isExist = state.items.some((item) => item.id === action.payload.id)
            let updateAmount = 0;
            let totalItems = 0
            if (isExist) {
                const findItemIndex: number = state.items.findIndex((item => item.id === action.payload.id))
                if (findItemIndex !== -1) {
                    if (state.items[findItemIndex].count === 1) {
                        //remove item when count==0
                        state.items = state.items.filter(item => item.id !== action.payload.id)
                    }
                    else {
                        //otherwise decrease
                        const updateCount = {
                            ...state.items[findItemIndex],
                            count: state.items[findItemIndex].count - 1
                        }
                        state.items[findItemIndex] = updateCount
                    }
                    state.items.forEach((item) => {
                        updateAmount += (item.count * Math.round(item.price))
                        totalItems += item.count
                    })
                    state.amount = updateAmount
                    state.totalItem = totalItems
                }
            }
        }
    }
})

const productItems = createSlice({
    name: "products",
    initialState: productsItems,
    reducers: {
        showAllProducts: (state, action: PayloadAction<ItemType[]>) => {
            state.products = action.payload
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(regi.fulfilled, (state, action) => {

            })
    }
})



export const { addItem, decreaseItemCount, removeItem, loadAllItemsIntoCart } = ItemSlice.actions
export const { showAllProducts } = productItems.actions
export const productsItemReducer = productItems.reducer
const ItemReducer = ItemSlice.reducer
export default ItemReducer