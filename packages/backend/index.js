const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

let mockOrders = [
  { id: 1, table_id: 2, items: [{ name: 'Latte', quantity: 2 }, { name: 'Croissant', quantity: 1 }], total_amount: 13.50, status: 'pending', payment_method: 'Online' },
];

app.get('/', (req, res) => {
  res.send('Cafe Dreams API');
});

// GET Orders
app.get('/api/orders', async (req, res) => {
  try {
    if (!process.env.DATABASE_URL) return res.json(mockOrders);
    const result = await pool.query(`
      SELECT o.id, ct.table_number as table_id, o.total_amount, o.status, 'Online' as payment_method,
      json_agg(json_build_object('name', mi.name, 'quantity', oi.quantity, 'variant', oi.variant)) as items
      FROM orders o
      JOIN cafe_tables ct ON o.table_id = ct.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
      GROUP BY o.id, ct.table_number
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET Single Order Status
app.get('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!process.env.DATABASE_URL) {
      const order = mockOrders.find(o => o.id === parseInt(id));
      return order ? res.json(order) : res.status(404).json({ error: 'Not found' });
    }
    const result = await pool.query(`
      SELECT o.id, o.status, o.total_amount, ct.table_number as table_id
      FROM orders o
      JOIN cafe_tables ct ON o.table_id = ct.id
      WHERE o.id = $1
    `, [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CREATE Order
app.post('/api/orders', async (req, res) => {
  const { table_id, items, total_amount, payment_method } = req.body;
  try {
    if (!process.env.DATABASE_URL) {
      const newOrder = { id: Date.now(), table_id, items, total_amount, status: 'pending', payment_method };
      mockOrders.unshift(newOrder);
      return res.json({ success: true, order: newOrder });
    }
    
    // Simplistic creation for now, assuming table_id directly maps or finding it.
    // In production we'd do a transaction to insert order and order_items
    const orderResult = await pool.query(
      'INSERT INTO orders (table_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *',
      [table_id, total_amount, 'pending']
    );
    const orderId = orderResult.rows[0].id;
    
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, menu_item_id, variant, quantity, subtotal) VALUES ($1, $2, $3, $4, $5)',
        [orderId, item.id, item.variant, item.quantity, item.price * item.quantity]
      );
    }
    
    res.json({ success: true, order: orderResult.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE Order Status
app.put('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!process.env.DATABASE_URL) {
      const order = mockOrders.find(o => o.id === parseInt(id));
      if (order) order.status = status;
      return res.json({ success: true, order });
    }
    const result = await pool.query('UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *', [status, id]);
    res.json({ success: true, order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => console.log(`Backend listening at http://localhost:${port}`));
