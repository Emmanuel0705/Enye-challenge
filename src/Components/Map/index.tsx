import React, { FC, useEffect, useState, createRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface Coords {
    lng: number;
    lat: number;
}

interface Props {
    userCoords: Coords;
    hospitalData: [];
}
const token =
    'pk.eyJ1Ijoib2x1d2F0b2JpMTYiLCJhIjoiY2tiNDMwcGZ3MDEzYzJxcXY1eG8wZXQydSJ9.Du7ktziHmbmXp3X9GGGauQ';
mapboxgl.accessToken = token;

const MapContainer: FC<Props> = ({ hospitalData, userCoords }) => {
    const [mapData] = useState({
        zoom: 2,
        mapContainer: createRef<HTMLDivElement>(),
    });
    useEffect((): void => {
        console.log('hosp', hospitalData);
        console.log('user', userCoords);
        const map = new mapboxgl.Map({
            container: mapData.mapContainer.current!,
            style: 'mapbox://styles/oluwatobi16/ckb464qtk18281jqoox4e7gtw',
            scrollZoom: false,

            zoom: mapData.zoom,
        });

        const bound = new mapboxgl.LngLatBounds();

        hospitalData.forEach(
            (el: any) => {
                console.log([el.lng, el.lat]);
                const htmlEl = document.createElement('div');
                htmlEl.className = 'marker';
                new mapboxgl.Marker({
                    element: htmlEl,
                    anchor: 'bottom',
                })
                    .setLngLat([el.lng, el.lat])
                    .addTo(map);
                console.log([el.lng, el.lat]);
                new mapboxgl.Popup({
                    offset: 40,
                })
                    .setLngLat([el.lng, el.lat])
                    .setHTML(`<p>${el.name}</p>`)
                    .addTo(map);

                bound.extend([el.lng, el.lat]);
            },
            [mapData.zoom, mapData.mapContainer]
        );
        map.fitBounds(bound);
    });
    return <div ref={mapData.mapContainer} className="map-section"></div>;
};

export default MapContainer;