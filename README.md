##### This repository contains the backend codebase for Local Shelter Donor Inventory Project.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- npm (Node Package Manager) or yarn installed.

## Getting Started

To get a local copy up and running follow these simple steps.

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Copy the `.env.example` file to `.env` and set the appropriate values for your environment variables.

5. Start the development server:

   ```bash
   npm start
   ```

6. The server should now be running at `http://localhost:3000`.

## Available Endpoints

- `/donations`:
  - `GET`: Get all donations.
  - `POST`: Add a new donation.
- `/donations/:id`:
  - `GET`: Get a donation by ID.
  - `PUT`: Update a donation by ID.
  - `PATCH`: Partially update a donation by ID.
  - `DELETE`: Delete a donation by ID.

## License

Distributed under the MIT License. See `LICENSE` for more information.
