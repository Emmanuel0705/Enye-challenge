import React from 'react';
import { Layout } from 'antd';
import CategoryCard from '../../Components/HosptCards';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from '../../Components/ui/spinner';
import { StateInter } from '../../interfaces/Global';
import { connect, ConnectedProps } from 'react-redux';
import Error from './error';

const MapStateToProps = (state: StateInter) => ({
    user: state.user.userData,
});

const MapDispatchToProp = (dispatch: Function) => ({});
const connector = connect(MapStateToProps, MapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SearchResult = (props: Props) => {
    const { id } = props.user;

    const SEARCH_RESULT = gql`
        {
            SearchResult(type: "medicals", userId: "${id}") {
                distance
                userId
                name
                formattedAddress
            }
        }
    `;

    const { loading, error, data } = useQuery(SEARCH_RESULT);

    if (loading) return <Spinner />;
    if (error) return <Error />;

    return (
        <Layout>
            <CategoryCard hospitalData={data.SearchResult} />
        </Layout>
    );
};

export default connector(SearchResult);
