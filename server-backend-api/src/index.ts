// Cel: Punkt wejściowy aplikacji.
import app from './app';
import { API_PORT } from './config/config';
import { userController } from './controllers/controllers';
import { UserRoles, UserType } from './types/UserType';

const PORT = API_PORT || 3010;

app.get('/', async (req, res) => {

    res.status(200).json({
        msg: "Server started at PORT " + PORT
    })
})

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});


