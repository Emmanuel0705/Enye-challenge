import React from 'react';
import { Form, Select } from 'antd';
import { changeRadius } from '../../redux/actions/map.acton';
import { connect, ConnectedProps } from 'react-redux';
const MapStateToProps = (state: any) => ({});

const MapDispatchToProp = (dispatch: Function) => ({
    changeRad: (data: number) => dispatch(changeRadius(data)),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SelectKM = (props: Props) => {
    const { changeRad } = props;
    return (
        <div className="select-km">
            <Form.Item>
                <Select
                    onChange={(val: number) => changeRad(val)}
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
    );
};

export default connector(SelectKM);
