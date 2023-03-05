import { useState, useMemo, useEffect } from "react"
import { Socket } from "socket.io-client"
import Address from "../Components/ProfileInfo/Address"
import Info from "../Components/ProfileInfo/Info"
import { profileType } from "../types/types"
import React from 'react';
import { useGetUserNameMutation } from "../slice/api/UserinfoAPI"
type stateType = {
    profile: boolean,
    add: boolean,
    id: number
}
const url = "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056__340.jpg"
const links: profileType[] = [
    {
        id: 1,
        name: "My Profile"
    },
    {
        id: 2,
        name: "Manage Addresses"
    }
]

type propsType = {
    socket: Socket
}
function Profile({ socket }: propsType) {
    // TODO:Hide user ID
    const userId: string = "64005495b07cfce7f0cb4ad3"
    const [showComponent, setShowComponent] = useState<stateType>({ profile: true, add: false, id: 1 } as stateType)
    const [getUserInfo, { isLoading, isSuccess }] = useGetUserNameMutation()
    const [info, setInfo] = useState<string>("")


    const userInfo = useMemo(() => {
        (async function () {
            try {
                const res = await getUserInfo({ userId }).unwrap()
                setInfo(res)
            } catch (err) {
                console.warn(err)
            }
        })()
    }, [])
    useEffect(() => {
        userInfo
    }, [])

    return (
        <div className='pt-[3.6rem] px-[5rem] flex gap-x-4 bg-[#cfcde5] flex-1 h-full mobile:flex-col mobile:px-0'>
            <div className="left_side flex-[3] bg-[#efebeb] rounded-md shadow-lg p-2 mobile:w-full">
                <section className="top_section bg-[#bebed5] rounded-md drop-shadow-lg mobile:w-full">
                    <div className="wrapper py-1 px-2 flex items-center">
                        <div className="image_container flex-[3]">
                            <div className="image rounded-full w-[2.7rem] h-[2.7rem]">
                                <img src={url} alt="" className="rounded-full w-full h-full" />
                            </div>
                        </div>
                        <div className="message flex-[9]">
                            <p className="text-[1.2rem] truncate text-[#2c2a2a] font-serif tracking-wider">{info}</p>
                        </div>
                    </div>
                </section>
                <section className="bottom_section">
                    <div className="profile">
                        <ul className="px-2 py-2">
                            {links.map((item, index: number) => {
                                return (
                                    <li key={index}
                                        onClick={() => {
                                            if (item.id === 2) {
                                                setShowComponent({ profile: false, add: true, id: 2 })
                                            }
                                            if (item.id === 1) {
                                                setShowComponent({ profile: true, add: false, id: 1 })
                                            }
                                        }}
                                        className={`text-[1.1rem] mb-3 tracking-wider font-serif py-3 text-center rounded-md drop-shadow-lg cursor-pointer bg-[#f3f0f0] hover:bg-[#ffffff] 
                                        ${showComponent.id === 1 && showComponent.profile ?
                                                (
                                                    (item.id === 1 && "bg-[#8dabdf]")
                                                ) :
                                                showComponent.id === 2 && showComponent.add &&
                                                (
                                                    (item.id === 2 && "bg-[#8dabdf]")
                                                )
                                            }
                                        `}>{item.name}</li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
            </div>
            {
                (showComponent.profile && showComponent.id === 1) ? (<Info />) : (<Address sidebar={true} socket={socket} />)
            }
        </div>
    )
}
export default React.memo(Profile)