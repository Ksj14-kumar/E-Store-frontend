import { AxiosError } from 'axios';
import EmptyCart from '../Components/EmptyCart';
import FinalPrice from '../Components/RightSideBar/FinalPrice';
import ItemList from '../Components/ItemList';
import { useAddProductMutation, useDeleteItemMutation } from '../slice/api/CartAPI';
import { addItem, decreaseItemCount, removeItem } from '../slice/ItemSlice/Items';
import { ItemListInCart, useAppDispatch, useAppSelector } from '../store';
import { CartItemStatusType, ItemType } from '../types/types';
import React from 'react'
type propType = {
    sidebar: boolean,
    finalTotalAmount: boolean
}
function Cart({ sidebar, finalTotalAmount }: propType) {
    const userId:string="64005495b07cfce7f0cb4ad3"
    const { totalAmout, totalItem, itemsList } = useAppSelector(ItemListInCart)
    const dispatchItem = useAppDispatch()
    const [addProduct, { isLoading, isSuccess, error, isError }] = useAddProductMutation()
    const [popItem, { }] = useDeleteItemMutation()
    //TODO: Handle userId
    const addItemsInCart = async (item: ItemType): Promise<void> => {
        try {
            dispatchItem(addItem(item))
            await addProduct({ item: item, userId }).unwrap()
        } catch (err) {
            // TODO:Handle error
            const error = err as AxiosError
            console.log(error)
        }
    }
    const removeItemFromCart = async (itemId: Pick<ItemType, "id"> & { status: number }) => {
        try {
            if (itemId) {
                if (itemId.status === 1) {
                    dispatchItem(decreaseItemCount({ id: itemId.id }))
                    await popItem({
                        userId,
                        status: 1,
                        params: itemId.id
                    }).unwrap()
                }
                else {
                    dispatchItem(removeItem({ id: itemId.id }))
                    await popItem({
                        userId,
                        status: 2,
                        params: itemId.id
                    }).unwrap()
                }
            }
        } catch (err) {
            // TODO:// handle this error
            const error = err as AxiosError
            console.log(error)
        }
    }
    const listItem: CartItemStatusType[] = [
        {
            id: 1,
            name: `Price(${totalItem} items)`,
            status: `$${Math.round(totalAmout)}`
        },
        {
            id: 2,
            name: "Discount",
            status: "$0"
        },
        {
            id: 3,
            name: "Delivery Charges",
            status: "Free"
        }
    ]
    return (
        <>
            {totalItem === 0 ? <EmptyCart /> :
                <div className='pt-[3.7rem]  flex mobile:flex-col mobile:px-0 justify-center px-4 gap-x-2 bg-[#c1cee7] relative mobile:pb-[1rem] rounded-md'>
                    {!finalTotalAmount && <div className="left_side bg-[#d4d0d0] rounded-md flex-[7]">
                        {itemsList.map((item: ItemType, index: number) => {
                            return <ItemList removeItemFromCart={removeItemFromCart} addItems={addItemsInCart} key={index} item={item} />
                        })}
                    </div>}
                    {sidebar &&
                        <div className="right_side bg-[#f3f2f2] mobile:mt-[1.6rem] flex-[3] min-h-full  rounded-md mobile:pb-[3rem]">
                            <FinalPrice listItem={listItem} totalAmout={totalAmout} sidebar={sidebar} />
                        </div>
                    }
                    {
                        finalTotalAmount && <div className="right_side bg-[#f3f2f2] mobile:mt-[1.6rem] flex-[3] min-h-full   rounded-md mobile:pb-[3rem] mb-2">
                            <FinalPrice listItem={listItem} totalAmout={totalAmout} sidebar={sidebar} />
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default React.memo(Cart)