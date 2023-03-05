import { useState, useEffect } from 'react'
import { GrSearch } from "react-icons/gr"
import { ItemType, rigthSidebarList } from '../types/types';
import { useNavigate } from "react-router-dom"
import { FaUserAlt } from "react-icons/fa"
import { AiOutlineLogout } from "react-icons/ai"
import { VscArchive } from "react-icons/vsc"
import { AnimatePresence, motion } from 'framer-motion';
import HistoryList from './HistoryList';
import NavigationList from './RightSideBar/NavigationList';
import { useFilterItemsQuery } from '../slice/api/apiSlice';
import Profile_icons from './Header/Profile_icons';
import CartIcons from './Header/CartIcons';
import { isAuthenticate, useAppDispatch, useAppSelector } from '../store';
import { showAllProducts } from '../slice/ItemSlice/Items';
const url = "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056__340.jpg"
const rightSideBarList = [
    {
        id: 1,
        name: "My Profile",
        icon: <FaUserAlt className="text-[1.3rem]" />,
        path: "/profile"
    },
    {
        id: 2,
        name: "Orders",
        icon: <VscArchive className="text-[1.3rem]" />,
        path: "/orders"

    },
    {
        id: 3,
        name: "logout",
        icon: <AiOutlineLogout className="text-[1.3rem]" />,
        path: "/logout"
    }
]

type propType = {
    setItemList: React.Dispatch<React.SetStateAction<ItemType[]>>,
    itemList: ItemType[]
}
function Header({ setItemList, itemList }: propType) {
    const [showRightSideBar, setShowRightSideBar] = useState<boolean>(false)
    const [Query, setQuery] = useState<string>("")
    const dispatchItems= useAppDispatch()
    const isAuth= useAppSelector(isAuthenticate)
    const [showFocus, setShowFocus] = useState<boolean>(false)
    const { data, isLoading } = useFilterItemsQuery(Query)
    const navigate = useNavigate()
    useEffect(() => {
        dispatchItems(showAllProducts(data))
    }, [data])
    function onInputSearchHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value.toLowerCase())
    }
    return (
        <div className='w-full bg-[#e2e2e5] flex py-[.1rem] items-center fixed z-[1] drop-shadow-md'>
            <div className="left_ flex-[2]">
                <p className='text-[1.4rem] font-sans tracking-wider indent-3 italic cursor-pointer text-[#0a0a0a]'
                    onClick={() => {
                        navigate("/")
                    }}
                >Store</p>
            </div>
            <div className="center  flex justify-center w-full flex-[7]">
                <div className="search_bar w-full flex justify-center px-4  py-[.3rem] relative  flex-col">
                    {/* <div className="icons absolute left-[1.9rem] z-[2] top-[-.29rem]">
                        <GrSearch className='text-[1.2rem]'/>
                    </div> */}
                    {/* <label htmlFor="search"><GrSearch/></label> */}
                    <input type="search"
                        placeholder='search...'
                        onFocus={() => {
                            setShowFocus(true)
                        }}
                        onBlur={() => {
                            setShowFocus(false)
                        }}
                        className={`w-full rounded-md py-[.3rem]  indent-2 font-serif tracking-wider outline-none shadow-md pr-1 ${showFocus ? "rounded-bdr-none" : ""}`}
                        id='search'
                        onChange={onInputSearchHandler}
                    />
                    {
                        // showFocus && <HistoryList />
                    }
                </div>
            </div>
            {/* =====================================CART Icons================================= */}
            <div className="right flex justify-evenly flex-[3]">
               <CartIcons />
                {/* ==================================Profile Icons======================== */}
                {isAuth&&<Profile_icons url={url} showRightSideBar={showRightSideBar} setShowRightSideBar={setShowRightSideBar}/>}

                <AnimatePresence>
                    {showRightSideBar && <motion.div
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: .5, type: "tween" }}
                        exit={{ opacity: 0, x: 300 }}
                        className="right_side_bar fixed w-[13rem] top-[3rem] right-0 bg-[#c2bdbd] h-screen rounded-md ">
                        <div className="container2 w-full">
                            <ul className='w-full px-2 py-3'>
                                {
                                    rightSideBarList.map((item: rigthSidebarList, index) => {
                                        return <NavigationList item={item} id={index} />
                                    })
                                }
                            </ul>

                        </div>
                    </motion.div>}
                </AnimatePresence>
            </div>

        </div >
    )
}

export default Header