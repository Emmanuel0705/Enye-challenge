import React, { FC, useEffect, useState, createRef } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl from 'react-mapbox-gl';
import variables from '../../keys';

ReactMapboxGl({
    accessToken: variables.MAPBOX_TOKEN,
});

interface Coords {
    lng: number;
    lat: number;
}

interface Props {
    hospitalData: any[];
}
const token = variables.MAPBOX_TOKEN;
mapboxgl.accessToken = token;

const MapContainer: FC<Props> = ({ hospitalData }) => {
    const [mapData] = useState({
        zoom: 5,
        mapContainer: createRef<HTMLDivElement>(),
    });
    useEffect((): void => {
        const map = new mapboxgl.Map({
            container: mapData.mapContainer.current!,
            style: 'mapbox://styles/oluwatobi16/ckb464qtk18281jqoox4e7gtw',
            scrollZoom: false,

            zoom: mapData.zoom,
        });

        const bound = new mapboxgl.LngLatBounds();

        hospitalData.forEach(
            (el: any) => {
                const htmlEl = document.createElement('div');
                htmlEl.className = 'marker';
                new mapboxgl.Marker({
                    element: htmlEl,
                    anchor: 'bottom',
                })
                    .setLngLat([el.coords.lng, el.coords.lat])
                    .addTo(map);

                new mapboxgl.Popup({
                    offset: 40,
                })
                    .setLngLat([el.coords.lng, el.coords.lat])
                    .setHTML(`<p>${el.name}</p>`)
                    .addTo(map);

                bound.extend([el.coords.lng, el.coords.lat]);
            },
            [mapData.zoom, mapData.mapContainer]
        );
        map.fitBounds(bound);
    });
    return <div ref={mapData.mapContainer} className="map-section"></div>;
};

export default MapContainer;
