# BrisPHP LLM Talk

ChatGPT is cool, but how do we go about actually developing something that could make it's way to production?

This repo provides scripts that iteratively build upon each other to build an HTTP API that can receive an input recipe
name and it returns the most relevant category using an LLM.

## Setup

(Optional): Use Node version 20 with nvm

```bash
nvm use
```

**Install dependencies**

```bash
npm install
```

**Setup .env**
```bash
cp .env.dist .env
```

Then edit the `.env` file to insert OpenAI API keys and Langsmith credentials.

## Running the scripts:

```bash
npm run 1 # This is a simple hello world script
npm run 2 # This prototypes calling the API with a recipe name
npm run 3 # This demonstrates how to receive structured output
npm run 4 # This shows how to use Langsmith to iterate
npm run 5 # This runs a HTTP API on port 3000
```