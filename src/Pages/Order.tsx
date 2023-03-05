import { useEffect, useMemo, useState } from 'react'
import OrderItems from '../Components/Orders/OrderItems'
import { useGetOrdersMutation } from '../slice/api/CartAPI'
import { orderItemType } from '../types/types'
import React from 'react'
function Order() {
    const userId: string = "64005495b07cfce7f0cb4ad3"
    const [getOrders, { isLoading, isSuccess }] = useGetOrdersMutation()
    const [orderItems, setOrderItems] = useState<orderItemType[]>([])
    const getOrderlist = useMemo(() => {
        (async function () {
            try {
                const res: orderItemType[] | string = await getOrders({ userId }).unwrap()
                if (typeof res !== "string") {
                    setOrderItems(res)
                }
            } catch (err) {

            }
        })()
    }, [])
    useEffect(() => {
        getOrderlist
    }, [])

    return (
        <div className='pt-[4rem] px-[10rem] bg-[#d2dde7] pb-2 mobile:px-2 wide:px-2'>
            <header className="previuos_items text-lg font-serif bg-[#f5f2f2] rounded-sm shadow-md py-2 px-4">
                <p className='tracking-wider'>Orders</p>
            </header>
            <div className="mt-2 mobile:w-full wide:w-full">
                {
                    orderItems.map((item:orderItemType, index:number) => {
                        return <OrderItems key={index} item={item}/>
                    })
                }
            </div>
        </div>
    )
}

export default React.memo(Order)