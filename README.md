# System Edu Smart

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EduSmartInterface/SystemEduSmart
   ```

2. **Navigate to the project directory:**

   ```bash
   cd SystemEduSmart
   ```

3. **Install dependencies:**
   use node 18

   ```bash
   nvm use 18
   ```

   ```bash
   npm install
   ```

4. **Create and configure the database:**

The project uses MongoDB. By default, a database file will be created in the root directory when you run the application.

5. **Create a `.env` file:**

Create a `.env` file in the root directory of your project and add the necessary environment variables. For example:

```env
PORT=Your_port
MONGO_DATABASE_NAME=Your_mongo_database_name
```

Adjust these settings according to your needs.

## Running the Application

To start the application, use the following command:

```bash
npm start
```

By default, the application will run on `http://localhost:env_port`.

## Usage

- **Authentication**: Users can register, log in, and manage their sessions.
- **[MVC Structure](https://github.com/EnAnsari/basic-authentication-mvc-nodejs/wiki/MVC-Architecture)**: The application follows the MVC architecture.
  - **Model**: Defines the data structure and interacts with the database.
  - **View**: Renders the HTML using Pug templates.
  - **Controller**: Contains the logic for handling user requests and responses.
  - **Reposiory**: Logic database

## Contributing

We welcome contributions to improve the project! If you'd like to contribute, please follow these steps:

1. **Fork the repository** on GitHub.
2. **Clone your fork**:

   ```bash
   git clone https://github.com/EduSmartInterface/SystemEduSmart
   ```

3. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature
   ```

4. **Make your changes** and commit them:

   ```bash
   git add .
   git commit -m "Add your message here"
   ```

5. **Push your changes** to your fork:

   ```bash
   git push origin feature/your-feature
   ```

6. **Submit a Pull Request** on GitHub, describing your changes and any relevant information.

## Contact

For any questions or feedback, please reach out to
[nam.nhoxkiba@gmail.com].
