export const getCategoryId = (cat: string): string => {
    switch (cat) {
        case 'hospital':
            return '4bf58dd8d48988d196941735';
        case 'clinic':
            return '56aa371be4b08b9a8d5734ff';
        case 'pharmacie':
            return '4bf58dd8d48988d10f951735';
        case 'medical':
            return '4bf58dd8d48988d104941735';
        default:
            return '4bf58dd8d48988d196941735';
    }
};
