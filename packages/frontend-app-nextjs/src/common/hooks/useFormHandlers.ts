export const handlerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setStateFunction: any
) => {
    setStateFunction(event.target.value);
};
