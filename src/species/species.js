import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import SpeciesList from './speciesList';
import getData from '../getData';

export default class Species extends Component {
    state = {
        species: [],
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const species = await getData.fetchSpecies();
        this.setState({
            species: species,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.species.length > 0
                        ? (<SpeciesList species={this.state.species} />)
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