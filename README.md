# Full-Stack Application

Skip the setup, skip the hassle, and just click here to explore all the features live: [https://taskcv.onrender.com/](https://taskcv.onrender.com/) 😉

## Features
- **Backend**: Node.js with Express.js and MongoDB integration.
- **Frontend**: React for UI.
- **CRUD Operations**: Dynamic rendering of Create, Read, Update, and Delete operations.

## Prerequisites
- Node.js and npm installed.
- MongoDB installed and running locally or in the cloud.

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/smarika17/Task.git
cd Task
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the MongoDB server locally or connect to a cloud instance.

4. Create a `.env` file in the backend directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_URI=<your-mongodb-connection-string>
   ```

5. Run the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

4. Start the React development server:
   ```bash
   npm run dev
   ```

## Using the Application
### Development Mode
- **Backend API**: `http://localhost:3000`
- **Frontend**: `http://localhost:5173`

### Production Mode
- **Deployed Backend**: [https://task-4n4y.onrender.com/](https://task-4n4y.onrender.com/)
- **Deployed Frontend**: [https://taskcv.onrender.com/](https://taskcv.onrender.com/)


## Additional Notes
- Ensure MongoDB is running before starting the backend in development mode.
- Use `.env` files to manage environment-specific configurations.
- Update the `.gitignore` file to exclude `.env` files from version control.
