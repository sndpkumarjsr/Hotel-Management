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
CREATE PROCEDURE SPGETREVENUEANALYSISBYGUESTID 
	-- Add the parameters for the stored procedure here
	@guest_id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
		if(@guest_id =0)
	begin
		select ra.revenue_id,ra.guest_id,(g.first_name +' '+ g.last_name) as guest_name ,re.room_type,re.check_in_date,re.check_out_date,ra.revenue_date,ra.room_revenue,ra.service_revenue,ra.discount,ra.total_revenue 
		from revenueanalysis ra 
		inner join guest g on ra.guest_id = g.guest_id 
		inner join reservation re on g.guest_id = re.guest_id
	end
	else
	begin
	select ra.revenue_id,ra.guest_id,(g.first_name +' '+ g.last_name) as guest_name ,re.room_type,re.check_in_date,re.check_out_date,ra.revenue_date,ra.room_revenue,ra.service_revenue,ra.discount,ra.total_revenue 
		from revenueanalysis ra 
		inner join guest g on ra.guest_id = g.guest_id 
		inner join reservation re on g.guest_id = re.guest_id
	end
END
GO
