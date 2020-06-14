import React, { Fragment } from 'react';
import Cards from '../../Components/HosptCards';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from '../../Components/ui/spinner';
import { StateInter } from '../../interfaces/Global';
import { connect, ConnectedProps } from 'react-redux';
import { getCategoryId } from '../../util/getCategoryId';

const MapStateToProps = (state: StateInter) => ({
    user: state.user.userData,
    radius: state.map.radius,
    category: state.map.category,
    coords: state.map.userCoords,
});

const MapDispatchToProp = (dispatch: Function) => ({});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const CardData = (props: Props) => {
    const { id } = props.user;

    const { radius, category, coords } = props;
    const catId = getCategoryId(category);

    const SEARCH_RESULT = gql`
        {
            FetchMapData(
                lat: "${coords.lat}"
                lng: "${coords.lat}"
                radius: "${radius}"
                categoryId: "${catId}"
            ) {
                distance
                name
                coords {
                    lat
                    lng
                }
                formattedAddress
            }
        }
    `;

    const { loading, error, data } = useQuery(SEARCH_RESULT);
    console.log(data);
    if (loading) return <Spinner />;
    if (error) return <b>Noting to display </b>;

    return (
        <Fragment>
            <Cards hospitalData={data.FetchMapData} />
        </Fragment>
    );
};

export default connector(CardData);
