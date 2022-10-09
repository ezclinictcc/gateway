import { NextFunction, Request, Response } from "express";

const corsAdapter = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const allowedDomains: string[] = [
    "http://localhost:3000",
    "https://ezclinik.netlify.app/",
  ];
  const origin: string = request.headers.origin || "";

  if (origin.length > 0 && allowedDomains.includes(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
  }

  response.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Request-Headers", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Max-Age", "10");

  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  return next();
};

export default corsAdapter;
