import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { unlink } from 'node:fs';

export const uploadPath = './uploads/images';
const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            const fpath = path.resolve(__dirname, '../','../', uploadPath )
            console.log( fpath )
            if (!fs.existsSync(fpath)){
                // recursive: true: Ta opcja pozwala na tworzenie katalogów wewnętrznych, które nie istnieją.
                fs.mkdirSync(fpath, {recursive: true})
            }

            cb(null, fpath);
        },
        filename: function(req, file, cb){
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }
);

export const upload = multer( {storage: storage} ); 

/**
 * Delete file 
 * @base_dir dir app
 * @param urlFormat /path/to/file
 * 
*/
export function deleteFile( fileUrl : string = '/file/to/path.ext'){
    try {
        const filePath = path.join(__dirname, '../', '../', fileUrl)
        unlink( filePath , ()=>{});
        return { deleted : true };
    } catch (err){
        return { deleted : false, error: err };
    }
}

export function loadJsonFileSync( path : string ) : any
{
    try {
        const data = fs.readFileSync( path, 'utf-8');
        return JSON.parse(data);
    } catch (err){
        throw new Error( `Error reading or parsing JOSN file: ${err}`);
    }
}