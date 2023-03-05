import Home from './Components/Home'
import { Route, Routes } from "react-router-dom"
import { useAppDispatch } from './store'
import { useEffect } from 'react'
import { loadAllItemsIntoCart, showAllProducts } from './slice/ItemSlice/Items'
import axios, { AxiosError } from 'axios'
import { Toaster } from 'react-hot-toast'
import { io, Socket } from "socket.io-client"
import { useGetCartItemsMutation, useGetProductsQuery } from './slice/api/apiSlice'
const socket: Socket = io(process.env.BACKEND_URL + "/api/v1/nsp/address", {
  path: "/store",
  reconnection: false
})
function App() {
  const dispatchItem = useAppDispatch()
  // TODO:Hide userID
  const userId = "64005495b07cfce7f0cb4ad3"
  const { data = [], isLoading, isSuccess, error, isError } = useGetProductsQuery("")
  const [cartItems, { }] = useGetCartItemsMutation()
  useEffect(() => {
    (async function () {
      try {
        const res = await cartItems({ userId }).unwrap()
        dispatchItem(loadAllItemsIntoCart(res))
      } catch (error: unknown) {
        const err = error as AxiosError
        console.warn(err)
      }
    })()
  }, [])

  useEffect(() => {
    dispatchItem(showAllProducts(data))
  }, [data])


  return (
    <div className="App h-full bg-[#dbe3ee]">
      <Home socket={socket} isLoading={isLoading} isSuccess={isSuccess} isError={isError} error={error} />
      <Routes>
        {/* <Route path='/' element={<Home />}/> */}

      </Routes>
      <Toaster />
    </div>
  )
}
export default App
