import React from 'react';
import { Form, Select } from 'antd';
import { changeCategory } from '../../redux/actions/map.acton';
import { connect, ConnectedProps } from 'react-redux';
const MapStateToProps = (state: any) => ({});

const MapDispatchToProp = (dispatch: Function) => ({
    changeCategory: (data: string) => dispatch(changeCategory(data)),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SelectCategory = (props: Props) => {
    const { changeCategory } = props;
    return (
        <div className="select-cat">
            <Form.Item>
                <Select
                    onChange={(val: string) => changeCategory(val)}
                    placeholder="Search for 'hospials, clinic, pharmacy, medical office' "
                >
                    <Select.Option value="" disabled>
                        Search Type
                    </Select.Option>
                    <Select.Option value={'hospital'}>Hospaital</Select.Option>
                    <Select.Option value={'clinic'}>Clinics</Select.Option>
                    <Select.Option value={'pharmacie'}>
                        Pharmacies
                    </Select.Option>
                    <Select.Option value={'medical'}>
                        Medical Offices
                    </Select.Option>
                </Select>
            </Form.Item>
        </div>
    );
};

export default connector(SelectCategory);
