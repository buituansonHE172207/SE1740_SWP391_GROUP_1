# Online Book Shop - SE1740_SWP391_GROUP_1

## Overview

This project is a comprehensive online book shop application developed as a mini capstone project for FPT University's SWP391 course. The system features both customer-facing interfaces and administrative capabilities for managing an online book store.

## Technology Stack

### Frontend

- **Website**: React.js application for customers
- **Admin Panel**: React.js with CKEditor 5 integration for rich text editing

### Backend

- **Framework**: Spring Boot 3.0.1
- **Build Tool**: Maven
- **Java Version**: 17 (implied by Spring Boot version)
- **Database**: Not specified in provided files (likely SQL-based)

## Project Structure

```bash
SE1740_SWP391_GROUP_1/
├── Backend/                 # Spring Boot application
│   ├── src/                 # Source code
│   ├── mvnw                 # Maven wrapper script for Unix
│   ├── mvnw.cmd             # Maven wrapper script for Windows
│   └── pom.xml              # Maven dependencies and build configuration
│
└── Frontend/
   ├── website/             # Customer-facing React application
   │   └── README.md        # Create React App documentation
   │
   └── re-admin/            # Admin panel application
      ├── ckeditor5/       # Rich text editor integration
      │   ├── src/         # Editor source code
      │   ├── webpack.config.js  # Webpack configuration
      │   └── README.md    # CKEditor documentation
      └── README.md        # Admin panel documentation
```

## Setup and Installation

### Prerequisites

- Node.js and npm (for Frontend)
- Java Development Kit (JDK) 17 or higher
- Maven (optional, as wrapper scripts are included)

### Backend Setup

1. Navigate to the Backend directory:

   ```bash
   cd Backend
   ```

2. Run the application using Maven wrapper:
   - On Windows: `mvnw.cmd spring-boot:run`
   - On Unix/Linux/macOS: `./mvnw spring-boot:run`

### Frontend Website Setup

1. Navigate to the Frontend/website directory:

   ```bash
   cd Frontend/website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. The application will be available at <http://localhost:3000>

### Admin Panel Setup

1. Navigate to the Frontend/re-admin directory:

   ```bash
   cd Frontend/re-admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. If you need to modify the CKEditor:

   ```bash
   cd ckeditor5
   npm install
   npm run build
   ```

4. Start the admin application (from the re-admin directory):

   ```bash
   npm start
   ```

## Features

### Customer Portal

- Browse and search books
- User registration and authentication
- Shopping cart functionality
- Checkout process
- Order history

### Admin Portal

- Dashboard with analytics
- Book inventory management
- Order management
- User management
- Content management with rich text editing (CKEditor)

## Development

### Building for Production

#### Backend

```bash
cd Backend
./mvnw clean package
```

#### Frontend Website

```bash
cd Frontend/website
npm run build
```

#### Admin Panel

```bash
cd Frontend/re-admin
npm run build
```

## Team Members

- Bùi Tuấn Sơn
- Nguyễn Tất Tú
- Lê Gia Nguyên
- Nguyễn Xuân HàoHào

## Course Information

- **University**: FPT University
- **Course**: SWP391 (Mini Capstone)
- **Class**: SE1740
- **Group**: Group 1

## License

This project is developed for educational purposes. The components used may have their own licenses:

- CKEditor 5 - Licensed under MIT for online builder code samples
- Other third-party libraries as specified in their respective documentation

## Acknowledgments

- FPT University faculty and mentors
- Open source libraries and frameworks used in this project
