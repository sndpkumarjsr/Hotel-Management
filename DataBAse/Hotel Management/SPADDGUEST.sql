-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE SPADDGUEST 
	-- Add the parameters for the stored procedure here
	@guest_id int,
	@first_name varchar(50),
	@last_name varchar(50),
	@gender char(10),
	@email varchar(100),
	@phone_number bigint,
	@address varchar(100),
	@password varchar(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	if(@guest_id = 0)
	begin
	insert into guest (first_name,last_name,gender,email,phone_number,address,password)
	values (@first_name,@last_name,@gender,@email,@phone_number,@address,@password)
	end
	else
	begin
	update guest set 
	first_name = @first_name, 
	last_name = @last_name,
	gender = @gender,
	email = @email,
	phone_number = @phone_number,
	address = @address
	where guest_id = @guest_id
	end
END
GO
