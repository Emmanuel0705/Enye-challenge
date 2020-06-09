import axios from 'axios';
import Variables from '../keys';

export const fetchHospital = async (lng: number, lat: number, rad: number) => {
    const clientId = Variables.CLIENT_ID;
    const clientSecret = Variables.CLIENT_SECRETE;

    try {
        const hospitals = await axios.get(
            `https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&categoryId=4bf58dd8d48988d196941735&radius=${rad}&client_id=${clientId}&client_secret=${clientSecret}&limit=${20}&v=20180628`
        );
        console.log(hospitals.data);

        return hospitals.data.response.venues;
    } catch (error) {
        console.log(error);
    }
};
