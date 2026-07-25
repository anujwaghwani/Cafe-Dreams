-- Cafe Dreams Database Schema for Supabase PostgreSQL

-- Create Enum for Order Status
DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'cooking', 'delivered', 'paid');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Drop existing tables if re-running (useful for seeding fresh)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS cafe_tables CASCADE;

-- Create Tables table
CREATE TABLE cafe_tables (
    id SERIAL PRIMARY KEY,
    table_number INT NOT NULL UNIQUE
);

-- Seed tables 1 through 6
INSERT INTO cafe_tables (table_number) VALUES (1), (2), (3), (4), (5), (6)
ON CONFLICT (table_number) DO NOTHING;

-- Create MenuItems table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    half_price DECIMAL(10, 2), -- Nullable, used if item has a 'Half' variant
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    table_id INT REFERENCES cafe_tables(id) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status order_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create OrderItems (Join table for Orders and MenuItems)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    menu_item_id INT REFERENCES menu_items(id) NOT NULL,
    variant VARCHAR(50) DEFAULT 'Full', -- 'Full' or 'Half'
    quantity INT NOT NULL DEFAULT 1,
    subtotal DECIMAL(10, 2) NOT NULL
);

-- SEED DATA for Menu Items
INSERT INTO menu_items (category, name, price, half_price) VALUES
-- Starters
('Starters', 'Veg Manchurian', 110, NULL),
('Starters', 'Chilli Fries', 130, NULL),
('Starters', 'Corn Crispy', 140, NULL),
('Starters', 'Paneer Chilli', 140, NULL),
('Starters', 'Mushroom Chilli', 140, NULL),
('Starters', 'Veg Crispy', 140, NULL),

-- Fried Rice
('Fried Rice', 'Veg Fried Rice', 100, 60),
('Fried Rice', 'Schezwan Fried Rice', 110, 70),
('Fried Rice', 'Manchurian Fried Rice', 120, 70),
('Fried Rice', 'Paneer Fried Rice', 120, 80),
('Fried Rice', 'Cocktail Fried Rice', 120, 80),
('Fried Rice', 'Paneer Schezwan Fried Rice', 130, 80),

-- Noodles
('Noodles', 'Veg Noodles', 100, 60),
('Noodles', 'Schezwan Noodles', 110, 70),
('Noodles', 'Manchurian Noodles', 110, 70),
('Noodles', 'Paneer Noodles', 110, 70),

-- Burger
('Burger', 'Aloo Tikki Burger', 60, NULL),
('Burger', 'Aloo Tikki Cheese Burger', 80, NULL),
('Burger', 'Paneer Burger', 80, NULL),
('Burger', 'Paneer Cheese Burger', 100, NULL),
('Burger', 'Schezwan Burger', 70, NULL),

-- Shakes
('Shakes', 'Cold Coffee', 70, NULL),
('Shakes', 'Strawberry Shake', 80, NULL),
('Shakes', 'Oreo Shake', 100, NULL),
('Shakes', 'Kit-Kat Shake', 110, NULL),
('Shakes', 'Brownie Shake', 130, NULL),

-- Sandwiches
('Sandwiches', 'Veg Sandwich', 60, NULL),
('Sandwiches', 'Veg Cheese Sandwich', 70, NULL),
('Sandwiches', 'Corn Cheese Sandwich', 80, NULL),
('Sandwiches', 'Paneer Cheese Sandwich', 90, NULL),
('Sandwiches', 'Peri-Peri Sandwich', 100, NULL),

-- Maggie
('Maggie', 'Plain Maggie', 40, NULL),
('Maggie', 'Masala Maggie', 45, NULL),
('Maggie', 'Veggie Maggie', 55, NULL),
('Maggie', 'Schezwan Maggie', 55, NULL),
('Maggie', 'Cheese Maggie', 70, NULL),

-- Momos
('Momos', 'Veg Momo', 110, 80),
('Momos', 'Paneer Momo', 130, 80),

-- Fries
('Fries', 'Plain Fries', 80, NULL),
('Fries', 'Peri-Peri Fries', 100, NULL),
('Fries', 'Cheese Fries', 100, NULL),
('Fries', 'Peri-Peri Cheese Fries', 120, NULL),

-- Pizza
('Pizza', 'Margherita', 130, NULL),
('Pizza', 'Corn', 150, NULL),
('Pizza', 'Paneer', 150, NULL),
('Pizza', 'Peri Peri Paneer', 170, NULL),
('Pizza', 'Farm House', 160, NULL),
('Pizza', 'Veggie Extra Cheese', 180, NULL),

-- Soups
('Soups', 'Veg Manchow', 50, NULL),
('Soups', 'Hot & Sour', 50, NULL),
('Soups', 'Tomato', 70, NULL),
('Soups', 'Lemon Coriander', 60, NULL),
('Soups', 'Sweet Corn', 70, NULL),

-- Indian Main Course & Rice
('Indian Main Course', 'Dal Fry', 110, NULL),
('Indian Main Course', 'Dal Tadka', 130, NULL),
('Indian Main Course', 'Kadhai Paneer', 300, NULL),
('Indian Main Course', 'Paneer Butter Masala', 300, NULL),
('Indian Main Course', 'Jeera Rice', 110, NULL),
('Indian Main Course', 'Dal Khichdi Masala', 150, NULL),
('Indian Main Course', 'Veg Biryani', 180, NULL);
