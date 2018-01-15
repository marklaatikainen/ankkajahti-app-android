import React from 'react';
import { View, StyleSheet, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';

class SpecieItem extends React.Component {

    static propTypes = {
        specie: PropTypes.object.isRequired,
    };

    render() {
        const { specie } = this.props;

        String.prototype.capitalize = function () {
            return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
        };

        return (
            <View style={styles.card}>
                <TouchableOpacity style={styles.sighting} onPress={() => this.props.getDuck(specie.name.capitalize(), this.props.duckIndex)}>
                    <Image source={{ uri: specie.image }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={styles.species}>{specie.name.capitalize()}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 12,
        marginTop: 20,
    },
    info: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 3,
        borderColor: '#bbb',
        borderWidth: 1,
    },
    species: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 220,
        backgroundColor: '#ccc',
    },
});

export default SpecieItem;