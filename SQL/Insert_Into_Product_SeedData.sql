IF NOT EXISTS (Select * FROM Product)
BEGIN
	INSERT INTO Product ([Name], [Description], DateAdded, Quantity)
	VALUES 
		('Shirt', 'Long-sleeved and red.', GETDATE(), 50),
		('Pants', 'pleated and blue.', GETDATE(), 50)
END
