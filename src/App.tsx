import Home from './Components/Home'
import { Route, Routes } from "react-router-dom"
import { isAuthenticate, useAppDispatch, useAppSelector } from './store'
import { useEffect } from 'react'
import { loadAllItemsIntoCart, setIsAuth, showAllProducts } from './slice/ItemSlice/Items'
import axios, { AxiosError } from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { io, Socket } from "socket.io-client"
import { useGetCartItemsMutation, useGetProductsQuery } from './slice/api/apiSlice'
const socket: Socket = io("/api/v1/nsp/address", {
  path: "/store",
  reconnection: false,
  withCredentials:true,
  transports: ["websocket"]
})
function App() {
  const dispatchItem = useAppDispatch()
  const isAuth = useAppSelector(isAuthenticate)
  const { data = [], isLoading, isSuccess, error, isError } = useGetProductsQuery("")
  const [cartItems, { }] = useGetCartItemsMutation()
  const dispatchApp = useAppDispatch()
  useEffect(() => {
    (async function () {
      try {
        const res = await cartItems({ userId: isAuth.isHaveId }).unwrap()
        dispatchItem(loadAllItemsIntoCart(res))
      } catch (error: unknown) {
        const err = error as AxiosError
        console.warn(err)
      }
    })()
  }, [data])

  useEffect(() => {
    dispatchItem(showAllProducts(data))
  }, [data])
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get("/api/v1/user/success", {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        if (Boolean(res.data)) {
          dispatchApp(setIsAuth({
            image: JSON.parse(JSON.stringify(res.data)).image
            ,
            isauth: true,
            id: res.data._id
          }))
        }
      } catch (err: unknown) {
        console.warn(err)
      }
    })()
  }, [data])


  return (
    <div className="App h-full bg-[#dbe3ee]">
      <Home socket={socket} isLoading={isLoading} isSuccess={isSuccess} isError={isError} error={error} />
      <Routes>

      </Routes>
      <Toaster />
    </div>
  )
}
export default App
