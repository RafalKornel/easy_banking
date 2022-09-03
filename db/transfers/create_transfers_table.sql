DROP TABLE IF EXISTS transfers;
CREATE TABLE transfers (
  id INT PRIMARY KEY,
  ammount INT NOT NULL,
  title VARCHAR NOT NULL,
  transfer_description VARCHAR,
  transfer_date VARCHAR NOT NULL,
  sender_id INT NOT NULL,
  CONSTRAINT fk_sender FOREIGN KEY(sender_id) REFERENCES users(id),
  recipient_id INT NOT NULL,
  CONSTRAINT fk_recipient FOREIGN KEY(recipient_id) REFERENCES users(id)
);
select *
from transfers;