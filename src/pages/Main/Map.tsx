import React, { Fragment, useEffect } from 'react';
import Map from '../../Components/Map';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from '../../Components/ui/spinner';
import { StateInter } from '../../interfaces/Global';
import { connect, ConnectedProps } from 'react-redux';
import { setMessage } from '../../redux/actions/map.acton';
import { getCategoryId } from '../../util/getCategoryId';

const MapStateToProps = (state: StateInter) => ({
    user: state.user.userData,
    radius: state.map.radius,
    category: state.map.category,
    coords: state.map.userCoords,
});

const MapDispatchToProp = (dispatch: Function) => ({
    setError: (e: string) => dispatch(setMessage(e)),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const CardData = (props: Props) => {
    const { id } = props.user;
    const { setError, radius, category, coords } = props;
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

    useEffect(() => {
        console.log(radius, category, coords);
        if (coords.lat === 0 && coords.lng === 0) {
            setError(
                'Unable to access your current location, pls try to refresh this page and allow location access '
            );
        }
        if (error) {
            setError(
                'Unable to Fetch Data, Pls check your internet connection and try again '
            );
        }
        if (data && data.FetchMapData.length === 0) {
            setError(
                `No ${category} found within specified KM, select higer KM range to search for more `
            );
        }
        if (data && data.FetchMapData.length > 0) {
            if (data && data.FetchMapData[0].name === null)
                setError(
                    'Unable to Fetch Data, Pls check your internet connection and try again '
                );
        }
    }, [data, error]);
    if (loading) return <Spinner />;
    if (error) return <b>Noting to display </b>;
    if (data && data.FetchMapData.length > 0) {
        if (data && data.FetchMapData[0].name === null)
            return <b>Error occured</b>;
    }
    if (data && data.FetchMapData.length === 0) return <b>Error occured</b>;

    return (
        <Fragment>
            <Map hospitalData={data.FetchMapData} />
        </Fragment>
    );
};

export default connector(CardData);
