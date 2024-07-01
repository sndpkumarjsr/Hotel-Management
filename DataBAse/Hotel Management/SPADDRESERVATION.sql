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
CREATE PROCEDURE SPADDRESERVATION 
	-- Add the parameters for the stored procedure here
	@reservation_id int,
	@guest_id int,
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
	begin try
	if(@reservation_id = 0)
	begin
	insert into reservation (guest_id,room_type,check_in_date,check_out_date,reservation_status)
	values (@guest_id,@room_type,@check_in_date,@check_out_date,@reservation_status)
	end
	else
	begin
	update reservation set
	guest_id = @guest_id,
	room_type = @room_type,
	check_in_date =@check_in_date,
	check_out_date = @check_out_date,
	reservation_status = @reservation_status
	where reservation_id = @reservation_id
	end
	end try
	begin catch
	ROLLBACK;
	end catch
END
GO
