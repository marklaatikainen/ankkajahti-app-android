import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { PropTypes } from 'prop-types';
import SightingItem from './SightingItem';
import FilterComponent from './filterComponent';
import _ from 'lodash';

export default class SightingList extends Component {

    state = {
        sort: 'desc',
        data: this.props.sightings,
        filtered: [],
        activeFilter: '',
    }

    static propTypes = {
        sightings: PropTypes.array.isRequired,
    };

    filterData = (filterTerm) => {
        let filtered = [];
        let data = this.state.data;
        if (filterTerm) {
            filterTerm = filterTerm.toLowerCase();
            filtered = data.filter(p => p.species.includes(filterTerm));
        }
        this.setState({ filtered, activeFilter: filterTerm });
    };

    reverseList = (value) => {
        if (this.state.filtered.length > 0) {
            reversed = this.state.filtered.reverse();
            this.setState({ sort: value, filtered: reversed });
        } else {
            reversed = this.state.data.reverse();
            this.setState({ sort: value, data: reversed });
        }
    };

    render() {

        const sightingsToDisplay =
            this.state.filtered.length > 0
                ? this.state.filtered
                : this.state.data;

        if (sightingsToDisplay.length > 0) {
            return (
                <View style={styles.list}>
                    <FilterComponent
                        filterData={this.filterData}
                        initialFilterTerm={this.state.activeSearchTerm}
                        onReverse={this.reverseList}
                    />
                    <FlatList
                        data={sightingsToDisplay}
                        extraData={this.state}
                        keyExtractor={(x, i) => i}
                        renderItem={({ item }) => <SightingItem sighting={item} />}
                    />
                    <View style={styles.footer}></View>
                </View>
            );
        } else {
            return (
                <ActivityIndicator style={styles.loading} size="large" color="orange" />
            );
        }
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
        flex: 1,
        width: '100%',
    },
    footer: {
        height: 20,
    },
    loading: {
        marginTop: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
});