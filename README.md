# Central
A repo of little projects - a scratchpad of sorts

This repository, central, is my personal learning scratchpad. It's a place where I experiment with new concepts I'm currently studying.

This repo serves as a living portfolio, 

Feel free to browse, and if you have any questions about the code or my learning journey, don't hesitate to reach out.

## Docker Commands

To serve the application using Docker:

```bash
# Build and start the application
docker-compose up --build

# Start the application in detached mode (background)
docker-compose up -d

# Stop the application
docker-compose down

# View application logs
docker-compose logs -f

# Rebuild and restart (useful after code changes)
docker-compose up --build --force-recreate
```

The application will be available at `http://localhost:3000`

## log
- Initialized Vue project
- Added TailwindCSS
- Added a homepage including a stopwatch widget with a styled 8 segment display
- Added a template for database interaction (coming soon)
- Added a network topology chart for fun
- BIG: Vue is now dockerized! Serving the site is now easy!

