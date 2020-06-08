import axios from 'axios';
export const fetchHospital = async (lng: number, lat: number, rad: number) => {
    const clientId = 'LN0ZJJGKI2FVCFDBKHV1KA2CREY2WJVOZT55WH2BWYSF2PXP';
    const clientSecret = '33PMHSOCZJSFYC33MFTFXGYHHESIRM0TCJVQPS5UJ3QXS253';
    try {
        const hospitals = await axios.get(
            `https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&categoryId=4bf58dd8d48988d196941735&radius=${rad}&client_id=${clientId}&client_secret=${clientSecret}&limit=${20}&v=20180628`
        );

        return hospitals.data.response.venues;
    } catch (error) {
        console.log(error);
    }
};
