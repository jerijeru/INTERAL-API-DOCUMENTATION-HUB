import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [selectedApi, setSelectedApi] = useState(null)
  const [userData, setUserData] = useState(null)
  const [productData, setProductData] = useState(null)
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
  fetch('http://localhost:5000/api/user')
    .then((response) => response.json())
    .then((data) => setUserData(data))
    .catch((error) => console.error('User Error:', error))

  fetch('http://localhost:5000/api/product')
    .then((response) => response.json())
    .then((data) => setProductData(data))
    .catch((error) => console.error('Product Error:', error))
}, [])
const createOrder = () => {
  fetch('http://localhost:5000/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product: 'Laptop',
      quantity: 1
    })
  })
    .then((response) => response.json())
    .then((data) => setOrderData(data))
    .catch((error) => console.error('Order Error:', error))
}
  const apis = [
    {
      name: 'User API',
      description: 'Manage user information and authentication.',
      method: 'GET'
    },
    {
      name: 'Product API',
      description: 'Access product details and information.',
      method: 'GET'
    },
    {
      name: 'Order API',
      description: 'Manage orders and order status.',
      method: 'POST'
    }
  ]

  const filteredApis = apis.filter((api) =>
    api.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <header>
        <h1>Internal API Documentation Hub</h1>
        <p>Explore and understand our internal APIs</p>
      </header>

      <main>
        <input
          type="text"
          placeholder="Search APIs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <h2>Available APIs</h2>

        {filteredApis.map((api) => (
          <div
            key={api.name}
            onClick={() => setSelectedApi(api)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{api.name}</h3>
            <p>{api.description}</p>

            <strong className={api.method.toLowerCase()}>
              {api.method}
            </strong>
          </div>
        ))}

        {selectedApi && (
          <div className="api-documentation">
            <h2>{selectedApi.name} Documentation</h2>
            <p>{selectedApi.description}</p>
{selectedApi.name === 'User API' && userData && (
  <div>
    <h3>Backend Response</h3>
    <p>{userData.message}</p>
    <p>User ID: {userData.user.id}</p>
    <p>Name: {userData.user.name}</p>
    <p>Email: {userData.user.email}</p>
  </div>
)}
{selectedApi.name === 'Product API' && productData && (
  <div>
    <h3>Backend Response</h3>
    <p>{productData.message}</p>
    <p>Product ID: {productData.products[0].id}</p>
    <p>Product Name: {productData.products[0].name}</p>
    <p>Price: ₹{productData.products[0].price}</p>
  </div>
)}
{selectedApi.name === 'Order API' && (
  <div>
    <h3>Create Order</h3>

    <button onClick={createOrder}>
      Create Test Order
    </button>

    {orderData && (
      <p>{orderData.message}</p>
    )}
  </div>
)}
            <h3>Endpoint</h3>

            <p className="endpoint">
              {selectedApi.method} /api/
              {selectedApi.name.toLowerCase().replace(' api', '')}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App