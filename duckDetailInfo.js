import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
} from 'react-native';

export default class DuckDetailInfo extends React.Component {

    render() {

        String.prototype.capitalize = function () {
            return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
        };

        return (
            <ScrollView style={styles.view}>
                <Text style={styles.name}> {this.props.data.name.capitalize()} </Text>
                <Text style={styles.title}>Size and Shape:</Text>
                <Text style={styles.info}> {this.props.data.sizeShape} </Text>
                <Text style={styles.title}>Color pattern:</Text>
                <Text style={styles.info}> {this.props.data.colorPattern} </Text>
                <Text style={styles.title}>Behavior:</Text>
                <Text style={styles.info}> {this.props.data.behavior} </Text>
                <Text style={styles.title}>Habitat:</Text>
                <Text style={styles.info}> {this.props.data.habitat} </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        margin: 5,
        marginTop: 1,
    },
    name: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        margin: 4,
        fontSize: 14,
    },
    info: {
        fontSize: 12,
        margin: 4,
    },
    loading: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

