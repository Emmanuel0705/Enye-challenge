export const getCoords = (): number | boolean => {
    const geo = navigator.geolocation;
    if (!geo) {
        return false;
    }
    return 123;
    return 123;
    console.log('mount');
    geo.getCurrentPosition((position) => {
        console.log('mount**');
        return position.coords.longitude;
    });
    return 123;
};
