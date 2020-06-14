import React, { useEffect } from 'react';
import { Tabs, Card } from 'antd';
import { connect, ConnectedProps } from 'react-redux';

import { clearLoader } from '../../redux/actions/map.acton';
// import Writer from '../ui/writer';
import HospitalResult from '../searchResults/hospitals';
import CliniResult from '../searchResults/clinics';
import PharmaciesResult from '../searchResults/pharmacies';
import MedicalResult from '../searchResults/medicals';

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
    return (
        <div className="tab-section">
            <Card>
                <Tabs defaultActiveKey="1" type="card" size="large">
                    <TabPane tab="Hospitals" key="1">
                        <HospitalResult />
                    </TabPane>
                    <TabPane tab="Medical Offices" key="2">
                        <MedicalResult />
                    </TabPane>
                    <TabPane tab="Clinics" key="3">
                        <CliniResult />
                    </TabPane>
                    <TabPane tab="Pharmacies" key="4">
                        <PharmaciesResult />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default connector(Tab);
