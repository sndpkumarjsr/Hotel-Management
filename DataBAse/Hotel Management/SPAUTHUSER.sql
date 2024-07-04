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
CREATE PROCEDURE AuthUser
	-- Add the parameters for the stored procedure here
	@Email varchar(100),
	@Password varchar(100),
	@returnval int output
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	--@returnval = 1  // email and password confirm
	--@returnval = 0 // either email or password is worng
	--@returnval = -1 // exception
	BEGIN TRY
    IF EXISTS (SELECT 1 FROM guest WHERE email = @Email)
    BEGIN
        IF EXISTS (SELECT 1 FROM guest WHERE email = @Email AND password = @Password)
        BEGIN
            SET @returnval = 1
			select guest_id,first_name,last_name,gender,email,phone_number,address from guest where email = @Email
        END
        ELSE
        BEGIN
            SET @returnval = 0
        END
    END
    ELSE
    BEGIN
        SET @returnval = 0
    END
END TRY
BEGIN CATCH
    SET @returnval = -1
END CATCH

END
GO
