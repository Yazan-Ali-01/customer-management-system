# Customer Management System
This is a Customer Management System built with React, TypeScript, Vite, and several other modern libraries and tools. The project follows the React Bulletproof architecture to ensure a scalable, maintainable, and robust codebase.

## Table of Contents

- [Customer Management System](#customer-management-system)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Features](#features)
  - [Usage](#usage)
    - [Authentication](#authentication)
    - [Customer Management](#customer-management)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
  - [Contact](#contact)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/customer-management-system.git
   cd customer-management-system/frontend
   ```
   
2. **Install Depnedencies**:
    ```
    npm install
    ```
3. **Start the development server:**:
  ```bash
  npm run dev
```
## Features

- Authentication: Login and Register functionality using JWT.
- Customer Management: Add, edit, delete, and view customer details.
- Filtering and Pagination: Filter customers by number and paginate results.
- Form Handling: Robust form handling using React Hook Form and Zod.
- State Management: Zustand for managing application state.
- Animations: Smooth UI animations with Framer Motion.
- Error Handling: Centralized error handling with React Context.
- Loading States: Manage loading states for data fetching.
- 
## Usage

### Authentication
To login, navigate to /auth/login. To register, navigate to /auth/register.

### Customer Management
To manage customers, navigate to /customers. You can add new customers, edit existing ones, delete customers, and filter the list of customers.

## Scripts
- `dev`: Starts the development server using Vite.
- `build`: Builds the project using TypeScript and Vite.
- `lint`: Runs ESLint on the project files.
- `preview`: Previews the built project using Vite.

## Dependencies
- Core Libraries: react, react-dom, react-router-dom
- State Management: zustand
- Form Handling: react-hook-form, zod
- UI Components: @radix-ui/react-*, lucide-react, shadecn-ui
- CSS: tailwindcss, @tailwindcss/forms
- HTTP Client: axios
- Icons: lucide-react
- Table: @tanstack/react-table
- Animation: framer-motion

## Contact
For any questions or inquiries, please contact yazan.ali.dev@gmail.com.