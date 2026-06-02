import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import handler from './dist/server/server.js';
import fs from 'node:fs';
import path from 'node:path';

const app = new Hono();

// Serve static assets from dist/client
app.use('/assets/*', serveStatic({ root: './dist/client' }));

// For any other files, serve them if they exist in dist/client, else delegate to TanStack Start SSR
app.use('*', async (c, next) => {
  const url = new URL(c.req.url);
  const filePath = path.join('./dist/client', url.pathname);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return serveStatic({ root: './dist/client' })(c, next);
  }
  
  return handler.fetch(c.req.raw, {}, {});
});

const port = parseInt(process.env.PORT || '3000', 10);
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
