import React, { useEffect } from 'react';
import { Tabs, Card, Layout } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import CategoryCard from '../HosptCards';
import Spinner from '../ui/spinner';
import { clearLoader } from '../../redux/actions/map.acton';
import Writer from '../ui/writer';

const { TabPane } = Tabs;
const MapStateToProps = (state: any) => ({
    hospitals: state.map.hospitals,
    clinics: state.map.clinics,
    pharmacies: state.map.pharmacies,
    medicals: state.map.medicals,
    lodading: state.map.loading,
});

const MapDispatchToProp = (dispatch: Function) => ({
    clearLoader: () => dispatch(clearLoader()),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const Tab = (props: Props) => {
    const { hospitals, clearLoader } = props;
    useEffect(() => {
        // console.log('hospital', hospitals);
        // if (hospitals.length > 0) {
        //     clearLoader();
        // }
    }, [hospitals, clearLoader]);
    return (
        <div className="tab-section">
            <Card>
                {props.lodading ? (
                    <Spinner />
                ) : (
                    <Tabs defaultActiveKey="5" type="card" size="large">
                        <TabPane tab="Hospitals" key="1">
                            <Layout>
                                <CategoryCard hospitalData={props.hospitals} />
                            </Layout>
                        </TabPane>
                        <TabPane tab="Medical Offices" key="2">
                            <Layout>
                                <CategoryCard hospitalData={props.medicals} />
                            </Layout>
                        </TabPane>
                        <TabPane tab="Clinics" key="3">
                            <Layout>
                                <CategoryCard hospitalData={props.clinics} />
                            </Layout>
                        </TabPane>
                        <TabPane tab="Pharmacies" key="4">
                            <Layout>
                                <CategoryCard hospitalData={props.pharmacies} />
                            </Layout>
                        </TabPane>
                        <TabPane style={{ height: '500px' }} tab="" key="5">
                            <Layout>
                                <div className="writer">
                                    <Writer />
                                </div>
                            </Layout>
                        </TabPane>
                    </Tabs>
                )}
            </Card>
        </div>
    );
};

export default connector(Tab);
