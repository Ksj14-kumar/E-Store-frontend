import React from 'react'
type propType = {
    url: string,
    setShowRightSideBar: React.Dispatch<React.SetStateAction<boolean>>,
    showRightSideBar: boolean
}
function Profile_icons({ url, setShowRightSideBar, showRightSideBar }: propType) {
    return (
        <div className="user_info flex justify-center items-center mobile:pr-2 pl-2">
            <div className="avatar cursor-pointer">
                <div className="w-[2rem] rounded-full ring-[2px] ring-primary ring-offset-200   ring-offset-2"
                    onClick={() => {
                        setShowRightSideBar(!showRightSideBar)
                    }}
                >
                    <img src={url} />
                </div>
            </div>
        </div>
    )
}

export default Profile_icons