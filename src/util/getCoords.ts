export const getCoords = (): number | boolean => {
    const geo = navigator.geolocation;
    if (!geo) {
        return false;
    }
    geo.getCurrentPosition((position) => {
        return position.coords.longitude;
    });
    return 123;
};
