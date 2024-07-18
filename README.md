# BrisPHP LLM Talk

ChatGPT is cool, but how do we go about actually developing something that could make it's way to production?

This repo provides scripts that iteratively build upon each other to build an HTTP API that can receive an input recipe
name and it returns the most relevant category using an LLM.

## Prerequisites

Copy the `.env.dist` to create `.env` and fill in the required values. 

```bash
cp .env.dist .env
```

You will need to have an OpenAI API key and a LangSmith API Key:
* [OpenAI](https://openai.com/api/) lets you top up with credits and pay as you go (min $5)
* [LangSmith](https://smith.langchain.com/) has a generous free tier

## Setup

(Optional): Use Node version 20 with `nvm`

```bash
nvm use
```

**Install dependencies**

```bash
npm install
```

## Running the scripts:

```bash
npm run 1 # This is a simple hello world script
npm run 2 # This prototypes calling the API with a recipe name
npm run 3 # This demonstrates how to receive structured output
npm run 4 # This shows how to use LangSmith to iterate
npm run 5 # This runs a HTTP API on port 3000
npm run 5-experiment # This runs an experiment using the same chain from the API
```

## Disclaimer

This code is not ready for production :) please don't ship the API 😅

## Show me what you build!

I'd love to hear if you build something cool as a result of my talk or this repo (regardless of whether it gets to production!)

Send me a message on [LinkedIn](https://www.linkedin.com/in/tom-newby/) to say G'day!

## Further resources:

- Unsupervised Learning Podcast:
  - [w/LangChain CEO](https://open.spotify.com/episode/1XUTbCirHDmQ9D5yhWaJhU?si=10d29530c86543a9)
  - [w/Notion AI Engineer Linus Lee](https://open.spotify.com/episode/0GlMttHfQoGMb4w0Fyt5HD?si=b1b33e62f0d742ce)
- [DeepLearning.ai courses](https://learn.deeplearning.ai/) - free and great!
- [/r/LangChain](https://www.reddit.com/r/LangChain/)
  - [Why does my RAG suck?](https://www.reddit.com/r/LangChain/comments/1e0rsou/why_does_my_rag_suck_and_how_do_i_make_it_good/?share_id=9nwg3HcN2swEXG1JIDf7Z&utm_name=ioscss)
  - [The most important thing to build great RAG system](https://www.reddit.com/r/LangChain/comments/1dr5kki/the_most_important_thing_to_build_great_rag_system/?share_id=JcpiShWEeQwKbum2M3yXg&utm_name=ioscss)
- [LLMs in Production online conference replay](https://home.mlops.community/home/collections/llms-in-production-conference-part-iii-2023)