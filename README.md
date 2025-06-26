# Secure Patient Intake System - Frontend

This is the frontend for the Secure Patient Intake System, built with React, TypeScript, and Vite. It provides a user interface for admins and clinicians to interact with the patient management system.

## Features

-   **Role-Based Interface**: The UI adapts based on whether the logged-in user is an `admin` or a `clinician`.
-   **Secure Authentication**:
    -   Login page with a role selector (`admin`/`clinician`).
    -   Signup page for new `clinician` users.
-   **Dashboard**:
    -   **Admin View**: Displays a complete list of all patients with full details and access to the audit log viewer.
    -   **Clinician View**: Displays a list of patients created by that clinician, with sensitive data like SSNs masked for privacy.
-   **Patient Management**:
    -   A dedicated form for clinicians to easily create new patient records.
-   **Audit Log Viewer**:
    -   An admin-exclusive page that presents a clear, tabular view of all system audit logs.
-   **Modern Tech Stack**:
    -   Built with **React** and **TypeScript**.
    -   Fast development and build times powered by **Vite**.
    -   Modern and clean user interface.

## Getting Started

Follow these instructions to get the frontend development environment up and running.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) (included with Node.js)
-   The [backend server](../backend) must be running.

### Installation

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the necessary dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

1.  Make sure the backend server is running on `http://localhost:3001`.
2.  Start the frontend development server:
    ```bash
    npm run dev
    ```
3.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

The application is configured to proxy API requests to the backend server, so no additional configuration is needed.

### Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

The optimized static files will be generated in the `dist` directory.
