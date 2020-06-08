import React, { Component, Fragment } from 'react';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import Cards from './Components/HosptCards';
import './App.css';
import { Layout, Select, Form } from 'antd';
import { fetchHospital } from './util/fetchHospitals';
import Spinner from './Components/ui/spinner';

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
        };
    }
    async componentDidMount() {
        const geo = navigator.geolocation;
        if (!geo) {
            console.log('Geolocation is not supported');
        }
        console.log('mount');
        geo.getCurrentPosition(async (position) => {
            console.log(position.coords.longitude, position.coords.latitude);
            const hospitals = await fetchHospital(
                position.coords.longitude,
                position.coords.latitude,
                this.state.radius
            );

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
            console.log(hosptData);
        });
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.radius !== this.state.radius) {
            const geo = navigator.geolocation;
            if (!geo) {
                console.log('Geolocation is not supported');
            }
            geo.getCurrentPosition(async (position) => {
                console.log(
                    position.coords.longitude,
                    position.coords.latitude
                );
                const hospitals = await fetchHospital(
                    position.coords.longitude,
                    position.coords.latitude,
                    this.state.radius
                );

                const hosptData: any = hospitals.map((el: any) => {
                    console.log(el);
                    return { name: el.name, ...el.location };
                });

                this.setState({
                    hospitalData: hosptData,
                });
            });
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
