export interface StateInter {
    map: MapInterface;
    user: UserInt;
}

interface UserInt {
    userData: { id: string; email: string };
}

export interface FetchMapData {
    lng: number;
    lat: number;
    radius: number;
}

interface MapInterface {
    mapData: any[];
    radius: number;
    userCoords: { lng: number; lat: number };
    message: string;
    category: string;
    loading: boolean;
    viewResult: boolean;
}
