'use client'
 const getUserInfo = async (id: string) => {
  if (id) {
    const data = await fetch('/api/getUser', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
  })
  const res = await data.json()
  return res
  }

};

export default getUserInfo;