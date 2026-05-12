# Integrating With HubSpot I: Foundations Practicum

A Node.js + Express application that integrates with the HubSpot CRM API to display and create custom object records.

## Custom Object List View

> 🔗 Replace this URL with your actual HubSpot test account link:
> `https://app.hubspot.com/contacts/<YOUR-ACCOUNT-ID>/objects/<YOUR-OBJECT-ID>/views/all/list`

---

## About This App

This app uses the **Pets** custom object with the following properties:

| Property | Type   | Description         |
|----------|--------|---------------------|
| name     | String | Name of the pet     |
| species  | String | Species of the pet  |
| age      | Number | Age of the pet      |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```
PRIVATE_APP_ACCESS_TOKEN=your_token_here
CUSTOM_OBJECT_TYPE=2-XXXXXXX
```

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

### 4. Run the app

```bash
node index.js
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## Routes

| Method | Route          | Description                          |
|--------|----------------|--------------------------------------|
| GET    | `/`            | Homepage — lists all custom objects  |
| GET    | `/update-cobj` | Shows the form to add a new record   |
| POST   | `/update-cobj` | Submits the form and creates a record|

---

## Tech Stack

- Node.js
- Express
- Axios
- Pug
- HubSpot CRM API v3
