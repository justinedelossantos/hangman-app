import React from 'react'

const Notif = ({showNotif }) => {
    return (
        <div className={`notification-container ${showNotif ? 'show' : ''} `}>
        <p>You have already entered this letter</p>
      </div>
    )
}

export default Notif
