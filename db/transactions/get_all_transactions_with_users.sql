SELECT transactions.id,
  ammount,
  recipient_id,
  sender_id,
  title,
  transaction_date,
  transaction_description,
  user1.username as recipient_username,
  user2.username as recipient_username
FROM transactions
  JOIN users as user1 on transactions.recipient_id = user1.id
  JOIN users as user2 on transactions.sender_id = user2.id;