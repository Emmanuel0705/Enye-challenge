import axios from 'axios';
import Variables from '../keys';
import { getCategoryId } from './getCategoryId';

const fetchHospital = async (
    lng: number,
    lat: number,
    rad: number,
    cat: string
) => {
    const clientId = Variables.CLIENT_ID;
    const clientSecret = Variables.CLIENT_SECRETE;

    const catId = getCategoryId(cat);
    console.log(catId);

    try {
        const hospitals = await axios.get(
            `https://api.foursquare.com/v2/venues/search?ll=${6.550323199999999},${3.3390592}&categoryId=${catId}&radius=${rad}&client_id=${clientId}&client_secret=${clientSecret}&limit=${20}&v=20180628`
        );
        // ${6.550323199999999},${3.3390592}

        if (hospitals.data.response.venues) {
            console.log(hospitals.data.response.venues);
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
