import React from 'react'

function Sample() {
    const checkout = () => {
        fetch("http://localhost:4000/payment", {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          mode:"cors",
          body: JSON.stringify({
            items: [
              {price:200}
            ]
          })
        })
        .then(res => {
            console.log(res);
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        })
        .then(({url})=>{
          window.location = url
        })
        .catch(e => {
          console.log(e.error)
        })
      }
  return (
    <>
        <button onClick={checkout}>Test Mode</button>
    </>
  )
}

export default Sample