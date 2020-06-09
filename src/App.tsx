import React, { Fragment, FC, useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import Cards from './Components/HosptCards';
import './App.css';
import { Layout, Select, Form } from 'antd';
import { fetchHospital } from './util/fetchHospitals';
import Spinner from './Components/ui/spinner';
import Alert from './Components/ui/alert';

interface Coords {
    lng: number;
    lat: number;
}
interface StateInterface {
    message: string;
    userCoords: Coords;
    radius: any;
    hospitalData: [];
    hosptName: string;
    geoError: boolean;
}

const App: FC = () => {
    const [state, setState] = useState<StateInterface>({
        userCoords: { lng: 0, lat: 0 },
        hospitalData: [],
        radius: 5000,
        hosptName: '',
        geoError: false,
        message: '',
    });
    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo)
            setState((s) => ({
                ...s,
                message: 'Geolocation is not supported',
            }));
        geo.getCurrentPosition(
            async (position) => {
                const hospitals = await fetchHospital(
                    position.coords.longitude,
                    position.coords.latitude,
                    state.radius
                );
                if (hospitals.length > 0) {
                    const hosptData: any = hospitals.map((el: any) => {
                        return { name: el.name, ...el.location };
                    });

                    setState((s) => ({ ...s, hospitalData: hosptData }));
                    setState((s) => ({
                        ...s,
                        userCoords: {
                            lng: position.coords.longitude,
                            lat: position.coords.latitude,
                        },
                    }));
                } else {
                    setState((s) => ({
                        ...s,
                        message: 'No hospital found within this range',
                    }));
                }
            },
            (error: any) => {
                setState((s) => ({
                    ...s,
                    message:
                        'Unable to get your current location please, refresh this page or user another browser ',
                }));
            }
        );
    }, [state.radius]);
    return (
        <div className="App">
            <Layout>
                <Navbar />
                {state.userCoords.lat !== 0 ? (
                    <Fragment>
                        <Map
                            hospitalData={state.hospitalData}
                            userCoords={state.userCoords}
                        />
                        <Cards hospitalData={state.hospitalData} />
                    </Fragment>
                ) : state.message ? (
                    <Alert
                        message="Error Message"
                        description={state.message}
                    />
                ) : (
                    <Spinner />
                )}
                <div className="select-km">
                    <Form.Item>
                        <Select
                            onChange={(val) =>
                                setState({ ...state, radius: val })
                            }
                            placeholder="Distance away"
                        >
                            <Select.Option value="" disabled>
                                Select kilometer
                            </Select.Option>
                            <Select.Option value={'1000'}>10km</Select.Option>
                            <Select.Option value={'2000'}>20km</Select.Option>
                            <Select.Option value={'3000'}>30km</Select.Option>
                            <Select.Option value={'4000'}>40km</Select.Option>
                            <Select.Option value={'5000'}>50km</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
            </Layout>
        </div>
    );
};

export default App;
