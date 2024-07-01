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
CREATE PROCEDURE ADDADMINRESERVATION 
	-- Add the parameters for the stored procedure here
	@first_name varchar(50),
	@last_name varchar(50),
	@gender char(10),
	@email varchar(100),
	@phone_number bigint,
	@address varchar(100),
	@password varchar(100),
	@room_type varchar(50),
	@check_in_date date,
	@check_out_date date,
	@reservation_status varchar(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	exec SPADDGUEST   0,@first_name,@last_name,@gender,@email,@phone_number,@address,@password

	declare @guest_id int
	select @guest_id = guest_id from guest where email = @email and phone_number = @phone_number
	exec SPADDRESERVATION 0,@guest_id,@room_type, @check_in_date , @check_out_date, @reservation_status
END
GO
