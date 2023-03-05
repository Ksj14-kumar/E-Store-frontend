import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ItemType } from '../../types/types';

export const apiSlice = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query<ItemType[], "">({
            query: () => `/api/v1/item/products`,
        }),
        filterItems: builder.query({
            query(q) {
                return {
                    url: `/api/v1/item/qr?q=${q}`,
                    method: "GET"
                }
            }
        }),
        getCartItems: builder.mutation({
            query(userId) {
                return {
                    url: `/api/v1/item/all/${userId.userId}`,
                    method: "POST",
                    body: userId
                }
            }
        })
    }),
})


export const { useGetProductsQuery, useFilterItemsQuery, useGetCartItemsMutation } = apiSlice