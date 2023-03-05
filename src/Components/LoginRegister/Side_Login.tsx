import React from 'react'

function Side_Login() {
    return (
        <div className="wrapper_side_login mb-2">
            <div className="google_login w-full flex px-[2rem] mb-1">
                <button className='btn bg-[#ce0e15] btn-block btn-sm'>google</button>
            </div>
            <div className="google_login w-full flex px-[2rem]">
                <button className='btn bg-[#1d038f] btn-block btn-sm'>facebook</button>
            </div>
        </div>
    )
}

export default React.memo(Side_Login)