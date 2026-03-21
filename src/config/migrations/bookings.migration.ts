const bookingsMigration = `
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    start_date TiMESTAMPZ NOT NULL,
    end_date TiMESTAMPZ NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method_id INT,
    booked_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id),
    FOREIGN KEY (booked_by) REFERENCES users(id)
);
`;

export default bookingsMigration;
