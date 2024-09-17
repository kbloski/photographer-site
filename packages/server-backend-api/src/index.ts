
// Cel: Punkt wejściowy aplikacji.
import app from "./app";
import { API_PORT } from "./config";
import registerRoutes from "./routes/routes";

const PORT = API_PORT || 3010;

registerRoutes(app);

app.get("/", async (req, res) => {
    res.status(200).json({
        msg: "Server started at PORT " + PORT,
    });
});

app.listen(PORT, async () => {
    console.log("Server running on port " + PORT);
});
