# NLP Chat Support

A Node.js-based chat support system that uses Natural Language Processing (NLP) to handle user queries about product stock availability. The application parses user messages to extract product information and provides real-time stock status responses.

## Features

- **NLP-Powered Parsing**: Extracts product IDs, brands, quantities, and intents from user messages.
- **Stock Checking**: Queries a SQLite database to check product availability.
- **Intent Recognition**: Supports various intents like stock checks, price inquiries, orders, and blocks.
- **RESTful API**: Simple API endpoint for chat interactions.
- **Database Support**: Uses SQLite for storing stock data.

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework for API
- **SQLite3**: Database for stock data
- **NLP Parser**: Custom utility for message parsing
- **Body-parser & CORS**: For handling requests and cross-origin support

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/nlp-chat-support.git
   cd nlp-chat-support
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Run the seed script to populate the database with sample stock data:
     ```bash
     node seed.js
     ```
   - This will create a `stock.db` file with product information.

## Usage

1. **Start the server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

2. **Send a chat message**:
   Use a tool like Postman or curl to send a POST request to the API endpoint.

   **Endpoint**: `POST /api/chat`

   **Request Body** (JSON):
   ```json
   {
     "message": "Do you have 2003 vivo in stock? I need 5 pieces."
   }
   ```

   **Example Response**:
   ```json
   {
     "intent": "STOCK_CHECK",
     "message": "5 pcs available for Android2003 vivo"
   }
   ```

## API Documentation

### POST /api/chat

Handles chat messages and returns stock information based on NLP parsing.

- **Request**:
  - Content-Type: `application/json`
  - Body: `{ "message": "Your chat message here" }`

- **Response**:
  - Success: JSON with intent and message
  - Error: `{ "error": "Message is required" }` (400 status)

### Supported Intents

- **STOCK_CHECK**: Check availability (keywords: stock, available, urgent)
- **PRICE_CHECK**: Inquire about price (keywords: price, rate)
- **ORDER**: Request dispatch (keywords: bhej, dispatch, send)
- **BLOCK**: Block something (keyword: block)
- **UNKNOWN**: Unrecognized intent

### Message Parsing

The NLP parser extracts:
- **Product ID**: 4-digit numbers (e.g., 2003)
- **Brand**: From a predefined list (vivo, oppo, samsung, iphone, etc.)
- **Quantity**: Numbers in the message
- **Intent**: Based on keywords

## Database Schema

The `stock` table contains:
- `id`: Unique identifier
- `name`: Product name (includes brand and model)
- `quantity`: Available stock count

Sample data includes Android and iOS devices from various brands.

## Development

- **Scripts**:
  - `npm start`: Start the server with nodemon for development
  - `npm test`: Currently not implemented

- **Project Structure**:
  ```
  src/
    app.js              # Main application file
    config/
      db.js             # Database configuration
    controllers/
      chatController.js # Chat handling logic
    routes/
      chatRoutes.js     # API routes
    services/
      stockService.js   # Stock data service
    utils/
      logger.js         # Logging utility
      nlpParser.js      # NLP parsing logic
  seed.js                # Database seeding script
  package.json           # Dependencies and scripts
  ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please open an issue on GitHub.