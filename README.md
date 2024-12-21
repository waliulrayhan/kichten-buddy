# Mofa's Kitchen Buddy

## Overview
Mofa's Kitchen Buddy is a backend system designed to help users manage ingredients and suggest recipes based on available items at home. It leverages a cloud database and a Large Language Model (LLM) chatbot for smart recipe recommendations.

### Features:
1. **Ingredient Management:**
   - Store and update available ingredients.
   - Track quantities and units for better inventory management.

2. **Recipe Management:**
   - Store favorite recipes with descriptions, ingredients, and preparation steps.
   - Support for recipe media (images or text).

3. **Chatbot Integration:**
   - Interact with the chatbot to get recipe suggestions based on available ingredients.
   - Accepts user preferences like cravings for sweets or specific types of dishes.

---

## Technology Stack
- **Frontend Framework:** Next.js
- **Backend Framework:** Prisma ORM with Node.js
- **Database:** PostgreSQL hosted on Aiven Cloud
- **AI Integration:** Google Gemini API

---

## Setup Instructions

### 1. Prerequisites:
- Node.js (v16 or later)
- npm or yarn package manager
- PostgreSQL Database (Cloud hosted by Aiven)
- Google Gemini API key

### 2. Installation:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mofa-kitchen-buddy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### 3. Environment Variables:
Create a `.env` file in the root directory and add the following:
```
DATABASE_URL="postgres://<username>:<password>@<host>:<port>/<database>?sslmode=require"
GEMINI_API_KEY="<your-gemini-api-key>"
```

### 4. Database Migration:
```bash
npx prisma db push
```

### 5. Start the Development Server:
```bash
npm run dev
```

---

## API Endpoints

### 1. Ingredients API
**Base URL:** `/api/ingredients`

- **GET**: Retrieve all ingredients.
  ```http
  GET /api/ingredients
  ```
- **POST**: Add a new ingredient.
  ```http
  POST /api/ingredients
  {
    "name": "Flour",
    "quantity": 2,
    "unit": "kg"
  }
  ```
- **PUT**: Update an ingredient's quantity.
  ```http
  PUT /api/ingredients
  {
    "id": "1",
    "quantity": 3
  }
  ```

### 2. Recipe API
**Base URL:** `/api/recipes`

- **GET**: Retrieve all recipes.
  ```http
  GET /api/recipes
  ```
- **POST**: Add a new recipe.
  ```http
  POST /api/recipes
  {
    "title": "Pancakes",
    "description": "Fluffy homemade pancakes",
    "ingredients": {
      "milk": "1 cup",
      "flour": "2 cups"
    },
    "steps": "Mix ingredients and cook on skillet.",
    "isFavorite": false
  }
  ```

### 3. Chatbot API
**Base URL:** `/api/chatbot`

- **POST**: Get recipe suggestions based on available ingredients.
  ```http
  POST /api/chatbot
  {
    "userMessage": "I want something sweet."
  }
  ```

**Response:**
```json
{
  "reply": "You can make pancakes with the ingredients you have!"
}
```

---

## Database Schema

### Ingredients Table:
| Column    | Type      | Constraints |
|-----------|-----------|-------------|
| id        | String    | Primary Key |
| name      | String    | Required    |
| quantity  | Integer   | Required    |
| unit      | String    | Required    |
| createdAt | Timestamp | Auto-gen    |
| updatedAt | Timestamp | Auto-gen    |

### Recipes Table:
| Column       | Type      | Constraints |
|--------------|-----------|-------------|
| id           | String    | Primary Key |
| title        | String    | Required    |
| description  | String    | Optional    |
| ingredients  | JSON      | Required    |
| steps        | Text      | Required    |
| isFavorite   | Boolean   | Default: No |
| createdAt    | Timestamp | Auto-gen    |
| updatedAt    | Timestamp | Auto-gen    |

### Media Table:
| Column      | Type      | Constraints |
|-------------|-----------|-------------|
| id          | String    | Primary Key |
| recipeId    | String    | Foreign Key |
| mediaType   | String    | Required    |
| content     | Text      | Required    |
| createdAt   | Timestamp | Auto-gen    |

### ChatLog Table:
| Column      | Type      | Constraints |
|-------------|-----------|-------------|
| id          | String    | Primary Key |
| userMessage | String    | Required    |
| botResponse | String    | Required    |
| createdAt   | Timestamp | Auto-gen    |

---

## Deployment
- Ensure the PostgreSQL database is hosted on Aiven Cloud.
- Deploy the app on Vercel or any cloud provider supporting Next.js.

---

## Future Improvements
- **Image Processing for Recipes:** Use OCR to parse text from recipe images.
- **Advanced Preferences Handling:** Allow the chatbot to learn preferences over time.
- **Shopping List Integration:** Generate shopping lists based on missing ingredients.
- **Mobile Support:** Develop a mobile app for easier access.

---

## License
This project is licensed under the MIT License.

---

## Authors
- **Developer:** [Your Name]  
- **Contact:** [Your Email]

---

## Feedback
For feedback or issues, please submit them via the [GitHub Issues](<repository-url>/issues) section.

