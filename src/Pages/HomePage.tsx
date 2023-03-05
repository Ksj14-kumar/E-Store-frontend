import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosError } from 'axios'
import {useEffect} from 'react'
import Error from '../Components/Error'
import MainContainer from '../Components/MainContainer'
import { ItemType, SerializedError } from '../types/types'

type propType = {
    isLoading: boolean,
    isSuccess: boolean,
    error: FetchBaseQueryError | SerializedError | undefined,
    isError: boolean,
    data: ItemType[] ,
    setShowLoginModal:React.Dispatch<React.SetStateAction<boolean>>
}
function HomePage({ error,setShowLoginModal, isLoading, data, isSuccess, isError }: propType) {
    return (
        <>
            {
                isError ? (
                    <>
                        <Error error={error} />
                    </>
                ) :
                    <MainContainer setShowLoginModal={setShowLoginModal} isLoading={isLoading} itemsList={data} isSuccess={isSuccess} />
            }
        </>
    )
}

export default HomePage;