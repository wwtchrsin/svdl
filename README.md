# Simple Video Downloader Client
The client side of a web app that provides a user interface for
the yt-dlp utility. The client was written in Svelte

## Requirements
* Node.js

## Installation
```bash
npm install
```

## Configuration
To link the client to the server the following environment variables
must be set to the proper values:
* `PUBLIC_BACKEND_SERVER`: URL address of the server the app will
send requests to. In development mode it's http://localhost:3000. 
* `PUBLIC_FILE_SERVER`: URL address of the server serving the files
that has been downloaded. In development mode it's http://localhost:3000.

You can redefine the app name in the header and the page title by 
modifying the `PUBLIC_APP_NAME` environment variable.


## Building
By default the app is using svelte vercel adapter. 
You can change the adapter used by modifying the `svelte.config.ts` file.
Refer to the Svelte-Kit documentation to get a list of all supported adapters.
