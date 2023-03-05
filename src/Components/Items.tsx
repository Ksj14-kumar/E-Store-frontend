import { ItemType } from '../types/types'
import { MdStar } from "react-icons/md"
import { isAuthenticate, useAppDispatch, useAppSelector } from '../store'
import { addItem } from '../slice/ItemSlice/Items'
import { AxiosError } from "axios"
import { useAddProductMutation } from '../slice/api/CartAPI'
import React from 'react'
type propType = {
    item: ItemType,
    setShowLoginModal:React.Dispatch<React.SetStateAction<boolean>>
}
function Items({ item,setShowLoginModal }: propType) {
    const userId:string="64005495b07cfce7f0cb4ad3"
    const dispatchItem = useAppDispatch()
    const isAuth= useAppSelector(isAuthenticate)
    const [addnewItem, { isLoading, isError, isSuccess, error }] = useAddProductMutation()
    // TODO:remove userId
    async function dispatchItemToStore(item: ItemType) {
        try {
            dispatchItem(addItem(item))
            await addnewItem({
                item,
                userId,
            }).unwrap()
        } catch (err: unknown) {
            // TODO:ERRor handle in rtk query
            const error = err as AxiosError
            console.log(error)
        }
    }
    return (
        <div data-aos="fade-up" data-aos-duration={1500} data-aos-mirror="true" className="card w-64 mobile:w-full bg-base-100 shadow-xl px-2 pb-2">
            <figure className='py-2'><img className='rounded-md w-full' src={item.image} alt="Shoes" /></figure>
            <div className="card-body bg-[#f4f0f0] rounded-md flex justify-center">
                <h2 className="card-title text-center text-[.9rem]">{item.title}</h2>
                <div className="rating select-none flex justify-between px-2 py-1 items-center">
                    <div className="price">
                        <p className='text-[1.3rem] font-serif'><span>&#8377;</span>
                            {Math.round(item.price)}</p>
                    </div>
                    <div className='rating wrapper flex justify-center items-center bg-[#048324] rounded-md px-2'>
                        <p className='text-[1rem] text-[#fff] select-none'>{item.rating.rate}</p>
                        <p className='pl-1 flex justify-center items-center'><MdStar className='text-[1rem] select-none text-[#ffffff]' /></p>
                    </div>
                </div>
                <div className="button_Wrapper flex justify-evenly w-full gap-x-2">
                    <button className="btn bg-[#06C4CC] border-none btn-sm"
                        onClick={() => {
                            if(isAuth){
                                dispatchItemToStore(item)
                            }
                            else{
                                setShowLoginModal(true)
                            }
                            
                        }}
                    >Add to Cart</button>
                    <button className="btn bg-[#f2c40b] border-none btn-sm">Buy Now</button>
                </div>
            </div>
        </div>
    )
}
export default React.memo(Items)