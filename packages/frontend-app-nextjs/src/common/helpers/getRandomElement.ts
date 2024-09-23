export function getRandomIndexFromArr ( arr : unknown[] )
{
    const index = Math.floor(Math.random()*arr.length);
    return index;
}