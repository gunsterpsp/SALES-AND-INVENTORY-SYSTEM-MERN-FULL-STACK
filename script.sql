USE [master]
GO
/****** Object:  Database [app_db]    Script Date: 6/27/2023 2:37:44 AM ******/
CREATE DATABASE [app_db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'app_db', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\app_db.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'app_db_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\app_db_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [app_db] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [app_db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [app_db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [app_db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [app_db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [app_db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [app_db] SET ARITHABORT OFF 
GO
ALTER DATABASE [app_db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [app_db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [app_db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [app_db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [app_db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [app_db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [app_db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [app_db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [app_db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [app_db] SET  DISABLE_BROKER 
GO
ALTER DATABASE [app_db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [app_db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [app_db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [app_db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [app_db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [app_db] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [app_db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [app_db] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [app_db] SET  MULTI_USER 
GO
ALTER DATABASE [app_db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [app_db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [app_db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [app_db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [app_db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [app_db] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [app_db] SET QUERY_STORE = ON
GO
ALTER DATABASE [app_db] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [app_db]
GO
/****** Object:  Table [dbo].[customer_status]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer_status](
	[status_id] [int] IDENTITY(1,1) NOT NULL,
	[status_name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customers]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers](
	[customer_id] [int] IDENTITY(1,1) NOT NULL,
	[customer_code] [nvarchar](255) NOT NULL,
	[customer_name] [nvarchar](255) NOT NULL,
	[customer_status] [nvarchar](255) NOT NULL,
	[user_uuid] [nvarchar](255) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[customer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[item_status]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[item_status](
	[status_id] [int] IDENTITY(1,1) NOT NULL,
	[status_name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[items]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[items](
	[item_id] [int] IDENTITY(1,1) NOT NULL,
	[item_code] [nvarchar](255) NOT NULL,
	[item_name] [nvarchar](255) NOT NULL,
	[item_quantity] [int] NOT NULL,
	[item_status] [int] NOT NULL,
	[user_uuid] [nvarchar](255) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[item_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[item_code] [nvarchar](255) NOT NULL,
	[item_name] [nvarchar](255) NOT NULL,
	[item_quantity] [int] NOT NULL,
	[item_status] [int] NOT NULL,
	[item_id] [int] NOT NULL,
	[customer_code] [nvarchar](255) NOT NULL,
	[customer_name] [nvarchar](255) NOT NULL,
	[user_uuid] [nvarchar](255) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [nvarchar](50) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sessions]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sessions](
	[sid] [nvarchar](36) NOT NULL,
	[expires] [datetimeoffset](7) NULL,
	[data] [nvarchar](max) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[sid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_status]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_status](
	[status_id] [int] IDENTITY(1,1) NOT NULL,
	[status_name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[uuid] [nvarchar](255) NOT NULL,
	[firstname] [nvarchar](255) NOT NULL,
	[lastname] [nvarchar](255) NOT NULL,
	[username] [nvarchar](255) NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[email] [nvarchar](255) NOT NULL,
	[role] [nvarchar](255) NOT NULL,
	[status] [nvarchar](255) NOT NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[customer_status] ON 

INSERT [dbo].[customer_status] ([status_id], [status_name]) VALUES (1, N'Active')
INSERT [dbo].[customer_status] ([status_id], [status_name]) VALUES (2, N'Lock')
SET IDENTITY_INSERT [dbo].[customer_status] OFF
GO
SET IDENTITY_INSERT [dbo].[customers] ON 

INSERT [dbo].[customers] ([customer_id], [customer_code], [customer_name], [customer_status], [user_uuid], [createdAt], [updatedAt]) VALUES (1, N'test', N'test', N'1', N'e43d381c-76cb-4747-acb3-eb4361d9d8c4', CAST(N'2023-06-23T06:47:06.2390000+00:00' AS DateTimeOffset), CAST(N'2023-06-25T11:36:40.3020000+00:00' AS DateTimeOffset))
INSERT [dbo].[customers] ([customer_id], [customer_code], [customer_name], [customer_status], [user_uuid], [createdAt], [updatedAt]) VALUES (2, N'awe', N'awe', N'1', N'e43d381c-76cb-4747-acb3-eb4361d9d8c4', CAST(N'2023-06-23T06:55:44.4300000+00:00' AS DateTimeOffset), CAST(N'2023-06-25T11:36:43.7210000+00:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[customers] OFF
GO
SET IDENTITY_INSERT [dbo].[item_status] ON 

INSERT [dbo].[item_status] ([status_id], [status_name]) VALUES (1, N'Active')
INSERT [dbo].[item_status] ([status_id], [status_name]) VALUES (2, N'Lock')
SET IDENTITY_INSERT [dbo].[item_status] OFF
GO
SET IDENTITY_INSERT [dbo].[items] ON 

INSERT [dbo].[items] ([item_id], [item_code], [item_name], [item_quantity], [item_status], [user_uuid], [createdAt], [updatedAt]) VALUES (1, N'test1112', N'test1232', 223, 1, N'e43d381c-76cb-4747-acb3-eb4361d9d8c4', CAST(N'2023-06-25T12:52:19.3680000+00:00' AS DateTimeOffset), CAST(N'2023-06-25T14:52:33.2520000+00:00' AS DateTimeOffset))
INSERT [dbo].[items] ([item_id], [item_code], [item_name], [item_quantity], [item_status], [user_uuid], [createdAt], [updatedAt]) VALUES (2, N'tetetet', N'tetete', 33, 1, N'e43d381c-76cb-4747-acb3-eb4361d9d8c4', CAST(N'2023-06-25T13:31:43.2270000+00:00' AS DateTimeOffset), CAST(N'2023-06-25T13:31:43.2270000+00:00' AS DateTimeOffset))
INSERT [dbo].[items] ([item_id], [item_code], [item_name], [item_quantity], [item_status], [user_uuid], [createdAt], [updatedAt]) VALUES (3, N'asa', N'asa', 33, 1, N'e43d381c-76cb-4747-acb3-eb4361d9d8c4', CAST(N'2023-06-25T13:31:59.5290000+00:00' AS DateTimeOffset), CAST(N'2023-06-25T13:31:59.5290000+00:00' AS DateTimeOffset))
INSERT [dbo].[items] ([item_id], [item_code], [item_name], [item_quantity], [item_status], [user_uuid], [createdAt], [updatedAt]) VALUES (4, N'isad', N'padd', 30, 1, N'e43d381c-76cb-4747-acb3-eb4361d9d8c4', CAST(N'2023-06-25T14:47:28.1870000+00:00' AS DateTimeOffset), CAST(N'2023-06-25T15:33:35.4260000+00:00' AS DateTimeOffset))
INSERT [dbo].[items] ([item_id], [item_code], [item_name], [item_quantity], [item_status], [user_uuid], [createdAt], [updatedAt]) VALUES (5, N'312', N'3123', 123, 1, N'e43d381c-76cb-4747-acb3-eb4361d9d8c4', CAST(N'2023-06-25T16:02:51.7120000+00:00' AS DateTimeOffset), CAST(N'2023-06-25T16:02:51.7120000+00:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[items] OFF
GO
SET IDENTITY_INSERT [dbo].[roles] ON 

INSERT [dbo].[roles] ([role_id], [role_name], [status]) VALUES (1, N'Admin', 1)
INSERT [dbo].[roles] ([role_id], [role_name], [status]) VALUES (2, N'Developer', 1)
INSERT [dbo].[roles] ([role_id], [role_name], [status]) VALUES (3, N'Consultant', 1)
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
INSERT [dbo].[Sessions] ([sid], [expires], [data], [createdAt], [updatedAt]) VALUES (N'_gE2BKusPV3D49mgqYsChcOnab5ZOgKo', CAST(N'2023-06-27T18:25:58.6680000+00:00' AS DateTimeOffset), N'{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"},"role":"1","userId":"e43d381c-76cb-4747-acb3-eb4361d9d8c4"}', CAST(N'2023-06-26T15:27:45.1280000+00:00' AS DateTimeOffset), CAST(N'2023-06-26T18:25:58.6680000+00:00' AS DateTimeOffset))
INSERT [dbo].[Sessions] ([sid], [expires], [data], [createdAt], [updatedAt]) VALUES (N'SqhZ95qctM_FFCtkccJKPml8nyisHd51', CAST(N'2023-06-26T19:05:58.2620000+00:00' AS DateTimeOffset), N'{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"},"role":"1","userId":"e43d381c-76cb-4747-acb3-eb4361d9d8c4"}', CAST(N'2023-06-25T10:52:44.2350000+00:00' AS DateTimeOffset), CAST(N'2023-06-25T19:05:58.2620000+00:00' AS DateTimeOffset))
INSERT [dbo].[Sessions] ([sid], [expires], [data], [createdAt], [updatedAt]) VALUES (N'yAjQX0IY8MR89J0fv49DMEZy2kpkqCzJ', CAST(N'2023-06-27T15:27:44.2930000+00:00' AS DateTimeOffset), N'{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', CAST(N'2023-06-26T15:27:44.7100000+00:00' AS DateTimeOffset), CAST(N'2023-06-26T15:27:44.7100000+00:00' AS DateTimeOffset))
GO
SET IDENTITY_INSERT [dbo].[user_status] ON 

INSERT [dbo].[user_status] ([status_id], [status_name]) VALUES (1, N'Active')
INSERT [dbo].[user_status] ([status_id], [status_name]) VALUES (2, N'Lock')
SET IDENTITY_INSERT [dbo].[user_status] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (2, N'e43d381c-76cb-4747-acb3-eb4361d9d8c4', N'Oliver', N'Dela Fuente', N'gunsterpsp', N'$argon2id$v=19$m=65536,t=3,p=4$U6TNYBgOoQtGupOsYZ9BqQ$t00bg0Tiz5Nc34rB7j+D+59jbqZO1jFOTaZluyi3cqs', N'meow@gmail.com', N'1', N'1', CAST(N'2023-06-13T14:35:29.9580000+00:00' AS DateTimeOffset), CAST(N'2023-06-22T09:37:48.7660000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (29, N'462c0a91-3025-4a5c-a5cd-cf73b2de86b7', N'tatamira', N'tatamira', N'tatamira', N'$argon2id$v=19$m=65536,t=3,p=4$Gl5qIXVw4N0896hA0eEwZg$G3MdM+r+8uAZtzWkZ7YKlq8mwiu9IA7Mapi7/EoULAA', N'tatamira@gmail.com', N'2', N'1', CAST(N'2023-06-17T16:29:11.1840000+00:00' AS DateTimeOffset), CAST(N'2023-06-17T18:28:31.8550000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (30, N'e5501888-38f9-44a0-9f9b-a2573eab8a71', N'Olive', N'Olive', N'Olive', N'$argon2id$v=19$m=65536,t=3,p=4$SmFKmR20uK61Aq3ui+1cRw$yKeOCWX0h06MJKd3toEeRrXXORgWcT022ISHkkWlC2A', N'Olive@gmail.comn', N'2', N'1', CAST(N'2023-06-17T19:29:44.9770000+00:00' AS DateTimeOffset), CAST(N'2023-06-17T19:29:44.9770000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1030, N'9fa22e85-a1e4-4209-a843-ffece99d0885', N'hahah', N'ahaha', N'ahahah', N'$argon2id$v=19$m=65536,t=3,p=4$LE6fNYCYBC7BhFSMmEpSXg$/5DHpakV2nWDDsMw6gnCFOSRj2D7MDJpXqdB/4fCQqQ', N'hahah@gmail.com', N'1', N'1', CAST(N'2023-06-18T09:39:58.5560000+00:00' AS DateTimeOffset), CAST(N'2023-06-18T09:39:58.5560000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1033, N'9c7f2854-6036-4263-969f-a65e9a43b588', N'mimi', N'mimi', N'mimi', N'$argon2id$v=19$m=65536,t=3,p=4$rQvRjqOTsy61A4jNBUVDOA$Vt+jitTkLDEbEueqHl63B9s27kmzptuTmfQz/VDeOHA', N'mimi@gmail.com', N'2', N'1', CAST(N'2023-06-18T09:40:40.8010000+00:00' AS DateTimeOffset), CAST(N'2023-06-18T17:14:41.8760000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1034, N'ed17ab06-1801-42a6-a110-8f795ad7bc0a', N'mimi', N'mimi', N'mimi', N'$argon2id$v=19$m=65536,t=3,p=4$0MYh+Ivga53RDK9Ev8TmGA$01XRZ/nVBpYX5YN7uV8QWdWPKyDg8wEQ6PUuXIDpXuE', N'mimi@gmail.com', N'2', N'1', CAST(N'2023-06-18T09:40:57.8720000+00:00' AS DateTimeOffset), CAST(N'2023-06-18T17:14:48.4800000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1035, N'2d16a1dd-d17c-4a6c-975b-a666d6decfe6', N'olii', N'dfssssssss', N'guns', N'$argon2id$v=19$m=65536,t=3,p=4$0A3Rrf7eRq3yxtYmk47+1Q$Y2h+S0K2BQbGiIRr+u24VbsSlfZpMtKy+Ao69bGXEo0', N'maebear143@gmail.com', N'2', N'1', CAST(N'2023-06-18T09:41:10.2050000+00:00' AS DateTimeOffset), CAST(N'2023-06-22T08:21:51.7960000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1036, N'9ab19ab0-06a0-476b-bb65-ec0be6bb792c', N'nande', N'nandenande', N'nande', N'$argon2id$v=19$m=65536,t=3,p=4$1JCPwn8CXXy2VGuL4em4Jg$UZg6j0GWLBD7ICf9wMI4g5NIBWp0jggZ10KcvOR6Zao', N'nande@gmail.com', N'2', N'2', CAST(N'2023-06-18T09:41:22.8380000+00:00' AS DateTimeOffset), CAST(N'2023-06-18T17:46:16.8700000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1037, N'f0fcbd58-3240-4485-b30f-9991a17be82f', N'baka', N'baka', N'baka', N'$argon2id$v=19$m=65536,t=3,p=4$xNEEmv6ELZOhu7z8NyHdAQ$3sSyJoWRABGtbP8i4J//eKTP/M4l6mFPfxZdIlEPbNs', N'baka@gmail.com', N'2', N'1', CAST(N'2023-06-18T09:41:48.0910000+00:00' AS DateTimeOffset), CAST(N'2023-06-18T17:45:11.9340000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1038, N'f7ccf8bc-e1b9-44d0-8391-f0437583051a', N'shine', N'shine', N'shine', N'$argon2id$v=19$m=65536,t=3,p=4$ciUMqr06iB0rIHUtSJGOcg$ElR/3bYm7Qgn6XcWy+QhLtQ95CwgoU0Ts/c6zZnJbIw', N'shine@gmail.com', N'3', N'1', CAST(N'2023-06-18T09:42:10.3330000+00:00' AS DateTimeOffset), CAST(N'2023-06-21T16:00:32.3440000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1039, N'280d581e-69bd-4cc0-a129-3f38f13d24dc', N'helloworldssss', N'helloworld', N'helloworld', N'$argon2id$v=19$m=65536,t=3,p=4$+jdnAWARrLZb3NUYgImD+g$OKT24jOcMmewne7N06YnElD+PmJ9YapY3yxyuV8pU7M', N'helloworld@gmail.com', N'1', N'2', CAST(N'2023-06-18T09:42:42.0220000+00:00' AS DateTimeOffset), CAST(N'2023-06-21T14:16:35.9460000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1040, N'b5969dc0-7cd2-4e75-ac74-5194e07ec88b', N'test', N'test', N'test', N'$argon2id$v=19$m=65536,t=3,p=4$rNB1e6DyZ6xcgLM+xUl3fA$iV/VVNd3TCFHWznpTHXkAarKlVHhW1DrqTBJaM3AR5o', N'test@gmail.com', N'3', N'1', CAST(N'2023-06-21T14:14:43.4470000+00:00' AS DateTimeOffset), CAST(N'2023-06-21T14:16:27.8440000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1041, N'b841f26e-fdf9-4934-825a-96ae5e7f2952', N'utangnaloob', N'utangnaloob', N'utangnaloob', N'$argon2id$v=19$m=65536,t=3,p=4$e3obk34pFSCQojAZnqQ00w$fdJY/R2SwRmlsuTGeVADZb0rR98YylqSeJ9iHH+8Kqs', N'utangnaloob@gmail.com', N'3', N'1', CAST(N'2023-06-21T15:10:01.7300000+00:00' AS DateTimeOffset), CAST(N'2023-06-22T08:40:36.3290000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1042, N'24a200d3-7d0f-4ea5-9de5-ebbf83b6d89b', N'testdata', N'testdata', N'testdata', N'$argon2id$v=19$m=65536,t=3,p=4$2ck+0d6g1BiSoeCGgDhiLQ$VWtDVVJfYULK9zLfU5DcHpCoFsjckgwImqvXdv9oNq8', N'testdata@gmail.com', N'2', N'1', CAST(N'2023-06-22T09:37:12.9360000+00:00' AS DateTimeOffset), CAST(N'2023-06-22T09:37:12.9360000+00:00' AS DateTimeOffset))
INSERT [dbo].[users] ([id], [uuid], [firstname], [lastname], [username], [password], [email], [role], [status], [createdAt], [updatedAt]) VALUES (1043, N'c57b4fd3-cb9f-4268-9599-277658559059', N'dasd', N'asd', N'dasd', N'$argon2id$v=19$m=65536,t=3,p=4$xMPf1/E02s7Z8ic0/xTpqw$7YxQ86Jyn4OTscK58qy1nc1DgN/+n4+unqVSUnrY64c', N'dasd@gmail.com', N'2', N'1', CAST(N'2023-06-23T07:26:12.4760000+00:00' AS DateTimeOffset), CAST(N'2023-06-23T07:26:12.4760000+00:00' AS DateTimeOffset))
SET IDENTITY_INSERT [dbo].[users] OFF
GO
/****** Object:  StoredProcedure [dbo].[spApp]    Script Date: 6/27/2023 2:37:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spApp]    
@queryTag VARCHAR(50), @value1 VARCHAR(50), 
@value2 VARCHAR(50),@value3 VARCHAR(50),
@value4 VARCHAR(50)

AS
BEGIN
	IF @queryTag = 'spGetAllUsers'
		SELECT TOP(1000) 
		t1.id, t1.uuid, t1.firstname, t1.lastname, 
		t1.username, t1.password, t1.email, t1.role, t2.role_name, 
		t3.status_name FROM users t1 
		LEFT JOIN roles t2 ON t1.role = t2.role_id 
		LEFT JOIN user_status t3 ON t1.status = t3.status_id 
		ORDER BY t1.id DESC

	ELSE IF @queryTag = 'spGetUserById'
		SELECT * FROM [dbo].[users] WHERE id = @value1;

	ELSE IF @queryTag = 'spGetAllRoles'
		SELECT * FROM [dbo].[roles] WHERE status = 1;

	ELSE IF @queryTag = 'spGetRoleById'
		SELECT * FROM [dbo].[roles] 
		WHERE status = 1 AND role_id = @value1;

	ELSE IF @queryTag = 'spUsersSearch'
		SELECT t1.id, t1.uuid, t1.firstname, t1.lastname, t1.username, 
		t1.email, t2.role_name, t3.status_name FROM users t1 
		LEFT JOIN roles t2 ON t1.role = t2.role_id 
		LEFT JOIN user_status t3 ON t1.status = t3.status_id
		WHERE 
		t1.firstname LIKE '%' + @value1 + '%'
		OR 
		t1.lastname LIKE '%' + @value1 + '%' 
		OR 
		t1.username LIKE '%' + @value1 + '%' 
		OR 
		t1.email LIKE '%' + @value1 + '%' 
		OR 
		t2.role_name LIKE '%' + @value1 + '%' 
		OR 
		t3.status_name LIKE '%' + @value1 + '%' ; 


	ELSE IF @queryTag = 'spGetAllCustomers'
		SELECT t1.customer_id, t1.customer_code, t1.customer_name, 
		t2.status_name 
		FROM customers t1 LEFT JOIN customer_status t2 
		ON t1.customer_status = t2.status_id ORDER BY t1.customer_id DESC;


	ELSE IF @queryTag = 'spCustomersSearch'
		SELECT t1.customer_id, t1.customer_code, 
		t1.customer_name, t2.status_name 
		FROM customers t1 
		LEFT JOIN 
			customer_status t2 
		ON t1.customer_status = t2.status_id 
		WHERE 
		t1.customer_code LIKE '%'+ @value1 + '%' 
		OR 
		t1.customer_name LIKE '%'+ @value1 + '%' 
		OR 
		t2.status_name LIKE '%'+ @value1 + '%';


	ELSE IF @queryTag = 'spGetAllItems'
		SELECT t1.item_code, t1.item_name, t1.item_quantity, t1.item_id,
		t2.status_name 
		FROM items t1 LEFT JOIN item_status t2 
		ON t1.item_status = t2.status_id ORDER BY t1.item_id DESC;


	ELSE IF @queryTag = 'spItemsSearch'
		SELECT t1.item_id, t1.item_code, 
		t1.item_name, t2.status_name, t1.item_quantity 
		FROM items t1 
		LEFT JOIN 
			item_status t2 
		ON t1.item_status = t2.status_id 
		WHERE 
		t1.item_code LIKE '%'+ @value1 + '%' 
		OR 
		t1.item_name LIKE '%'+ @value1 + '%' 
		OR 
		t2.status_name LIKE '%'+ @value1 + '%';

	ELSE IF @queryTag = 'spGetItemList' 
		SELECT * FROM items;

	ELSE IF @queryTag = 'spGetItemByOnChange' 
		SELECT * FROM items WHERE item_id = @value1;

	ELSE IF @queryTag = 'spUserLogin'
		SELECT * FROM [dbo].[users] 
		WHERE username = @value1 AND password = @value2;



END

GO
USE [master]
GO
ALTER DATABASE [app_db] SET  READ_WRITE 
GO
