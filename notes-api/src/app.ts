import corsOptions from "@/config/cors";
import authRoutes from "@/modules/auth/routes";
import userRoutes from "@/modules/user/routes";
import notesRoutes from "@/modules/notes/routes";
import {
  errorHandler,
  notFoundHandler,
} from "@/shared/middleware/errorHandler";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = express.Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use("/user", userRoutes);
apiRouter.use("/notes", notesRoutes);
app.use("/api", apiRouter);

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
