DROP TABLE IF EXISTS invoices;
CREATE TABLE invoices (
  id INT PRIMARY KEY,
  ammount INT NOT NULL,
  title VARCHAR NOT NULL,
  invoice_description VARCHAR,
  invoice_date VARCHAR NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
);
SELECT *
FROM invoices;