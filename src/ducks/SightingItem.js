import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class SightingItem extends React.Component {

    static propTypes = {
        sighting: PropTypes.object.isRequired,
    };

    render() {
        const { sighting } = this.props;

        String.prototype.capitalize = function () {
            return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
        };

        return (
            <View style={styles.sighting}>
                <View style={styles.info}>
                    <Text style={styles.species}>{sighting.species.capitalize()}</Text>
                    <Icon style={styles.icon} name="binoculars" size={14} color="black" />
                    <View style={styles.footer}>
                        <Text style={styles.description}>{sighting.description}</Text>
                        <Text style={styles.count}>{sighting.count}</Text>
                        <Text style={styles.date}>{Moment(sighting.dateTime).format('MMM Do YYYY, HH:mm')}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sighting: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    info: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 3,
        borderColor: '#bbb',
        borderWidth: 1,
    },
    species: {
        width: '90%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        width: '80%',
    },
    count: {
        width: '18%',
        height: 20,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    icon: {
        width: '8%',
        alignContent: 'flex-end',
        textAlign: 'right',
    },
    date: {
        flexGrow: 2,
        color: 'green',
    },
    footer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
});