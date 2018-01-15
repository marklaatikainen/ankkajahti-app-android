import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Animated,
    Easing,
} from 'react-native';
import { PropTypes } from 'prop-types';
import SpecieItem from './specieItem';
import DuckDetailPage from './duckDetailPage'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class SpeciesList extends Component {
    animation = new Animated.Value(610);

    state = {
        species: this.props.species,
        duckSelected: '',
        duckIndex: ''
    }

    componentDidMount() {
        this.animate();
    }

    componentWillUpdate() {
        this.animate();
    }

    animate() {
        Animated.timing(
            this.animation,
            {
                toValue: 0,
                duration: 400,
                delay: 50,
                easing: Easing.quad
            }
        ).start();
    }

    openDetails = (value, index) => {
        this.setState({ duckSelected: value, duckIndex: index });
    };

    goBack = (props) => {
        this.setState({ duckSelected: '' });
    }

    static propTypes = {
        species: PropTypes.array.isRequired,
    };

    render() {
        return (
            <View style={styles.list}>
                {
                    this.state.duckSelected !== ''
                        ? (<DuckDetailPage duck={this.state.species[this.state.duckIndex]} duckSelected={this.state.duckSelected} goBack={this.goBack} />)
                        : (<AnimatedFlatList
                            style={{ marginTop: this.animation }}
                            data={this.state.species}
                            keyExtractor={(x, i) => i}
                            renderItem={({ item }) =>
                                <SpecieItem getDuck={this.openDetails} duckIndex={this.state.species.indexOf(item)} specie={item} />}
                        />)
                }
                <View style={styles.footer}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
        flex: 1,
        width: '100%',
    },
});