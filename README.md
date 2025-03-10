# Bitly

T# URL Shortener Application - Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
   - [Local Development Setup](#local-development-setup)
3. [Authentication Details](#authentication-details)
   - [JWT Implementation](#jwt-implementation)

## Project Overview

This application is a full-stack URL shortener with features similar to Bit.ly. It provides:

- Secure user authentication
- URL shortening capabilities
- Analytics for shortened URLs
- User-specific URL management
- Modern, responsive UI

## Setup Instructions

### Prerequisites

- Node.js v20.17.0 (for backend and frontend)
- MySQL (for database)
- npm

### Local Development Setup

#### Backend Setup

````bash
# Clone the repository
git https://github.com/kinggiddy1/bitly.git
cd bitly

# Install dependencies
npm install    (nstall  in order to install all necessary packages)


```bash
ng serve
````

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Navigate to create account to be able to use the sysem

http://localhost:4200/auth

# CREDENTIALS

email: egide@gmail.com
password: 123 or create an account

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
