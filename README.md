# gemini-starter

Basic starter for uploading images to the Gemini API. Built initially for team *Pancakes* at the 2025 Prewired Summer Make-a-Thon.

## How to use

1. Clone repository
2. Run `npm i` to install dependencies
3. Add a .env file with `GEMINI_API_KEY=<your Gemini API key here>`
4. (Optional) Define the HTTP port you'd like to use in your .env file with `PORT=<your favourite number here>`
5. (Optional) Change Gemini's instructions on line 52 of `server.js`
6. Run the server with `npm start` and navigate to `localhost:3000` (or your custom port)
7. Hack away!

## Understanding the dependencies

* `@google/genai` - Google's library for connecting to Gemini
* `dotenv` - Allows for handling .env files for keeping your API key secret
* `express` - Software for writing a JavaScript server
* `multer` - Extension of Express to handle uploading files (in our case, the images)
* `nodemon` - Extension of Node that automatically restarts the server for us when `server.js` is updated
