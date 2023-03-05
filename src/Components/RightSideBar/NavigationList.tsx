import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { rigthSidebarList } from '../../types/types'
import React from 'react'
type propType = {
    item:rigthSidebarList,
    id: number
}
function NavigationList({ item, id }: propType) {
    const navigate = useNavigate()
    return (
        <motion.li
            initial={{ scale: 1 }}
            transition={{ duration: .5 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
                navigate(item.path)
            }}
            key={id}
            className='text-[1.4rem] flex bg-[#e6e1e1] cursor-pointer hover:bg-[#f2efef] rounded-md items-center px-4 py-2 drop-shadow-lg mb-2'>
            <p className="text-[1.4rem] cursor-pointer truncate">
                {item.icon}
            </p>
            <p className='text-[1.2rem] cursor-pointer pl-3 truncate tracking-wider'>{item.name}</p>
        </motion.li>
    )
}

export default React.memo(NavigationList)