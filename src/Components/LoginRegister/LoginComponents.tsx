import React from 'react'
import Side_Login from './Side_Login'
const inputFieldsArray = [
    {
        name: "email",
        id: 1
    },
    {
        name: "password",
        id: 2
    }
]
function LoginComponents() {
    return (
        <div>
            <div className="components mb-2">
                <div className="wrapper_  flex flex-col justify-center items-center px-[2rem] py-4">
                    {inputFieldsArray.map((item) => {
                        return (<div key={item.id} className="input_fields w-[90%] py-2">
                            <input type="text" placeholder={item.name} className="input w-full  input-sm input- input-bordered input-info   " />
                        </div>
                        )
                    })}

                </div>
                <footer className="footer px-[2rem]">
                    <button className='btn flex bg-[#1f0686] justify-center items-center btn-block btn-sm'>login</button>
                </footer>
            </div>
            <div className="divider h-[.4rem] font-serif tracking-wider text-[1rem]">via</div>
            <Side_Login/>
        </div>
    )
}

export default React.memo(LoginComponents)