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
CREATE PROCEDURE SPADDFEEDBACK 
	-- Add the parameters for the stored procedure here
	@guest_id int,
	@survey_date date,
	@rating int,
	@comment nvarchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @guest_name varchar(100)
	select @guest_name = cast(first_name+' '+last_name as varchar) from guest where guest_id = @guest_id
	insert into feedback (guest_id,survey_date,rating,comment,guest_name)
	values (@guest_id,@survey_date,@rating,@comment,@guest_name)

END
GO
