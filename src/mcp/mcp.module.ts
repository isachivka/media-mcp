import { Module } from '@nestjs/common';
import { McpModule } from '@rekog/mcp-nest';
import { ConfigModule } from '../config';
import { PlexTool } from './plex.tool';
import { PlexModule } from '../plex/plex.module';
import { TmdbModule } from '../tmdb/tmdb.module';
import { TmdbTool } from './tmdb.tool';

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
