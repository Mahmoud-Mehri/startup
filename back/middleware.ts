import { Request, Response, NextFunction } from "express";

export const validatePhaseId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const phaseId = parseInt(req.params.id);
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Parameter `id` in not valid!",
    });
  }

  next();
};

export const validateTaskId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = parseInt(req.params.taskId);
  } catch (err) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Parameter `taskId` in not valid!",
    });
  }

  next();
};

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Path not found!" });
};
