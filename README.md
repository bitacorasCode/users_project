# Users CRUD

Web application for user management built with **Laravel, Inertia.js, React, and PostgreSQL**.

The application allows users to list, search, filter, create, view, and delete users, including related information such as address, notes, role, and status.

## Technologies Used

### Backend

- PHP
- Laravel
- PostgreSQL
- Laravel Form Requests
- Laravel Precognition
- Eloquent ORM

### Frontend

- React
- Inertia.js
- React Bootstrap
- Bootstrap 5
- DataTables (`datatables.net-react`)
- Laravel Precognition for React/Inertia

### Tooling

- npm
- Composer
- Vite

---

# Requirements

Before installing the project, make sure the following are installed:

- PHP
- Composer
- Node.js
- npm
- PostgreSQL

PHP must also have the PostgreSQL PDO extension enabled (`pdo_pgsql`).

Laravel and the remaining PHP dependencies are installed through Composer using the project's `composer.json` file.

You can verify your installed versions with:

```bash
php -v
composer --version
node -v
npm -v
psql --version
```

---

# Installation

## 1. Clone the Repository

```bash
git clone <REPOSITORY_URL>
```

Move into the project directory:

```bash
cd <PROJECT_NAME>
```

---

## 2. Install PHP Dependencies

```bash
composer install
```

---

## 3. Install Frontend Dependencies

```bash
npm install
```

---

## 4. Create the Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

On Windows:

```bash
copy .env.example .env
```

---

## 5. Generate the Laravel Application Key

```bash
php artisan key:generate
```

---

# PostgreSQL Setup

Start PostgreSQL

Before creating the database, make sure the PostgreSQL service is running.

Create a PostgreSQL database for the application.

For example:

```sql
CREATE DATABASE users_project;
```

You can create the database using `psql`, pgAdmin, or any other PostgreSQL client.

Example using `psql`:

```bash
psql -U postgres
```

Then:

```sql
CREATE DATABASE users_project;
```

Exit PostgreSQL:

```sql
\q
```

---

# Environment Configuration

Edit the database configuration in `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=users_project
DB_USERNAME=you_user
DB_PASSWORD=your_password
```

`DB_USERNAME` and `DB_PASSWORD` must match a valid PostgreSQL user configured on the machine.

After modifying the `.env` file, clear Laravel's cached configuration:

```bash
php artisan config:clear
```

---

# Migrations and Seed Data

Run the database migrations and seeders:

```bash
php artisan migrate --seed
```

This creates the required tables and initial data, such as the roles used by the application.

---

# Running the Application

The application requires both Laravel and Vite to be running.

## Terminal 1 - Laravel

```bash
php artisan serve
```

By default, Laravel will be available at:

```text
http://127.0.0.1:8000
```

## Terminal 2 - Vite

```bash
npm run dev
```

Once both processes are running, open:

```text
http://127.0.0.1:8000/users
```

---

# Production Frontend Build

To generate the production frontend assets:

```bash
npm run build
```

---

# Features

The application includes:

- User listing
- General search
- Filtering by role and status
- Server-side pagination
- User creation
- Frontend validation before form submission
- Backend validation
- Unique field validation for email, RUT/RUN, and phone
- User deletion with confirmation
- Visual feedback through toast notifications
- User detail view
- Lazy loading with Inertia
- Loading, error, empty, and data states

Each user can have:

- One role
- One status
- One address
- One or multiple notes

---

# Architecture

The application uses Laravel as the backend and Inertia.js as the bridge between Laravel and React.

This allows the application to use React for the frontend without requiring a separate REST API for the main application flow.

General architecture:

```text
React
   ↓
Inertia.js
   ↓
Laravel
   ↓
Eloquent
   ↓
PostgreSQL
```

Laravel is mainly responsible for:

- Routing
- Validation
- Persistence
- Database queries
- Pagination
- Business rules

React is mainly responsible for:

- User interface
- Forms
- Components
- User interactions
- Visual states
- User feedback

---

# Frontend Structure

The main structure inside `resources/js` is organized approximately as follows:

```text
resources/js/
├── Components/
│   ├── Helpers/
│   │   ├── AsyncContent.jsx
│   │   └── DeleteAction.jsx
│   │
│   ├── UI/
│   │   ├── ConfirmModal.jsx
│   │   ├── DataTable.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── FlashToast.jsx
│   │   ├── Loader.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   └── SelectField.jsx
│   │
│   └── Users/
│       ├── Form/
│       │   ├── AddressSection.jsx
│       │   ├── NotesSection.jsx
│       │   └── PersonalDataSection.jsx
│       │
│       ├── Tabs/
│       │   ├── UserAddressTab.jsx
│       │   ├── UserGeneralTab.jsx
│       │   └── UserNotesTab.jsx
│       │
│       ├── UserFilters.jsx
│       ├── UserForm.jsx
│       └── UserTable.jsx
│
├── Hooks/
│   ├── Users/
│   │   └── useUsersParams.js
│   │
│   ├── useDebounce.js
│   └── useLazyInertiaProp.js
│
├── Pages/
│   └── Users/
│       ├── Create.jsx
│       ├── Index.jsx
│       └── Detail.jsx
│
└── Services/
    └── catalogService.js
```

The structure is intended to separate responsibilities between:

- Reusable UI components
- User-specific domain components
- Actions
- Feedback components
- Hooks
- Services
- Inertia pages

---

# Database

The application uses PostgreSQL.

The main tables are:

```text
users
roles
addresses
notes
```

## Relationships

```text
Role
 └── hasMany Users

User
 ├── belongsTo Role
 ├── hasOne Address
 └── hasMany Notes
```

Dependent relationships may use database cascade deletion so that related addresses and notes are also removed when a user is deleted.

---

# Validation

Validation rules are centralized in Laravel using a `FormRequest`.

User creation validates fields such as:

## Personal Information

- First name is required
- First name has a maximum length of 100 characters
- Last name is required
- Last name has a maximum length of 100 characters
- Email is required and unique
- RUT/RUN is required and unique
- Phone is optional and unique
- Role is required and must exist
- Status is required

## Address

- Street is required
- City is required
- Postal code is optional

## Notes

- At least one note is required
- Each note must contain text

The application uses **Laravel Precognition** to perform validation before the final form submission while reusing the same validation rules defined in Laravel.

This avoids duplicating validation rules between the frontend and backend.

---

# User List

The user list includes:

- Server-side pagination
- General search
- Role filter
- Status filter
- DataTables for table rendering
- View and delete actions

Pagination is handled by Laravel, which avoids loading the full dataset into the browser.

Filters are stored as URL query parameters, for example:

```text
/users?search=john&role=Administrator&state=Active&page=2
```

This helps preserve the current list state during navigation.

---

# User Creation

The user creation form is organized into three sections:

### Personal Information

Includes:

- First name
- Last name
- Email
- RUT/RUN
- Phone
- Role
- Status

### Address

Includes:

- Street
- City
- Postal code

### Notes

The form supports one or multiple notes or observations.

Validation errors are displayed inline for each field before the final form submission.

After a successful creation, the user is redirected to the user list and receives a success notification.

---

# User Deletion

User deletion uses a reusable confirmation component.

Flow:

```text
Delete
   ↓
Confirmation
   ↓
DELETE /users/{id}
   ↓
Laravel
   ↓
Delete user
   ↓
Redirect
   ↓
Success toast
```

Backend errors are also displayed to the user when the delete operation cannot be completed.

---

# User Detail View

The user detail page is organized into read-only tabs.

## General Information

Includes:

- First name
- Last name
- Email
- RUT/RUN
- Phone
- Role
- Status
- Creation date

## Address

Includes:

- Street
- City
- Postal code

## Notes

Displays a table containing the registered notes or observations and their creation date.

Each tab loads its data only when the user activates it.

This is implemented using **Inertia partial reloads**, avoiding unnecessary requests for data that has not yet been requested by the user.

Each tab handles the following states:

```text
loading
error
empty
data
```

---

# Lazy Loading

The detail page uses optional Inertia props and partial reloads.

The initial request only loads the user summary required for the page header.

Additional information is requested when a tab becomes active:

```text
User detail page
        ↓
General tab activated
        ↓
Load general data

Address tab activated
        ↓
Load address data

Notes tab activated
        ↓
Load notes
```

Previously loaded tab data is preserved while navigating between tabs.

---

# Feedback and Notifications

The application includes a reusable global Toast notification system.

Laravel can send flash notifications with different types, such as:

```text
success
danger
warning
info
```

This allows the same component to be reused for different operations, including:

- User created successfully
- User deleted successfully
- Warnings
- Errors
- Informational messages

---

# Development Considerations

The project prioritizes:

- Separation of concerns
- Reusable components
- Custom hooks for shared logic
- Avoiding unnecessary duplication
- Server-side pagination
- Lazy loading
- Centralized validation
- Explicit loading and error states
- Modular frontend architecture
- Native Laravel, Inertia, and React integration

The main goal is to keep the codebase simple, maintainable, modular, and scalable without introducing unnecessary abstractions.
