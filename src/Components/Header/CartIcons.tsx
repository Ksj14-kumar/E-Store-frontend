import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsCart3 } from "react-icons/bs"
import { ItemSelector, useAppSelector } from '../../store'
type propType = {
    isAuthenticateUser: boolean
}
function CartIcons({ isAuthenticateUser }: propType) {
    const ItemsListInCart = useAppSelector(ItemSelector)
    const navigate = useNavigate()
    return (
        <div className="cart relative p-3 cursor-pointer"
            onClick={() => {
                navigate("/cart")
            }}
        >
            <div className="icons_cart">
                <BsCart3 className='text-[1.3rem]' />
            </div>
            <div className="indicator absolute top-3 right-3">
                {isAuthenticateUser && <span className="indicator-item badge bg-[#ed0505] outline-none border-none">{ItemsListInCart.totalItem}
                </span>}
            </div>
        </div>
    )
}

export default CartIcons