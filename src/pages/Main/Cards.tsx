import React, { Fragment, useEffect } from 'react';
import Cards from '../../Components/HosptCards';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from '../../Components/ui/spinner';
import { StateInter } from '../../interfaces/Global';
import { connect, ConnectedProps } from 'react-redux';
import { getCategoryId } from '../../util/getCategoryId';
import { setMessage } from '../../redux/actions/map.acton';

const MapStateToProps = (state: StateInter) => ({
    user: state.user.userData,
    radius: state.map.radius,
    category: state.map.category,
    coords: state.map.userCoords,
});

const MapDispatchToProp = (dispatch: Function) => ({
    setError: (msg: string) => dispatch(setMessage(msg)),
});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const CardData = (props: Props) => {
    const { radius, category, coords, setError } = props;
    const catId = getCategoryId(category);

    const SEARCH_RESULT = gql`
        {
            FetchMapData(
                lat: "${coords.lat}"
                lng: "${coords.lng}"
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
    }, []);

    if (loading) return <Spinner />;
    if (error) return <b>Noting to display </b>;
    if (data && data.FetchMapData.length === 0) return <b>Error Occured </b>;
    if (data && data.FetchMapData.length > 0)
        if (data && data.FetchMapData[0].name === null)
            return <b>Error Occured </b>;

    return (
        <Fragment>
            <Cards hospitalData={data.FetchMapData} />
        </Fragment>
    );
};

export default connector(CardData);
