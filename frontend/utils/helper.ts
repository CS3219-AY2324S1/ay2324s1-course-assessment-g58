export const randomColor = () => {
    return (
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
};

export const capitalizeString = (input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};
