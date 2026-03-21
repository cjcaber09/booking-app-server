const table = "payment_methods";

const paymentMethodsMigration = `
CREATE TABLE IF NOT EXISTS ${table} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export default paymentMethodsMigration;
