import express from "express";
import { connectDB } from "./db/connect.js";
import { appMethods } from "./app.methods.js";
const app= express()
connectDB();
appMethods(app,express)
