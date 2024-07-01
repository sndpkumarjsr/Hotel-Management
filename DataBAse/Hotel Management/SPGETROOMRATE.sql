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
CREATE PROCEDURE SPGETROOMRATE 
	-- Add the parameters for the stored procedure here
		@room_type varchar(50),
	@check_in_date varchar(50),
	@check_out_date varchar(50)
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @num_of_room int
	SELECT @num_of_room = COUNT(distinct reservation_id) 
	FROM reservation 
	WHERE (check_in_date BETWEEN @check_in_date AND @check_out_date
		OR check_out_date BETWEEN @check_in_date AND @check_out_date) and room_type = @room_type;

	
	select roomtype,rate,(total_num_room - @num_of_room)as total_num_room from roomrate where roomtype = @room_type;
END
GO
