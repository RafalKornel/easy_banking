SELECT invoices.id,
  ammount,
  invoice_description,
  invoice_date,
  title,
  user1.id as user_id,
  user1.username as username,
  balance
FROM invoices
  JOIN users as user1 on invoices.user_id = user1.id
WHERE user1.id = 2;