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
Create PROCEDURE AuthUser
	-- Add the parameters for the stored procedure here
	@Email varchar(100),
	@Password varchar(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
    IF EXISTS (SELECT 1 FROM guest WHERE email = @Email)
    BEGIN
			select guest_id,first_name,last_name,gender,email,phone_number,address from guest where email = @Email and password = @Password
    END
END TRY
BEGIN CATCH
END CATCH

END
GO
