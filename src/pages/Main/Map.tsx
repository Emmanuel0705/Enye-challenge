import React, { Fragment, useEffect } from 'react';
import Map from '../../Components/Map';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from '../../Components/ui/spinner';
import { StateInter } from '../../interfaces/Global';
import { connect, ConnectedProps } from 'react-redux';
import { setMessage } from '../../redux/actions/map.acton';
import { getCategoryId } from '../../util/getCategoryId';
import { addLocation } from '../../firebase/firebase.util';
import { dbObj } from '../../interfaces/Global';

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
    const { setError, radius, category, coords, user } = props;
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

        // store user data
        if (data && data.FetchMapData.length > 0) {
            if (data.FetchMapData[0].name !== null)
                addLocation(
                    `${category}s`,
                    user.id,
                    data.FetchMapData.map((data: dbObj) => {
                        return {
                            userId: user.id,
                            formattedAddress: data.formattedAddress,
                            distance: data.distance,
                            name: data.name,
                        };
                    })
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
