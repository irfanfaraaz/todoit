# TodoIT

TodoIT is a comprehensive task management application built with modern web technologies. This README provides a full walkthrough of the application, including its features, setup instructions, and usage guidelines.

## Features

- **Authentication with NextAuth**: Secure authentication with support for multiple providers, including Google and GitHub, and magic link authentication.
- **Add, Edit, Delete Todos**: Full CRUD functionality for managing your tasks.
- **Add, Edit, Delete Projects**: Organize your tasks into projects with full CRUD capabilities.
- **Add, Edit, Delete Labels**: Categorize your tasks with labels and manage them easily.
- **List Todos by Projects/Labels**: View your tasks filtered by projects or labels.
- **Themes**: Seamless dark mode support with `next-themes`.
- **Responsive Design**: Optimized for all screen sizes for a great user experience on any device.
- **Check and Uncheck Todos**: Mark tasks as complete or incomplete.
- **Overdue Todos**: Highlight overdue tasks with red dates until they are completed.
- **Upcoming Todos**: Keep track of tasks that are due soon.
- **User Avatar**: Display user avatars for a personalized experience.
- **Good Navigation**: Intuitive and user-friendly navigation throughout the application.
- **Radix UI Primitives**: Accessible and customizable UI components.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Google Fonts**: Beautiful and performant typography.
- **Icons from [Lucide](https://lucide.dev)**: Simple and consistent icons.
- **Tailwind CSS Class Sorting, Merging, and Linting**: Ensures clean and maintainable styles.

## Future Scope

In future updates, I plan to add the following features:

- **Organizations**: Create and manage organizations.
- **Assign Tasks to Members**: Assign tasks to members within organizations.
- **Sub Tasks**: Add sub-tasks to existing tasks.
- **Comments**: Add comments inside todos for better collaboration.
- **OpenAI Integration**: Integrate with OpenAI for enhanced functionalities.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- pnpm (v6 or later)

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/todoit.git
   cd todoit
   ```

2. **Copy the environment variables file**:

   ```sh
   cp sample.env.local .env.local
   ```

3. **Fill in the environment variables**:
   Open `.env.local` and fill in the required credentials. For example:

   ```env
   AUTH_SECRET=SIFSRK
   NEXTAUTH_SECRET=SIFSRK

   EMAIL_SERVER_USER=SAMPLE
   EMAIL_SERVER_PASSWORD=SAMPLE
   EMAIL_SERVER_HOST=SAMPLE
   EMAIL_SERVER_PORT=000
   EMAIL_FROM=SAMPLE

   NODE_ENV=development

   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/

   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   RESEND_API=SAMPLE
   RESEND_AUDIENCE_ID=SAMPLE

   NOTIFICATION_WEBHOOK=

   NEXT_PUBLIC_MEASUREMENT_ID=SAMPLE
   ```

4. **Install dependencies**:
   ```sh
   pnpm install
   ```

### Running the Application

1. **Start the development server**:

   ```sh
   pnpm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Adding Login Functionality

To enable login functionality, follow these steps:

1. **Set up environment variables for authentication**:
   Ensure the following variables are set in your `.env.local` file:

   ```env
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

2. **Connect to a Redis instance**:
   You need to connect to a Redis instance for session management. Fill in the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your `.env.local` file.

3. **Run the application**:

   ```sh
   pnpm run dev
   ```

   You can now use the login functionality provided by NextAuth.

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any questions or feedback, please open an issue or contact us at [your-email@example.com].

Happy coding!
