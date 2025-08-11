import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Progresso routes working" });
});

export default router;
