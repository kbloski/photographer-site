// Cel: Punkt wejściowy aplikacji.
import app from './app';
import { API_PORT } from './config/config';

const PORT = API_PORT || 3010;

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Server started at PORT " + PORT
    })
})

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

