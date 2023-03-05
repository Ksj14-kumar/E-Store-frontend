import React from 'react'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from './Header'
import LoginComponents from './LoginComponents'
import Register from './Register'
type propType = {
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({ setShowLoginModal }: propType) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    return (
        <div className='fixed bg-[#e3dcdcc3] h-full w-full z-[3]'>
            <div className="inner_components flex justify-center items-center  h-full  w-full bg-[#6f85b3] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                <div className="modal_components bg-[#edeff0] drop-shadow-lg w-[30rem]  rounded-md">
                    <Header setShowLoginModal={setShowLoginModal} />
                    <main className="main_body mt-1">
                        <div className="register bg-[#a39999] flex py-1 items-center px-2">
                            <div className={`login ${pathname === "/login" ||pathname === "/" ? "bg-[#c00757]" : "bg-[#084187]"} flex-[6] flex justify-center py-1 rounded-l-md cursor-pointer`}
                                onClick={() => {
                                    navigate("/login")
                                }}
                            >
                                <p className='text-[#ffffff] flex tracking-wider font-serif text-lg'>
                                    login

                                </p>
                            </div>
                            <div className={`register ${pathname === "/register" ? "bg-[#c00757]" : "bg-[#084187]"} bg-[#2980ba] flex-[6] flex justify-center py-1 rounded-r-md cursor-pointer`}
                                onClick={() => {
                                    navigate("/register")
                                }}>
                                <p className='text-[#f8f8f8] flex tracking-wider font-serif  text-lg'>
                                    register
                                </p>
                            </div>
                        </div>
                        <Routes>
                            <Route path='/register' element={<Register />} />
                            <Route path="/login" element={<LoginComponents />} />
                            <Route path="/" element={<LoginComponents />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Login)