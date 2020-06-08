import React, { Component, Fragment } from 'react';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import Cards from './Components/HosptCards';
import './App.css';
import { Layout, Select, Form } from 'antd';
import { fetchHospital } from './util/fetchHospitals';
import Spinner from './Components/ui/spinner';
import Alert from './Components/ui/alert';

export interface Coords {
    lng: number;
    lat: number;
}
interface Prop {
    userCoords: Coords;
    radius: any;
    clientId: string;
    clientSecret: string;
    hospitalData: [];
    hosptName: string;
    geoError: boolean;
    message: string;
}

class App extends Component<{}, Prop> {
    constructor(props: any) {
        super(props);
        this.state = {
            userCoords: { lng: 0, lat: 0 },
            hospitalData: [],
            radius: 1000,
            clientId: 'LN0ZJJGKI2FVCFDBKHV1KA2CREY2WJVOZT55WH2BWYSF2PXP',
            clientSecret: '33PMHSOCZJSFYC33MFTFXGYHHESIRM0TCJVQPS5UJ3QXS253',
            hosptName: '',
            geoError: false,
            message: '',
        };
    }
    async componentDidMount() {
        const geo = navigator.geolocation;
        if (!geo) console.log('Geolocation is not supported');
        geo.getCurrentPosition(
            async (position) => {
                const hospitals = await fetchHospital(
                    position.coords.longitude,
                    position.coords.latitude,
                    this.state.radius
                );
                if (hospitals.length > 0) {
                    const hosptData: any = hospitals.map((el: any) => {
                        console.log(el);
                        return { name: el.name, ...el.location };
                    });

                    this.setState({
                        hospitalData: hosptData,
                    });
                    this.setState({
                        userCoords: {
                            lng: position.coords.longitude,
                            lat: position.coords.latitude,
                        },
                    });
                } else {
                    this.setState({
                        message: 'No hospital found within this range',
                    });
                }
            },
            (error: any) => {
                this.setState({
                    message:
                        'Unable to get your current location please, refresh this page or user another browser ',
                });
            }
        );
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.radius !== this.state.radius) {
            const geo = navigator.geolocation;
            if (!geo) console.log('Geolocation is not supported');
            geo.getCurrentPosition(
                async (position) => {
                    const hospitals = await fetchHospital(
                        position.coords.longitude,
                        position.coords.latitude,
                        this.state.radius
                    );
                    if (hospitals.length > 0) {
                        const hosptData: any = hospitals.map((el: any) => {
                            console.log(el);
                            return { name: el.name, ...el.location };
                        });

                        this.setState({
                            hospitalData: hosptData,
                        });
                        this.setState({
                            userCoords: {
                                lng: position.coords.longitude,
                                lat: position.coords.latitude,
                            },
                        });
                    } else {
                        this.setState({
                            message: 'No hospital found within this range',
                        });
                    }
                },
                (error: any) => {
                    this.setState({
                        message:
                            'Unable to get your current location please, refresh this page or user another browser ',
                    });
                }
            );
        }
    }
    render<Rc>() {
        return (
            <div className="App">
                <Layout>
                    <Navbar />
                    {this.state.userCoords.lat !== 0 ? (
                        <Fragment>
                            <Map
                                hospitalData={this.state.hospitalData}
                                userCoords={this.state.userCoords}
                            />
                            <Cards hospitalData={this.state.hospitalData} />
                        </Fragment>
                    ) : this.state.message ? (
                        <Alert
                            message="Error Message"
                            description={this.state.message}
                        />
                    ) : (
                        <Spinner />
                    )}
                    <div className="select-km">
                        <Form.Item>
                            <Select
                                onChange={(val) =>
                                    this.setState({ radius: val })
                                }
                                placeholder="Distance away"
                            >
                                <Select.Option value="" disabled>
                                    Select kilometer
                                </Select.Option>
                                <Select.Option value={'1000'}>
                                    10km
                                </Select.Option>
                                <Select.Option value={'2000'}>
                                    20km
                                </Select.Option>
                                <Select.Option value={'3000'}>
                                    30km
                                </Select.Option>
                                <Select.Option value={'4000'}>
                                    40km
                                </Select.Option>
                                <Select.Option value={'5000'}>
                                    50km
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                </Layout>
            </div>
        );
    }
}

export default App;
