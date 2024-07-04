create database HOTELMANAGEMENT;

create table guest (
guest_id int primary key identity(100001,1),
first_name varchar(50) not null,
last_name varchar(50),
gender char(10) not null,
email varchar(100) unique not null,
phone_number bigint unique not null,
address varchar(100) not null,
password varchar(100) not null
)


create table reservation (
reservation_id int primary key identity(1001,1),
guest_id int FOREIGN KEY REFERENCES guest(guest_id),
room_type varchar(50) not null,
check_in_date date not null,
check_out_date date not null,
reservation_status varchar(100) not null
)

create table feedback(
feedback_id int primary key identity(10001,1),
guest_id int FOREIGN KEY REFERENCES guest(guest_id),
survey_date date not null,
rating int not null,
comment nvarchar(max),
guest_name varchar(100) not null
)

create table revenueanalysis(
revenue_id int primary key identity(50001,1),
guest_id int FOREIGN KEY REFERENCES guest(guest_id),
revenue_date date not null,
room_revenue float not null,
service_revenue float not null,
discount float not null,
total_revenue float not null
)

create table securitylog(
log_id int primary key identity(1000001,1),
guest_id int FOREIGN KEY REFERENCES guest(guest_id),
action_performed nvarchar(255) ,
time_stamp date not null
)

create table roomrate(
roomtype varchar(50) primary key,
rate float not null,
total_num_room int not null
)

insert into roomrate (roomtype,rate,total_num_room)
values ('Single Room',1500,22),('Double Room',2500,15),('Triple Room',3300,15),('Quad Room',4000,10)


create trigger tr_add_guest
on guest
after insert
as
begin
declare @id int
select @id = guest_id from inserted
insert into securitylog values(@id,'Add New Guest',getdate())
end

create trigger tr_update_guest 
on guest
after update
as 
begin
declare @id int
select @id = guest_id from inserted
insert into securitylog values(@id,'Update Guest Record',getdate())
end

create trigger tr_add_reservation
on reservation
after insert
as 
begin
declare @id int
declare @roomtype varchar(50), @check_in date
select @id = guest_id, @roomtype = room_type, @check_in = check_in_date from inserted
insert into securitylog values(@id,CONCAT(@roomtype,' Reserved at ',@check_in),getdate())
end

create trigger tr_update_reservation
on reservation
after update
as 
begin
declare @id int
declare @roomtype varchar(50), @check_in date
select @id = guest_id, @roomtype = room_type, @check_in = check_in_date from inserted
insert into securitylog values(@id,CONCAT('Update ',@roomtype,' Reserved at ',@check_in),getdate())
end

create trigger tr_add_feedback
on feedback
after insert
as 
begin
declare @id int
select @id = guest_id from inserted
insert into securitylog values(@id,'Add New Feedback',getdate())
end

create trigger tr_add_revenue
on revenueanalysis
after insert
as 
begin
declare @id int
select @id = guest_id from inserted
insert into securitylog values(@id,'Add New Bill',getdate())
end

create trigger tr_update_revenue
on revenueanalysis
after update
as 
begin
declare @id int
select @id = guest_id from inserted
insert into securitylog values(@id,'Add New Bill',getdate())
end

exec SPADDGUEST   0,'Yogesh','kumar','Male','yogesh3@gmail.com',9988776671,'Bhopal, MP','Yogesh@123'
exec SPADDRESERVATION 1001,100001,'Double Bed', '2024-03-31' , '2024-04-1', 'Booking'
exec SPADDFEEDBACK 100003,'2024-03-30',4,'Services is Excellent'
exec SPADDREVENUE 0,100001,'2024-03-30',3000,1000,10,3600
exec SPGETROOMRATE 'Quad Room', '2024-04-15','2024-04-19'
exec SPUPDATETOTALNUMROOM 'Quad Room',1
exec SPGETGUEST 0
exec SPGETGUEST 100001
exec SPGETRESERVATIONBYRESERVATIONID 1001
exec SPGETRESERVATIONBYGUESTID 100001
exec SPGETRESERVATIONBYGUESTID 0
exec SPGETFEEDBACK 0
exec SPGETFEEDBACK 100005
exec SPGETREVENUEANALYSISBYREVENUEID 50001
exec SPGETREVENUEANALYSISBYGUESTID 100001
exec SPGETREVENUEANALYSISBYGUESTID 0
exec SPGETSECURITYLOG
exec SPUPDATETODECREMENTTOTALNUMROOM 'Quad Room',2
exec SPUPDATETOTALNUMROOM 'Quad Room',2
exec ADDADMINRESERVATION 

exec AuthUser 'yogesh1@gmail.com', 'Qwerty'


select * from guest
select * from reservation
select * from feedback
select * from revenueanalysis
select * from securitylog
select * from roomrate


