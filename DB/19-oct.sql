USE master;  
GO
IF DB_ID (N'website') IS NOT NULL  
    DROP DATABASE website;  
GO
CREATE DATABASE website  
    COLLATE Vietnamese_100_CI_AS_KS_WS_SC_UTF8;  
GO  
ALTER DATABASE [website] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [website].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [website] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [website] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [website] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [website] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [website] SET ARITHABORT OFF 
GO
ALTER DATABASE [website] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [website] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [website] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [website] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [website] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [website] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [website] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [website] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [website] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [website] SET  DISABLE_BROKER 
GO
ALTER DATABASE [website] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [website] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [website] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [website] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [website] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [website] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [website] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [website] SET RECOVERY FULL 
GO
ALTER DATABASE [website] SET  MULTI_USER 
GO
ALTER DATABASE [website] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [website] SET DB_CHAINING OFF 
GO
ALTER DATABASE [website] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [website] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [website] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [website] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'website', N'ON'
GO
ALTER DATABASE [website] SET QUERY_STORE = ON
GO
ALTER DATABASE [website] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [website]
GO
/****** Object:  Table [dbo].[author]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[author](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[company] [varchar](255) NULL,
	[name] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[author_book]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[author_book](
	[book_id] [bigint] NOT NULL,
	[author_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[isbn] [varchar](255) NULL,
	[cover] [varchar](255) NULL,
	[description] [varchar](max) NULL,
	[discount] [real] NULL,
	[page] [int] NULL,
	[price] [bigint] NULL,
	[publication_date] [date] NULL,
	[size] [varchar](255) NULL,
	[sold] [int] NULL,
	[state] [varchar](255) NULL,
	[stock] [int] NULL,
	[title] [varchar](255) NULL,
	[weight] [int] NULL,
	[category_id] [bigint] NULL,
	[language_id] [bigint] NULL,
	[publisher_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_ehpdfjpu1jm3hijhj4mm0hx9h] UNIQUE NONCLUSTERED 
(
	[isbn] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_category]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[book_collection]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[book_collection](
	[book_id] [bigint] NOT NULL,
	[collection_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[collection]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[collection](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[is_display] [bit] NULL,
	[name] [varchar](255) NULL,
	[type] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[feedback]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[feedback](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[comment] [varchar](max) NULL,
	[created_at] [datetime2](6) NULL,
	[state] [varchar](255) NULL,
	[book_id] [bigint] NULL,
	[user_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[image]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[image](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[description] [varchar](255) NULL,
	[link] [varchar](255) NULL,
	[book_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[language]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[language](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[address] [varchar](255) NULL,
	[created] [datetime2](6) NULL,
	[customer_note] [varchar](max) NULL,
	[district] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[full_name] [varchar](255) NULL,
	[payment_state] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
	[province] [varchar](255) NULL,
	[shipping_price] [bigint] NULL,
	[shipping_state] [varchar](255) NULL,
	[shop_note] [varchar](max) NULL,
	[state] [varchar](255) NULL,
	[total_price] [bigint] NULL,
	[ward] [varchar](255) NULL,
	[user_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_detail]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_detail](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[amount] [int] NULL,
	[original_price] [bigint] NULL,
	[sale_price] [bigint] NULL,
	[book_id] [bigint] NULL,
	[order_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UKl5hghjlnpjnocpkyqlln3a6ca] UNIQUE NONCLUSTERED 
(
	[book_id] ASC,
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[post]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[post](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[brief] [varchar](255) NULL,
	[content] [varchar](max) NULL,
	[created_at] [datetime2](6) NULL,
	[state] [varchar](255) NULL,
	[thumbnail] [varchar](255) NULL,
	[title] [varchar](255) NULL,
	[category_id] [bigint] NULL,
	[user_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[post_category]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[post_category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[publisher]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[publisher](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
	[website] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rating]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rating](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[value] [int] NOT NULL,
	[book_id] [bigint] NULL,
	[user_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UKq5b95fcqo965m2x5m7bsyvsew] UNIQUE NONCLUSTERED 
(
	[book_id] ASC,
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[slider]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[slider](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[back_link] [varchar](255) NULL,
	[description] [varchar](max) NULL,
	[image_url] [varchar](255) NULL,
	[title] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[address] [varchar](255) NULL,
	[district] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[full_name] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
	[province] [varchar](255) NULL,
	[role] [varchar](255) NULL,
	[state] [varchar](255) NULL,
	[ward] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_ob8kqyqqgmefl0aco34akdtpe] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[wishlist]    Script Date: 10/18/2023 11:18:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wishlist](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[book_id] [bigint] NULL,
	[user_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK23j0w0ls8ramaftxntclngekj] UNIQUE NONCLUSTERED 
(
	[book_id] ASC,
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[author] ON 

INSERT [dbo].[author] ([id], [company], [name]) VALUES (1, NULL, N'Gege Akutami')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (2, NULL, N'Mizuho Kusana')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (3, NULL, N'Negi Haruba')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (4, NULL, N'AidaIro')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (5, NULL, N'Fujiko F Fujio')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (6, NULL, N'Riichiro Inagaki')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (7, NULL, N'Muneyuki Kaneshiro')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (8, NULL, N'Akira Toriyama')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (9, NULL, N'Tomohito Oda')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (10, NULL, N'Aka Akasaka')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (11, NULL, N'NHIỀU TÁC GIẢ')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (12, NULL, N'NGUYỄN NHẬT ÁNH')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (13, NULL, N'TRUNG TÂM NGHIÊN CỨU TÂM LÍ HÀ NỘI')
INSERT [dbo].[author] ([id], [company], [name]) VALUES (14, NULL, N'LÊ MINH HẢI')
SET IDENTITY_INSERT [dbo].[author] OFF
GO
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (1, 1)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (2, 2)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (3, 3)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (4, 4)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (5, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (6, 6)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (7, 7)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (8, 8)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (9, 9)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (10, 10)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (86, 11)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (87, 11)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (88, 11)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (89, 11)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (90, 11)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (91, 11)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (92, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (93, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (94, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (95, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (96, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (97, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (98, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (99, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (100, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (101, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (102, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (103, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (104, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (105, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (106, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (107, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (108, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (109, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (110, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (111, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (112, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (113, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (114, 5)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (115, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (116, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (117, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (118, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (119, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (120, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (121, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (122, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (123, 13)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (124, 12)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (125, 12)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (126, 12)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (127, 12)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (128, 12)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (129, 12)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (130, 12)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (131, 14)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (132, 14)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (133, 14)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (134, 14)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (135, 14)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (136, 14)
INSERT [dbo].[author_book] ([book_id], [author_id]) VALUES (137, 14)
GO
SET IDENTITY_INSERT [dbo].[book] ON 

INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (1, N'978-604-2-33155-5', N'Bìa mềm', NULL, 0.1, 200, 27000, CAST(N'2021-09-11' AS Date), N'11.3x17.6 cm', 1, 1, N'Chú Thuật Hồi Chiến - Tập 17 - Bản giới hạn', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (2, N'978-604-2-28453-0', N'Bìa mềm', NULL, 0.2, 176, 25000, CAST(N'2021-08-15' AS Date), N'11.3x17.6 cm', 5, 5, N'Yona - Công chúa bình minh - Tập 33 (Tặng Kèm Postcard)', 150, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (3, N'978-604-2-23706-2', N'Bìa mềm', NULL, 0.1, 192, 25000, CAST(N'2022-01-01' AS Date), N'11.3x17.6 cm', 5, 6, N'Nhà có 5 nàng dâu - Tập 10 (Tặng kèm Postcard) (2022)', 192, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (4, N'978-604-2-33154-8', N'Bìa mềm', NULL, 0.1, 178, 54000, CAST(N'2021-09-01' AS Date), N'13x18 cm', 0, 12, N'"Cậu" ma nhà xí Hanako - Tập 11 - Bản đặc biệt (Tặng Kèm 01 Sách Tranh Màu Độc Quyền Ghost Hotel’s Cafe)', 178, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (5, N'978-604-2-28973-3', N'Bìa mềm', NULL, 0.1, 212, 45000, CAST(N'2023-01-01' AS Date), N'13x18 cm', 27, 100, N'DORAEMON THẾ GIỚI KHOA HỌC - ÁNH SÁNG VÀ ÂM THANH', 195, 2, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (6, N'978-604-2-22849-7', N'Bìa mềm', NULL, 0.1, 192, 25000, CAST(N'2021-10-25' AS Date), N'11.3x17.6 cm', 1224, 1000, N'DR. STONE - TẬP 6', 130, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (7, N'978-604-2-28538-4', N'Bìa mềm', NULL, 0.1, 192, 35000, CAST(N'2023-01-01' AS Date), N'11.3x17.6 cm', 1030, 1000, N'BLUELOCK - TẬP 5', 150, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (8, N'978-604-2-07087-4', N'Bìa cứng', NULL, 0.1, 220, 159000, CAST(N'2016-12-31' AS Date), N'18x26 cm', 1260, 1000, N'DRAGON BALL ĐẠI TUYỂN TẬP', 800, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (9, N'978-604-2-23671-3', N'Bìa mềm', NULL, 0.1, 192, 25000, CAST(N'2022-01-01' AS Date), N'11.3x17.6 cm', 967, 500, N'KOMI - NỮ THẦN SỢ GIAO TIẾP - TẬP 7', 150, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (10, N'978-604-2-28494-3', N'Bìa mềm', NULL, 0.1, 204, 40000, CAST(N'2022-02-01' AS Date), N'13x18 cm', 9, 100, N'KAGUYA - CUỘC CHIẾN TỎ TÌNH - TẬP 24 (TẶNG KÈM SNS CARD)', 220, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (86, N'978-604-2-31014-7', N'bìa mềm', NULL, 0.3, 50, 36000, CAST(N'2020-11-15' AS Date), N'24x23 cm', 100, 400, N'THẾ GIỚI CỦA PEPPA - KÌ NGHỈ HÈ CỦA PEPPA', 200, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (87, N'978-604-2-31013-0', N'bìa mềm', NULL, 0.3, 50, 36000, CAST(N'2020-11-15' AS Date), N'24x23 cm', 100, 400, N'THẾ GIỚI CỦA PEPPA - PEPPA YÊU TRÁI ĐẤT', 200, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (88, N'978-604-2-31012-3 ', N'bìa mềm', NULL, 0.3, 50, 36000, CAST(N'2020-11-15' AS Date), N'24x23 cm', 100, 400, N'THẾ GIỚI CỦA PEPPA - PEPPA YÊU QUÝ BÁC SĨ VÀ Y TÁ', 200, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (89, N'978-604-2-31010-9', N'bìa mềm', NULL, 0.3, 50, 36000, CAST(N'2020-11-15' AS Date), N'24x23 cm', 100, 400, N'THẾ GIỚI CỦA PEPPA - BỮA TIỆC SINH NHẬT TUYỆT NHẤT', 200, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (90, N'978-604-2-31011-6', N'bìa mềm', NULL, 0.3, 50, 36000, CAST(N'2020-11-15' AS Date), N'24x23 cm', 100, 400, N'THẾ GIỚI CỦA PEPPA - PEPPA ĐẾN NHÀ SÁCH', 200, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (91, N'978-604-2-31009-3', N'bìa mềm', NULL, 0.3, 50, 36000, CAST(N'2020-11-15' AS Date), N'24x23 cm', 100, 400, N'THẾ GIỚI CỦA PEPPA - NGỦ NGON NHÉ , PEPPA !', 200, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (92, N'978-604-2-31769-6', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 4', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (93, N'978-604-2-31807-5', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 42', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (94, N'978-604-2-31806-8', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 41', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (95, N'978-604-2-31789-4', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 24', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (96, N'978-604-2-31787-0', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 22', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (97, N'978-604-2-31786-3', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 21', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (98, N'978-604-2-31809-9', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 44', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (99, N'978-604-2-31804-4', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 39', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (100, N'978-604-2-31800-6', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 35', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (101, N'978-604-2-31788-7', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 23', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (102, N'978-604-2-31784-9', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 19', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (103, N'978-604-2-31783-2', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 18', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (104, N'978-604-2-31779-5', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 14', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (105, N'978-604-2-31774-0', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 9', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (106, N'978-604-2-31810-5', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 45', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (107, N'978-604-2-31799-3', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 34', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (108, N'978-604-2-31797-9', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 32', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (109, N'978-604-2-31796-2', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 31', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (110, N'978-604-2-31794-8', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 33', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (111, N'978-604-2-31793-1', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 26', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (112, N'978-604-2-31791-7', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 28', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (113, N'978-604-2-31790-0', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 26', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (114, N'978-604-2-31781-8', N'bìa mềm', NULL, 0.1, 192, 20000, CAST(N'2018-10-20' AS Date), N'11,3x17,6 cm', 150, 350, N'DORAEMON TRUYỆN NGẮN - TẬP 16', 140, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (115, N'978-604-2-26677-2', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - HÀI HƯỚC VÀ LẠC QUAN', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (116, N'978-604-2-26676-5', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - TỰ GIÁC VÀ TỰ LẬP (2022)', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (117, N'978-604-2-26675-8', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - TƯ DUY TÍCH CỰC', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (118, N'978-604-2-26674-1', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - KIỂM SOÁT CẢM XÚC (2022)', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (119, N'978-604-2-26672-7', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - GIAO TIẾP HIỆU QUẢ', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (120, N'978-604-2-26673-4', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - HỌC CÁCH TỰ TIN (2022)', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (121, N'978-604-2-22627-1', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - KIỂM SOÁT CẢM XÚC (2022)', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (122, N'978-604-2-23446-7', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - HÀI HƯỚC VÀ LẠC QUAN', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (123, N'978-604-2-22625-7', N'bìa mềm', NULL, 0.2, 168, 86000, CAST(N'2022-05-19' AS Date), N'17x24 cm', 50, 250, N'KĨ NĂNG XÃ HỘI CHO HỌC SINH TIỂU HỌC - GIAO TIẾP HIỆU QUẢ', 280, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (124, N'978-604-2-31181-6', N'bìa mềm', NULL, 0.3, 332, 86000, CAST(N'2022-06-15' AS Date), N'14x20.5 cm', 20, 180, N'KÍNH VẠN HOA (PHIÊN BẢN MỚI) - TẬP 5', 380, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (125, N'978-604-2-31183-0', N'bìa mềm', NULL, 0.3, 332, 86000, CAST(N'2022-06-15' AS Date), N'14x20.5 cm', 20, 180, N'KÍNH VẠN HOA (PHIÊN BẢN MỚI) - TẬP 7', 380, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (126, N'978-604-2-31184-7', N'bìa mềm', NULL, 0.3, 332, 86000, CAST(N'2022-06-15' AS Date), N'14x20.5 cm', 20, 180, N'KÍNH VẠN HOA (PHIÊN BẢN MỚI) - TẬP 8', 380, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (127, N'978-604-2-31182-3', N'bìa mềm', NULL, 0.3, 332, 86000, CAST(N'2022-06-15' AS Date), N'14x20.5 cm', 20, 180, N'KÍNH VẠN HOA (PHIÊN BẢN MỚI) - TẬP 6', 380, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (128, N'978-604-2-31177-9', N'bìa mềm', NULL, 0.3, 332, 86000, CAST(N'2022-06-15' AS Date), N'14x20.5 cm', 20, 180, N'KÍNH VẠN HOA (PHIÊN BẢN MỚI) - TẬP 1', 380, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (129, N'978-604-2-26261-3', N'bìa mềm', NULL, 0.3, 332, 86000, CAST(N'2022-06-15' AS Date), N'14x20.5 cm', 20, 180, N'KÍNH VẠN HOA (PHIÊN BẢN MỚI) - TẬP 10 ', 380, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (130, N'978-604-2-26255-2', N'bìa mềm', NULL, 0.3, 332, 86000, CAST(N'2022-06-15' AS Date), N'14x20.5 cm', 20, 180, N'KÍNH VẠN HOA (PHIÊN BẢN MỚI) - TẬP 4 ', 380, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (131, N'978-604-2-33333-7', N'bìa mềm', NULL, 0.3, 52, 60000, CAST(N'2022-01-01' AS Date), N'19x26 cm', 50, 150, N'TRANH TRUYỆN LỊCH SỬ VIỆT NAM - CÔNG NỮ ANIO', 230, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (132, N'978-604-2-29278-8', N'bìa mềm', NULL, 0.3, 52, 60000, CAST(N'2022-01-01' AS Date), N'19x26 cm', 50, 150, N'TRANH TRUYỆN LỊCH SỬ VIỆT NAM - TRẦN QUỐC TOẢN', 230, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (133, N'978-604-2-29275-7', N'bìa mềm', NULL, 0.3, 52, 60000, CAST(N'2022-01-01' AS Date), N'19x26 cm', 50, 150, N'TRANH TRUYỆN LỊCH SỬ VIỆT NAM - LÊ LỢI', 230, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (134, N'978-604-2-29252-8', N'bìa mềm', NULL, 0.3, 52, 60000, CAST(N'2022-01-01' AS Date), N'19x26 cm', 50, 150, N'TRANH TRUYỆN LỊCH SỬ VIỆT NAM - TRẦN THÁI TÔNG', 230, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (135, N'978-604-2-29257-3', N'bìa mềm', NULL, 0.3, 52, 60000, CAST(N'2022-01-01' AS Date), N'19x26 cm', 50, 150, N'TRANH TRUYỆN LỊCH SỬ VIỆT NAM - TRẦN THÁI TÔNG', 230, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (136, N'978-604-2-29262-7', N'bìa mềm', NULL, 0.3, 52, 60000, CAST(N'2022-01-01' AS Date), N'19x26 cm', 50, 150, N'TRANH TRUYỆN LỊCH SỬ VIỆT NAM - LÝ NAM ĐẾ', 230, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (137, N'978-604-2-29260-3', N'bìa mềm', NULL, 0.3, 52, 60000, CAST(N'2022-01-01' AS Date), N'19x26 cm', 50, 150, N'TRANH TRUYỆN LỊCH SỬ VIỆT NAM - HAI BÀ TRƯNG', 230, 1, 1, 1, 'ACTIVE')
INSERT [dbo].[book] ([id], [isbn], [cover], [description], [discount], [page], [price], [publication_date], [size], [sold], [stock], [title], [weight], [category_id], [language_id], [publisher_id], [state]) VALUES (138, N'978-604-2-29281-8', N'bìa mềm', NULL, 0.3, 52, 60000, CAST(N'2022-01-01' AS Date), N'19x26 cm', 50, 150, N'TRANH TRUYỆN LỊCH SỬ VIỆT NAM - HÀM NGHI', 230, 1, 1, 1, 'ACTIVE')
SET IDENTITY_INSERT [dbo].[book] OFF
GO
SET IDENTITY_INSERT [dbo].[book_category] ON 

INSERT [dbo].[book_category] ([id], [name]) VALUES (1, N'Manga - Comic')
INSERT [dbo].[book_category] ([id], [name]) VALUES (2, N'Truyện tranh')
INSERT [dbo].[book_category] ([id], [name]) VALUES (3, N'Kiến thức - Khoa học')
INSERT [dbo].[book_category] ([id], [name]) VALUES (4, N'Văn học Việt Nam')
INSERT [dbo].[book_category] ([id], [name]) VALUES (5, N'Wings Books')
INSERT [dbo].[book_category] ([id], [name]) VALUES (6, N'Văn học nước ngoài')
INSERT [dbo].[book_category] ([id], [name]) VALUES (7, N'Lịch sử truyền thống')
INSERT [dbo].[book_category] ([id], [name]) VALUES (8, N'Combo')
INSERT [dbo].[book_category] ([id], [name]) VALUES (9, N'Giải mã bản thân')
INSERT [dbo].[book_category] ([id], [name]) VALUES (10, N'Đồ dùng')
INSERT [dbo].[book_category] ([id], [name]) VALUES (11, N'Tạp chí')
INSERT [dbo].[book_category] ([id], [name]) VALUES (12, N'Sách công cụ đoàn - đội')
SET IDENTITY_INSERT [dbo].[book_category] OFF
GO
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (4, 1)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (4, 2)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (1, 14)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (2, 14)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (3, 14)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (1, 6)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (2, 6)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (6, 6)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (86, 23)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (87, 23)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (88, 23)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (89, 23)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (90, 23)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (91, 23)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (92, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (93, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (94, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (95, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (96, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (97, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (98, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (99, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (100, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (101, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (102, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (103, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (104, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (105, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (106, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (107, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (108, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (109, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (110, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (111, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (112, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (113, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (114, 27)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (115, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (116, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (117, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (118, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (119, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (120, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (121, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (122, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (123, 3)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (124, 2)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (125, 2)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (126, 2)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (127, 2)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (128, 2)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (129, 2)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (130, 2)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (131, 1)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (132, 1)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (133, 1)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (134, 1)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (135, 1)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (136, 1)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (137, 1)
INSERT [dbo].[book_collection] ([book_id], [collection_id]) VALUES (138, 1)
GO
SET IDENTITY_INSERT [dbo].[collection] ON 

INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (1, 1, N'LỊCH SỬ, TRUYỀN THỐNG', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (2, 1, N'VĂN HỌC VIỆT NAM', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (3, 1, N'VĂN HỌC NƯỚC NGOÀI', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (4, 1, N'KIẾN THỨC, KHOA HỌC', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (5, 1, N'TRUYỆN TRANH', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (6, 1, N'MANGA-COMIC', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (7, 1, N'WINGBOOK', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (8, 1, N'GIẢI MÃ BẢN THÂN', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (9, 1, N'DÀNH CHO CHA MẸ', N'THỂ LOẠI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (10, 1, N'NHÀ TRẺ, MẪU GIÁO(0-5 TUỔI)', N'ĐỘ TUỔI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (11, 1, N'NHI ĐỒNG(6-10 TUỔI)', N'ĐỘ TUỔI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (12, 1, N'THIẾU NIÊN(11-15 TUỔI)', N'ĐỘ TUỔI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (13, 1, N'TUỔI MỚI LỚN(16-18 TUỔI)', N'ĐỘ TUỔI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (14, 1, N'TUỔI TRƯỞNG THÀNH(TRÊN 18 TUỔI)', N'ĐỘ TUỔI')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (15, 0, N'NGUYỄN NHẬT ÁNH', N'TÁC GIẢ')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (16, 0, N'LINH RAB', N'TÁC GIẢ')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (17, 0, N'LÊ NGHĨA THÀNH', N'TÁC GIẢ')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (18, 0, N'SỸ HIẾU', N'TÁC GIẢ')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (19, 0, N'HAJIME KOMOTO', N'TÁC GIẢ')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (20, 0, N'HONDA ARIAKE', N'TÁC GIẢ')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (21, 0, N'Gương thiếu nhi làm theo lời bác ', N'SERIES')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (22, 0, N'Siêu lập dị ', N'SERIES')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (23, 0, N'Heo peppa', N'SERIES')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (24, 0, N'Dế mèn phiêu lưu kí ', N'SERIES')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (25, 0, N'Kính vạn hoa ', N'SERIES')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (26, 0, N'Bên con mỗi ngày', N'SERIES')
INSERT [dbo].[collection] ([id], [is_display], [name], [type]) VALUES (27, 0, N'Doraemon', N'SERIES')
SET IDENTITY_INSERT [dbo].[collection] OFF
GO
SET IDENTITY_INSERT [dbo].[image] ON 

INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (1, N'Cover Image', N'https://product.hstatic.net/200000343865/product/17_3216c448936a49568a22dd2d39d1f8ce_master.jpg', 1)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (2, N'Cover Image', N'https://product.hstatic.net/200000343865/product/33_c41b6baaa61d479f9846d9f65d09e717_master.jpg', 2)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (3, N'Cover Image', N'https://product.hstatic.net/200000343865/product/10_91fe0deab50448f28e4b30fe98ca71e1_master.jpg', 3)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (4, N'Cover Image', N'https://product.hstatic.net/200000343865/product/11_7551a8842a6c409fb6981db0647243ed_master.jpg', 4)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (5, N'Cover Image', N'https://product.hstatic.net/200000343865/product/anh-sang-va-am-thanh__20acb322f9524da1906274edd392735d_master.jpg', 5)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (6, N'Cover Image', N'https://product.hstatic.net/200000343865/product/anh-sang-va-am-thanh__20acb322f9524da1906274edd392735d_master.jpg', 6)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (7, N'Cover Image', N'https://product.hstatic.net/200000343865/product/5_4c23e61170db4a358d508180bcee3cd2_master.jpg', 7)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (8, N'Cover Image', N'https://product.hstatic.net/200000343865/product/dragon-ball-art-book_e6de85ca1e0e42ab92d3ab0f95053fbb_master.jpg', 8)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (9, N'Cover Image', N'https://product.hstatic.net/200000343865/product/7_1299481063f143d3a7ea3f6f2bdbcaba_master.jpg', 9)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (10, N'Cover Image', N'https://product.hstatic.net/200000343865/product/7_1299481063f143d3a7ea3f6f2bdbcaba_master.jpg', 10)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (11, N'Cover Image', N'https://product.hstatic.net/200000343865/product/the-gioi-cua-peppa_-ki-nghi-he-cua-peppa_9c4778d3ce0343dc87f17e8f9ef1a1d8_large.jpg', 86)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (12, N'Cover Image', N'https://product.hstatic.net/200000343865/product/the-gioi-cua-peppa_-peppa-yeu-trai-dat_9f53ddd62b6a45bebe6ade165aad200a_large.jpg', 87)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (13, N'Cover Image', N'https://product.hstatic.net/200000343865/product/the-gioi-cua-peppa_-peppa-yeu-quy-bac-si-va-y-ta_83e14756f17a411eb7f069af03173aa7_large.jpg', 88)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (14, N'Cover Image', N'https://product.hstatic.net/200000343865/product/the-gioi-cua-peppa_-bua-tiec-sinh-nhat-tuyet-nhat_e0ae901486f543bebf472e4ec7a68b04_master.jpg', 89)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (15, N'Cover Image', N'https://product.hstatic.net/200000343865/product/the-gioi-cua-peppa_-peppa-den-nha-sach_5bb84dc7f3884d3fa09c9ce479502f4f_large.jpg', 90)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (16, N'Cover Image', N'https://product.hstatic.net/200000343865/product/pages_from_ngu_ngon_nhe_peppa_ruot_high_page_1_efc6f14fa0c74d489f47c59665528fea_master.jpg', 91)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (17, N'Cover Image', N'https://product.hstatic.net/200000343865/product/4_70e08fe22f5845109d0f94ea9e1dd093_large.jpg', 92)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (18, N'Cover Image', N'https://product.hstatic.net/200000343865/product/42_a01571babdb54175b0d50acb8c897774_large.jpg', 93)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (19, N'Cover Image', N'https://product.hstatic.net/200000343865/product/41_e96c6d4b7d804a67b4ea2d892f546a54_large.jpg', 94)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (20, N'Cover Image', N'https://product.hstatic.net/200000343865/product/24_547178ee781f46f3954db90892519161_large.jpg', 95)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (21, N'Cover Image', N'https://product.hstatic.net/200000343865/product/22_471e76ac367544b295798067775d7c79_large.jpg', 96)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (22, N'Cover Image', N'https://product.hstatic.net/200000343865/product/21_0ddf963f7387401dbfae69c98d5a0f0e_large.jpg', 97)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (23, N'Cover Image', N'https://product.hstatic.net/200000343865/product/44_6a61ccbacff040ceab7608d2d982bae6_large.jpg', 98)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (24, N'Cover Image', N'https://product.hstatic.net/200000343865/product/39_d88eab85fc4445d9a987c10b55f0b586_large.jpg', 99)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (25, N'Cover Image', N'https://product.hstatic.net/200000343865/product/35_a65505b9a9aa4b94b95522d822de589b_large.jpg', 100)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (26, N'Cover Image', N'https://product.hstatic.net/200000343865/product/23_5fe1b63f839043c59f9fc5244b763556_large.jpg', 101)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (27, N'Cover Image', N'https://product.hstatic.net/200000343865/product/19_fce4b40b69434ebe9b01e9aea7c10f9b_large.jpg', 102)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (28, N'Cover Image', N'https://product.hstatic.net/200000343865/product/18_53b5d0fd9de044ff8fe92fd5f6220a3d_large.jpg', 103)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (29, N'Cover Image', N'https://product.hstatic.net/200000343865/product/14_42fd3e6b8d8746048cb5c9061adf5699_large.jpg', 104)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (30, N'Cover Image', N'https://product.hstatic.net/200000343865/product/9_e03b5db8dca0498cafc3e5073b0cdfed_large.jpg', 105)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (31, N'Cover Image', N'https://product.hstatic.net/200000343865/product/45_371246c6fb3c49d8999f817550cea614_large.jpg', 106)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (32, N'Cover Image', N'https://product.hstatic.net/200000343865/product/34_b056f58c02ca4abbba263d5dc488f4e1_large.jpg', 107)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (33, N'Cover Image', N'https://product.hstatic.net/200000343865/product/32_f97b2cd87f3a44a3886a8c213c579e7d_large.jpg', 108)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (34, N'Cover Image', N'https://product.hstatic.net/200000343865/product/31_dcc4ce2cbefa4140a3045fbcb4f1a5eb_large.jpg', 109)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (35, N'Cover Image', N'https://product.hstatic.net/200000343865/product/33_1a3c9bf9dbda4d898c46040879ea6d4b_large.jpg', 110)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (36, N'Cover Image', N'https://product.hstatic.net/200000343865/product/29_188d71b431f14e37b2177d15dde99f88_large.jpg', 111)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (37, N'Cover Image', N'https://product.hstatic.net/200000343865/product/28_a75e3f6ae2bc4c98b3000051ebc40135_large.jpg', 112)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (38, N'Cover Image', N'https://product.hstatic.net/200000343865/product/26_266f6b2557ed482ab9959b71809c87ad_large.jpg', 113)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (39, N'Cover Image', N'https://product.hstatic.net/200000343865/product/16_68fac01a136b4aa4aeeef748f102dbe5_large.jpg', 114)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (40, N'Cover Image', N'https://product.hstatic.net/200000343865/product/hai-huoc-va-lac-quan_2c17f3084de7443da645522c535f2432_large.jpg', 115)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (41, N'Cover Image', N'https://product.hstatic.net/200000343865/product/tu-giac-va-tu-lap_cb079b92f03b42f28bbeacbe0560aa4a_large.jpg', 116)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (42, N'Cover Image', N'https://product.hstatic.net/200000343865/product/tu-duy-tich-cuc_8fdb4efed91d4ab2b474e2b9613f374e_large.jpg', 117)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (43, N'Cover Image', N'https://product.hstatic.net/200000343865/product/kiem-soat-cam-xuc_fca10579aadc41e480206a5702ec9129_large.jpg', 118)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (44, N'Cover Image', N'https://product.hstatic.net/200000343865/product/giao-tiep-hieu-qua_3e16226b5b194e5a8232410673027a82_large.jpg', 119)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (45, N'Cover Image', N'https://product.hstatic.net/200000343865/product/hoc-cach-tu-tin_8d1c719a3aec4a749584a296d20ed62b_large.jpg', 120)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (46, N'Cover Image', N'https://product.hstatic.net/200000343865/product/kiem-soat-cam-xuc_c2b75e730c094524b203fc434749cb39_large.jpg', 121)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (47, N'Cover Image', N'https://product.hstatic.net/200000343865/product/ki-nang-xa-hoi-cho-hoc-sinh-tieu-hoc_bia_hai-huoc-va-lac-quan_85fc3fcc8a5b412d9bd60f5f6a94a69e_large.jpg', 122)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (48, N'Cover Image', N'https://product.hstatic.net/200000343865/product/giao-tiep-hieu-qua_34a4fb5f074e4abebb7f85ec1f58c396_large.jpg', 123)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (49, N'Cover Image', N'https://product.hstatic.net/200000343865/product/5_0f15edc1d301467c900d9388b9567802_d9491e6a21aa4e4bb9c63aefa9ea5c4a_large.jpg', 124)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (50, N'Cover Image', N'https://product.hstatic.net/200000343865/product/7_74bec969ab6e49708ed1ddf851ab4878_c4342ef28efe4c80882fcd3bf4a056f7_large.jpg', 125)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (51, N'Cover Image', N'https://product.hstatic.net/200000343865/product/8_380a6c5184bb418b93a1721c2486440c_large.jpg', 126)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (52, N'Cover Image', N'https://product.hstatic.net/200000343865/product/6_aec7a00d8caf4ba7a6859d566ef22ca0_large.jpg', 127)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (53, N'Cover Image', N'https://product.hstatic.net/200000343865/product/1_3a8d292017424adb8b68a5d0aecd8a94_large.jpg', 128)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (54, N'Cover Image', N'https://product.hstatic.net/200000343865/product/10_ab1c525b03e94ca8929ca7b708305603_large.jpg', 129)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (55, N'Cover Image', N'https://product.hstatic.net/200000343865/product/4_f4bd47590ea5479cb8893f0698837566_large.jpg', 130)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (56, N'Cover Image', N'https://product.hstatic.net/200000343865/product/cong-nu-anio_19x26cm_811f3514270149c3912b8684dc988b1b_master.jpg', 131)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (57, N'Cover Image', N'https://product.hstatic.net/200000343865/product/tran-quoc-toan_2dc30a6997254793bcc30be8e57375da_large.jpg', 132)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (58, N'Cover Image', N'https://product.hstatic.net/200000343865/product/le-loi_4c93741f0ec147a5862985c5c710d0fb_large.jpg', 133)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (59, N'Cover Image', N'https://product.hstatic.net/200000343865/product/tran-thai-tong_df72a1ec3e97439993a8b83f66a6911c_large.jpg', 134)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (60, N'Cover Image', N'https://product.hstatic.net/200000343865/product/tran-nhan-tong_db13015d550049de9c575552e2d94a27_master.jpg', 135)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (61, N'Cover Image', N'https://product.hstatic.net/200000343865/product/ly-nam-de_82c66d9891bb4250a7ff27bc8e67a12e_master.jpg', 136)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (62, N'Cover Image', N'https://product.hstatic.net/200000343865/product/hai-ba-trung_dbfc760d897048b197cca6886a7d5af2_large.jpg', 137)
INSERT [dbo].[image] ([id], [description], [link], [book_id]) VALUES (63, N'Cover Image', N'https://product.hstatic.net/200000343865/product/ham-nghi_f581647ac7fb4db0a3a68e1c7aead226_large.jpg', 138)
SET IDENTITY_INSERT [dbo].[image] OFF
GO
SET IDENTITY_INSERT [dbo].[language] ON 

INSERT [dbo].[language] ([id], [name]) VALUES (1, N'Tiếng Anh')
INSERT [dbo].[language] ([id], [name]) VALUES (2, N'Tiếng Việt')
INSERT [dbo].[language] ([id], [name]) VALUES (3, N'Tiếng Nhật')
SET IDENTITY_INSERT [dbo].[language] OFF
GO
SET IDENTITY_INSERT [dbo].[publisher] ON 

INSERT [dbo].[publisher] ([id], [name], [website]) VALUES (1, N'Nhà Xuất Bản Kim Đồng', NULL)
INSERT [dbo].[publisher] ([id], [name], [website]) VALUES (2, N'NHÀ XUẤT BẢN GIÁO DỤC VIỆT NAM', N'https://www.bing.com/ck/a?!&&p=30731c92550188c5JmltdHM9MTY5NTc3MjgwMCZpZ3VpZD0wNmZmZWM1YS0yODZiLTZkZjAtM2U5Ny1mZjNlMjkwZDZjNGEmaW5zaWQ9NTE4Mg&ptn=3&hsh=3&fclid=06ffec5a-286b-6df0-3e97-ff3e290d6c4a&psq=NXB+THOI+DAU&u=a1aHR0cHM6Ly9ueGJnZC52bi8&ntb=1')
INSERT [dbo].[publisher] ([id], [name], [website]) VALUES (3, N'NHÀ XUẤT BẢN HỘI NHÀ VĂN', N'https://nxbhoinhavan.vn/')
SET IDENTITY_INSERT [dbo].[publisher] OFF
GO
SET IDENTITY_INSERT [dbo].[slider] ON 

INSERT [dbo].[slider] ([id], [back_link], [description], [image_url], [title]) VALUES (1, N'https://example.com/link1', N'Slider 1 Description', N'https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img1.jpg?v=335', N'Slider 1')
INSERT [dbo].[slider] ([id], [back_link], [description], [image_url], [title]) VALUES (2, N'https://example.com/link2', N'Slider 2 Description', N'https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img3.jpg?v=335', N'Slider 2')
INSERT [dbo].[slider] ([id], [back_link], [description], [image_url], [title]) VALUES (3, N'https://example.com/link3', N'Slider 3 Description', N'https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img5.jpg?v=335', N'Slider 3')
SET IDENTITY_INSERT [dbo].[slider] OFF
GO
SET ANSI_PADDING ON
GO
ALTER TABLE [dbo].[author_book]  WITH CHECK ADD  CONSTRAINT [FKg7j6ud9d32ll232o9mgo90s57] FOREIGN KEY([author_id])
REFERENCES [dbo].[author] ([id])
GO
ALTER TABLE [dbo].[author_book] CHECK CONSTRAINT [FKg7j6ud9d32ll232o9mgo90s57]
GO
ALTER TABLE [dbo].[author_book]  WITH CHECK ADD  CONSTRAINT [FKn8665s8lv781v4eojs8jo3jao] FOREIGN KEY([book_id])
REFERENCES [dbo].[book] ([id])
GO
ALTER TABLE [dbo].[author_book] CHECK CONSTRAINT [FKn8665s8lv781v4eojs8jo3jao]
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD  CONSTRAINT [FK5jgwecmfn1vyn9jtld3o64v4x] FOREIGN KEY([category_id])
REFERENCES [dbo].[book_category] ([id])
GO
ALTER TABLE [dbo].[book] CHECK CONSTRAINT [FK5jgwecmfn1vyn9jtld3o64v4x]
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD  CONSTRAINT [FKgtvt7p649s4x80y6f4842pnfq] FOREIGN KEY([publisher_id])
REFERENCES [dbo].[publisher] ([id])
GO
ALTER TABLE [dbo].[book] CHECK CONSTRAINT [FKgtvt7p649s4x80y6f4842pnfq]
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD  CONSTRAINT [FKmrhfp9wfi5dy4bwl87bx8ivua] FOREIGN KEY([language_id])
REFERENCES [dbo].[language] ([id])
GO
ALTER TABLE [dbo].[book] CHECK CONSTRAINT [FKmrhfp9wfi5dy4bwl87bx8ivua]
GO
ALTER TABLE [dbo].[book_collection]  WITH CHECK ADD  CONSTRAINT [FKka9jqqmcu25by7m32gihxb4rr] FOREIGN KEY([collection_id])
REFERENCES [dbo].[collection] ([id])
GO
ALTER TABLE [dbo].[book_collection] CHECK CONSTRAINT [FKka9jqqmcu25by7m32gihxb4rr]
GO
ALTER TABLE [dbo].[book_collection]  WITH CHECK ADD  CONSTRAINT [FKhrhume0ucplaek9m8pb6ild7s] FOREIGN KEY([book_id])
REFERENCES [dbo].[book] ([id])
GO
ALTER TABLE [dbo].[book_collection] CHECK CONSTRAINT [FKhrhume0ucplaek9m8pb6ild7s]
GO
ALTER TABLE [dbo].[feedback]  WITH CHECK ADD  CONSTRAINT [FK6xn6ah744nvjpnblisld6i3o1] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[feedback] CHECK CONSTRAINT [FK6xn6ah744nvjpnblisld6i3o1]
GO
ALTER TABLE [dbo].[feedback]  WITH CHECK ADD  CONSTRAINT [FKgclyi456gw0lcd6xcfj2l7r6s] FOREIGN KEY([book_id])
REFERENCES [dbo].[book] ([id])
GO
ALTER TABLE [dbo].[feedback] CHECK CONSTRAINT [FKgclyi456gw0lcd6xcfj2l7r6s]
GO
ALTER TABLE [dbo].[image]  WITH CHECK ADD  CONSTRAINT [FK56boxkje8rys2n78amvgkk913] FOREIGN KEY([book_id])
REFERENCES [dbo].[book] ([id])
GO
ALTER TABLE [dbo].[image] CHECK CONSTRAINT [FK56boxkje8rys2n78amvgkk913]
GO
ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FKrcaf946w0bh6qj0ljiw3pwpnu] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FKrcaf946w0bh6qj0ljiw3pwpnu]
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD  CONSTRAINT [FK3aceepmpjwpo8pdn7gmjdfckq] FOREIGN KEY([book_id])
REFERENCES [dbo].[book] ([id])
GO
ALTER TABLE [dbo].[order_detail] CHECK CONSTRAINT [FK3aceepmpjwpo8pdn7gmjdfckq]
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD  CONSTRAINT [FKlb8mofup9mi791hraxt9wlj5u] FOREIGN KEY([order_id])
REFERENCES [dbo].[order] ([id])
GO
ALTER TABLE [dbo].[order_detail] CHECK CONSTRAINT [FKlb8mofup9mi791hraxt9wlj5u]
GO
ALTER TABLE [dbo].[post]  WITH CHECK ADD  CONSTRAINT [FK51aeb5le008k8klgnyfaalmn] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[post] CHECK CONSTRAINT [FK51aeb5le008k8klgnyfaalmn]
GO
ALTER TABLE [dbo].[post]  WITH CHECK ADD  CONSTRAINT [FKi4fb9yu9ap3j0g42j0qja9b4a] FOREIGN KEY([category_id])
REFERENCES [dbo].[post_category] ([id])
GO
ALTER TABLE [dbo].[post] CHECK CONSTRAINT [FKi4fb9yu9ap3j0g42j0qja9b4a]
GO
ALTER TABLE [dbo].[rating]  WITH CHECK ADD  CONSTRAINT [FK7y1acs6la7vkgb5ulm44729sc] FOREIGN KEY([book_id])
REFERENCES [dbo].[book] ([id])
GO
ALTER TABLE [dbo].[rating] CHECK CONSTRAINT [FK7y1acs6la7vkgb5ulm44729sc]
GO
ALTER TABLE [dbo].[rating]  WITH CHECK ADD  CONSTRAINT [FKgwxvkm472iugnbp7yrjg5ioou] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[rating] CHECK CONSTRAINT [FKgwxvkm472iugnbp7yrjg5ioou]
GO
ALTER TABLE [dbo].[wishlist]  WITH CHECK ADD  CONSTRAINT [FK6e4b6ubvjarad3f5g8wqhec] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[wishlist] CHECK CONSTRAINT [FK6e4b6ubvjarad3f5g8wqhec]
GO
ALTER TABLE [dbo].[wishlist]  WITH CHECK ADD  CONSTRAINT [FK94k0l1f4gpde7nw2scncp8pp4] FOREIGN KEY([book_id])
REFERENCES [dbo].[book] ([id])
GO
ALTER TABLE [dbo].[wishlist] CHECK CONSTRAINT [FK94k0l1f4gpde7nw2scncp8pp4]
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD CHECK  (([discount]<=(1) AND [discount]>=(0)))
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD CHECK  (([page]>=(0)))
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD CHECK  (([price]>=(0)))
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD CHECK  (([sold]>=(0)))
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD CHECK  (([stock]>=(0)))
GO
ALTER TABLE [dbo].[book]  WITH CHECK ADD CHECK  (([weight]>=(0)))
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD CHECK  (([amount]>=(1)))
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD CHECK  (([original_price]>=(0)))
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD CHECK  (([sale_price]>=(0)))
GO
ALTER TABLE [dbo].[rating]  WITH CHECK ADD CHECK  (([value]<=(5) AND [value]>=(0)))
GO
USE [master]
GO
ALTER DATABASE [website] SET  READ_WRITE 
GO
