import { Request, Response, Router } from "express";
import { BaseController } from "../BaseController";
import { RegisterVisitor } from "../../../modules/visitors/resolvers/register-visitor/RegisterVisitor";
import { VisitorsRepository } from "../../../modules/visitors/domain/VisitorsRepository";
import multer from "multer";
const upload = multer({ dest: "storage/" });
export class PlacesControllerV1 extends BaseController {
  public router: Router;
  constructor() {
    super();
    this.router = Router();
    this.router.post(
      "/v1/places/upload-sections-svg",
      upload.single("sections_svg"),
      this.handleSectionsSvgFileUpload
    );
  }
  private handleSectionsSvgFileUpload = async (req: Request, res: Response) =>
    this.wrapToHandleErrors(async () => {
      res.status(201).json({
        file: {
          // @ts-ignore
          filename: req.file.filename,
        },
      });
    }, res);
}
