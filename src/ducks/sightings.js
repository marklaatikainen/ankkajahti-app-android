import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import SightingList from './sightingList'
import getData from '../getData';

export default class Sightings extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        this.fetchData();
    }

    reloadData() {
        console.log("reloading data..");
        this.fetchData();
    }

    fetchData = async () => {
        const sightings = await getData.fetchSigtings();
        this.setState({
            data: sightings,
        });
    }

    render() {
        return (
            <View reloadData={this.reloadData} style={styles.container}>
                {
                    this.state.data.length > 0
                        ? (<SightingList sightings={this.state.data} />)
                        : (<ActivityIndicator style={styles.loading} size="large" color="orange" />)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        marginTop: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
})