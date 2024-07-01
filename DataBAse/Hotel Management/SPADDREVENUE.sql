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
CREATE PROCEDURE SPADDREVENUE
	-- Add the parameters for the stored procedure here
	@revenue_id int,
	@guest_id int,
	@revenue_date date,
	@room_revenue int,
	@service_revenue int,
	@discount float,
	@total_revenue float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	if(@revenue_id = 0)
	begin
	insert into revenueanalysis (guest_id,revenue_date,room_revenue,service_revenue,discount,total_revenue)
	values (@guest_id,@revenue_date,@room_revenue,@service_revenue,@discount,@total_revenue)

	update reservation set reservation_status = 'Booked' where guest_id = @guest_id

	end
	else
	begin
	update revenueanalysis set
	guest_id = @guest_id,
	revenue_date = @revenue_date,
	room_revenue = @room_revenue,
	service_revenue = @service_revenue,
	discount = @discount,
	total_revenue = @total_revenue
	where revenue_id = @revenue_id
	end
END
GO
