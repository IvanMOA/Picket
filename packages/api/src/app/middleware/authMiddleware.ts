import { NextFunction, Request, Response } from "express";
import { logger } from "../../shared/infrastructure/logger/logger";
import { auth } from "../../shared/infrastructure/clients/Firebase";
import { Role } from "../../modules/users/domain/Role";
export const authMiddleware =
  (allowedRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader)
        return res.status(401).json({ message: "no_authorization_header" });
      const [_, jwt] = (authorizationHeader as string).split(" ");
      const jwtClaims = await auth.verifyIdToken(jwt);
      req.administratorJwtClaims = jwtClaims as any;
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(req.administratorJwtClaims.role as Role)
      ) {
        res.status(403).json({
          message: "Invalid user role",
        });
      }
      next();
    } catch (e) {
      logger.error(e);
      res.status(401).json({
        message: "Invalid jwt",
      });
    }
  };
