# Development Instructions

## Architecture Overview

This application implements the Model Context Protocol (MCP) with a Nest.js backend. It exposes a small set of tools for AI clients to work with media data from Plex and TMDB.

## Development History

- Initial Nest.js project scaffolding
- Adopted MCP server module and SSE endpoints
- Added Plex media inspection tool
- Added TMDB season helper for episodic content
- Hardened configuration and error handling for long-running MCP sessions

## MCP Implementation

The app integrates the Model Context Protocol (MCP) to expose media-related tools. The MCP module uses `@rekog/mcp-nest` for transport and tool registration.

### MCP Module Structure

```
src/
├── mcp/
│   ├── mcp.module.ts        # MCP module configuration
│   ├── plex.tool.ts         # Plex MCP tools implementation
│   └── tmdb.tool.ts         # TMDB MCP tools implementation
```

### MCP Server Configuration

`mcp.module.ts` wires the MCP server with the available tools:

```typescript
@Module({
  imports: [
    ConfigModule,
    McpModule.forRoot({
      name: 'media-mcp-server',
      version: '1.0.0',
    }),
    PlexModule,
    TmdbModule,
  ],
  providers: [PlexTool, TmdbTool],
  exports: [McpModule],
})
export class McpServerModule {}
```

### MCP Endpoints

- `GET /sse`: Server-Sent Events (SSE) connection endpoint
- `POST /messages`: Tool execution endpoint

### Available MCP Tools

#### tmdb-get-season-info

Retrieves detailed information about a TV show season from TMDB.

Parameters:

- `title`: Original title of the TV show
- `seasonNumber`: Season number to query

Returns a JSON payload with episode counts and schedule.

#### plex-get-all-media

Retrieves movies and TV shows from a Plex server with season and episode details.

Parameters:

- `type`: Type of media to retrieve: `"all"`, `"movies"`, or `"shows"` (default: `"all"`)

### Tool Implementation

Tools use the `@Tool` decorator with Zod schemas for validation. Each tool delegates to the corresponding service.

Example (`tmdb-get-season-info`):

```typescript
@Tool({
  name: 'tmdb-get-season-info',
  description: 'Get information about total episodes in a TV show season using TMDB',
  parameters: z.object({
    title: z.string().describe('Original title of the TV show'),
    seasonNumber: z.number().describe('Season number to get information about'),
  }),
})
async getSeasonInfo({ title, seasonNumber }) {
  const show = await this.tmdbService.searchShow(title);
  // ...
}
```

### MCP Integration in Main Application

`app.module.ts` plugs the MCP server alongside Plex and TMDB modules:

```typescript
@Module({
  imports: [ConfigModule.forRoot(), McpServerModule, TmdbModule, PlexModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Project Structure

```
src/
├── main.ts                  # Application entry point
├── app.module.ts            # Root module
├── mcp/                     # MCP server module and tools
├── plex/                    # Plex module and service
└── tmdb/                    # TMDB module and service
```

## Development Workflow

### Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env` and fill in Plex/TMDB settings

### Running

- `npm run start:dev` for development
- `npm run start` for production build (after `npm run build`)

### Testing and Quality

- `npm run test` to execute tests
- `npm run lint` to lint the codebase
- `npm run type-check` for TypeScript validation
