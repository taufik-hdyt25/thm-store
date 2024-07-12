import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) return res.status(401).json({
        message: "unAuthorization"
    })

    const token = authorizationHeader.split(" ")[1]
    
    const auth = jwt.verify(token,"sdfdsfdsfdsfdsfsf")
    res.locals.auth = auth
    next()
  } catch (error) {
    return res.status(500).json({
        message: error
    })
  }
}
