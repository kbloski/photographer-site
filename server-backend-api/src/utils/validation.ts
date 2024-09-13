export function isNumberString( data : string ){
    const result =  Number(data);
    return !isNaN(result);
}