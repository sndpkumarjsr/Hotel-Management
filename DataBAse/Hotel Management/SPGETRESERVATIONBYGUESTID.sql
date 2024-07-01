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
CREATE PROCEDURE SPGETRESERVATIONBYGUESTID 
	-- Add the parameters for the stored procedure here
	@guest_id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	if(@guest_id = 0)
	begin
	select reservation_id,guest_id,room_type,check_in_date,check_out_date,reservation_status from reservation
	end
	else
	begin
	select reservation_id,guest_id,room_type,check_in_date,check_out_date,reservation_status from reservation where guest_id = @guest_id
	end
END
GO
