SELECT transfers.id,
  ammount,
  recipient_id,
  sender_id,
  title,
  transfer_date,
  transfer_description,
  user1.username as recipient_username,
  user2.username as recipient_username
FROM transfers
  JOIN users as user1 on transfers.recipient_id = user1.id
  JOIN users as user2 on transfers.sender_id = user2.id;