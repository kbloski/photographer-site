import multer from 'multer';
import path, { dirname, join } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

export const uploadPath = path.resolve(__dirname, '../uploads/images');
const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            
            console.log( uploadPath);
            if (!fs.existsSync(uploadPath)){
                // recursive: true: Ta opcja pozwala na tworzenie katalogów wewnętrznych, które nie istnieją.
                fs.mkdirSync(uploadPath, {recursive: true})
            }

            cb(null, uploadPath);
        },
        filename: function(req, file, cb){
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }
);

export const upload = multer( {storage: storage} ); 


// export async function deleteFile( fileUrl : string ){
//     const __filename = fileURLToPath( import.meta.url );
//     const __dirname = dirname( __filename );

//     const pathToFile = join(__dirname, '/..', fileUrl);
//     try {
//         await fs.unlink( pathToFile)
//     } catch (err){

//     }
// }