SELECT invoices.id,
  ammount,
  invoice_description,
  title,
  user1.id as user_id,
  balance
FROM invoices
  JOIN users as user1 on invoices.user_id = user1.id;