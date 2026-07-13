import express, { Request, Response } from 'express';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
// Middleware to parse JSON bodies
app.use(express.json());

/**
 * @route GET /keep-alive
 * @desc Keep alive endpoint.
 * @access Public
 */
app.get('/keep-alive', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * @route POST /shaip
 * @desc Calculates the sum of an array of numbers.
 * @access Public
 */

app.post('/shaip', (req: Request, res: Response) => {
      // TODO: This is the main entrypoint for your business logic.
      // The TerraCipher Shaip up infrastructure validates all input data before it reaches
      // this function, so you do not need to add any input validation logic here.

      // The `req.body` object contains the validated input data.
      const numbers = req.body;

      // TODO: The number adder below is a placeholder.
      // Replace this with your own business logic. For complex logic, it's best
      // practice to import functions from other files within the `src` directory
      // to keep this file clean and maintainable.
      const sum = numbers.reduce((acc: number, current: number) => acc + current, 0);

      res.json({ sum });
    });

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Graceful shutdown logic
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} signal received: closing HTTP server.`);
  server.close(() => {
    console.log('HTTP server closed.');
    // If you have database connections, etc., close them here.
    process.exit(0);
  });
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));