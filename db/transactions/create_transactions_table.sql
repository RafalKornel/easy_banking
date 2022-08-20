DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id INT PRIMARY KEY,
  ammount INT NOT NULL,
  title VARCHAR NOT NULL,
  transaction_description VARCHAR,
  transaction_date VARCHAR NOT NULL,
  sender_id INT NOT NULL,
  CONSTRAINT fk_sender FOREIGN KEY(sender_id) REFERENCES users(id),
  recipient_id INT NOT NULL,
  CONSTRAINT fk_recipient FOREIGN KEY(recipient_id) REFERENCES users(id)
);
select *
from transactions