import axios from 'axios';
import Variables from '../keys';

const fetchHospital = async (lng: number, lat: number, rad: number) => {
    const clientId = Variables.CLIENT_ID;
    const clientSecret = Variables.CLIENT_SECRETE;
    console.log(123);

    try {
        const hospitals = await axios.get(
            `https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&categoryId=4bf58dd8d48988d196941735&radius=${rad}&client_id=${clientId}&client_secret=${clientSecret}&limit=${20}&v=20180628`
        );
        // ${6.550323199999999},${3.3390592}

        if (hospitals.data.response.venues) {
            const hosptData: any = hospitals.data.response.venues.map(
                (el: any) => {
                    return { name: el.name, ...el.location };
                }
            );
            return hosptData;
        }
    } catch (error) {
        return ['error', 'Error Occured, Pls refresh This Page'];
    }
};
export default fetchHospital;
