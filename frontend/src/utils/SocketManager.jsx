import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import socket from "../hooks/ConnectSocketIo"
import LiveNotification from "@/components/LiveNotification"
import { addNotifications, addSingleNotification } from "@/store/slice/notification/notificationSlice"

const SocketManager = () => {
  const [data, setData] = useState(null)
  const [notification, setNotification] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (!user) return
    socket.connect()

    // Emit user-online event for live notification tracking
    socket.emit('user-online', user._id)

    socket.emit('register', { userId: user._id, name: user.name }, (data) => {
      dispatch(addNotifications(data))
    })

    socket.on('notification', (data) => {
      // Only show notification if current user is the receiver
      if (data.to === user._id) {
        const notification = {
          from: data.from,
          message: data.message,
          read: data.read,
          type: data.type || 'info'
        }
        setData(notification)
        dispatch(addSingleNotification(data))
        setNotification(true)
      }
    })

    return () => {
      socket.disconnect()
      socket.off('notification')
    }
  }, [user])

  if (!user) return null

  return (
    <>
      {notification && (
        <LiveNotification
          notification={data}
          onClose={() => setNotification(false)}
          duration={5000}
        />
      )}
    </>
  )

}

export default SocketManager
