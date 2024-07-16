import express from "express";

export type RequestObject = express.Request & { requestId: string };