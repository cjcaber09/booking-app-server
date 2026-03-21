const paymentsMigration = `
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export default paymentsMigration;
