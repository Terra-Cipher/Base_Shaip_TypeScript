# Shaip TypeScript API

This project provides a standardized, secure, and production-ready template for deploying custom logic as a web API.

## Core Concepts

For those unfamiliar with these software principles, here is a brief overview. If you are already comfortable with APIs and containerization, feel free to jump to the [Step-by-Step Tutorial](#step-by-step-tutorial-building-your-first-api).

### API (Application Programming Interface)

An API defines a contract that allows two pieces of software to communicate over a network. This project sets up a web server that listens for incoming HTTP requests at a specific endpoint (`/shaip`). When it receives a request with the expected data, it executes your business logic and sends back a structured response.

### Containerization (Docker)

Containerization solves the problem of "it works on my machine." It packages your application code along with all its dependencies (system libraries, language runtimes, etc.) into a single, lightweight, and portable unit called a **container**.

This ensures a consistent and reproducible environment, guaranteeing that your code runs the same way whether on a local laptop or a cloud server. This project uses **Docker** for containerization.

---

## Step-by-Step Tutorial: Building Your First API

This guide will walk you through setting up the project, testing it, and replacing the placeholder logic with your own.

### Step 1: Get the Code and Install Dependencies

First, you need to download all the necessary code libraries that this project depends on.

1.  Open your terminal or command prompt in the project's root directory.
2.  Run the following command. This reads the `package.json` file and downloads all the required packages into a `node_modules` folder.
    ```bash
    npm install
    ```

### Step 2: Run the Development Server

Now you can start the API on your local machine. We'll use a development server that automatically restarts whenever you save a file, making it easy to see your changes.

1.  Run this command in your terminal:
    ```bash
    npm run dev
    ```
2.  You should see a message indicating the server is running:
    ```
    Server running on http://localhost:3000
    ```
    Your API is now running and ready to accept requests!

### Step 3: Test the API

Let's send a request to the placeholder `/shaip` endpoint to make sure it's working. The placeholder function is a simple number adder.

1.  Open a **new** terminal window (keep the server running in the first one).
2.  Use a tool like `curl` to send a `POST` request. This command sends a JSON object containing an array of numbers to your API.
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"numbers":}' http://localhost:3000/shaip
    ```
3.  The API will process the numbers and return the sum. You should see the following response in your terminal:
    ```json
    {"sum":35}
    ```

### Step 4: Add Your Own Business Logic

This is where you customize the API to do what you need.

1.  Open the file `src/index.ts` in your code editor.
2.  Find the `app.post('/shaip', ...)` block. This is the main entrypoint for your code.

    ```typescript
    app.post('/shaip', (req: Request, res: Response) => {
      // TODO: This is the main entrypoint for your business logic.
      // The TerraCipher Shaip up infrastructure validates all input data before it reaches
      // this function, so you do not need to add any input validation logic here.

      // The `req.body` object contains the validated input data.
      const { numbers } = req.body;

      // TODO: The number adder below is a placeholder.
      // Replace this with your own business logic. For complex logic, it's best
      // practice to import functions from other files within the `src` directory
      // to keep this file clean and maintainable.
      const sum = numbers.reduce((acc: number, current: number) => acc + current, 0);

      res.json({ sum });
    });
    ```

3.  **Replace the placeholder logic.** Let's say your goal is to find the largest number in the array instead of the sum. You would change the code like this:

    ```typescript
    // ... inside the app.post('/shaip', ...) function

    const { numbers } = req.body;

    // Your new business logic:
    const largestNumber = Math.max(...numbers);

    // Return your new result as JSON:
    res.json({ largest: largestNumber });
    ```

4.  **Save the file.** The development server will automatically restart. Now, if you run the same `curl` command from Step 3, you will get a different result:
    ```json
    {"largest":20}
    ```

Congratulations! You have successfully modified the API's business logic.

---

## Running with Docker (Advanced)

Once your logic is complete, you can build a Docker image to prepare for deployment.

1.  **Build the image:**
    ```bash
    docker build -t shaip-ts-api .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 3000:3000 shaip-ts-api
    ```
