const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/user', (req, res) => {
  res.json({
    message: 'User API is working',
    user: {
      id: 1,
      name: 'Demo User',
      email: 'user@example.com'
    }
  })
})

app.get('/api/product', (req, res) => {
  res.json({
    message: 'Product API is working',
    products: [
      {
        id: 1,
        name: 'Laptop',
        price: 50000
      }
    ]
  })
})

app.post('/api/order', (req, res) => {
  res.json({
    message: 'Order created successfully',
    order: req.body
  })
})

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000')
})