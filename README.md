# Media MCP Server

A Model Context Protocol (MCP) server that exposes media utilities for AI clients. The server currently provides tools for querying TMDB season data and inspecting media libraries on Plex.

## Features

- MCP-compliant API for AI integration over HTTP+SSE
- TMDB season helper with episode counts and schedules
- Plex media inventory with seasons and episodes
- Simple Nest.js architecture ready for adding more tools

## Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Plex and TMDB settings
```

## Running the server

```bash
# Development mode
npm run start:dev

# Production mode
npm run start
```

The server listens on port 3000 by default.

## MCP Endpoints

- `GET /sse`: SSE connection endpoint
- `POST /messages`: Tool execution endpoint

## Available Tools

### tmdb-get-season-info

Get detailed information about a TV show season from TMDB.

Parameters:

- `title`: Original title of the TV show
- `seasonNumber`: Season number to inspect

### plex-get-all-media

Retrieve a list of movies and TV shows from a Plex server with detailed information about seasons and episodes.

Parameters:

- `type`: (Optional) Type of media to retrieve: `"all"`, `"movies"`, or `"shows"` (default: `"all"`)

## Environment Variables

### Plex Configuration

- `PLEX_URL`: URL of your Plex server (e.g., http://localhost:32400)
- `PLEX_TOKEN`: (Optional) Your Plex authentication token
- `PLEX_USERNAME`: (Optional) Your Plex username/email - alternative to token
- `PLEX_PASSWORD`: (Optional) Your Plex password - alternative to token
- `PLEX_TOKEN_FILE`: (Optional) Path to store Plex token for reuse (default: ./.cookie/plex.token)

You can either use `PLEX_TOKEN` directly or provide `PLEX_USERNAME` and `PLEX_PASSWORD` to have the server automatically retrieve and refresh the token.

### TMDB Configuration

- `TMDB_API_KEY`: Your TMDB API key (get it from https://www.themoviedb.org/settings/api)

### App Configuration

- `PORT`: (Optional) Port for the server to listen on (default: 3000)

## Documentation

See [INSTRUCTIONS.md](./INSTRUCTIONS.md) for architecture details and development workflow.

## CI/CD

The project uses GitHub Actions for continuous integration and deployment:

- On push to main branch: Runs tests, linting, builds the project, and deploys to production
- On pull requests: Runs tests, linting, and builds the project

For deployment, you can use Docker with the provided `docker-compose.yml`:

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```
