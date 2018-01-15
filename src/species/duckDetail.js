import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    Text
} from 'react-native';
import DuckDetailInfo from './duckDetailInfo';

export default class DuckDetail extends React.Component {

    render() {
        return (
            <View
                style={styles.container}>
                <TouchableHighlight onPress={this.props.onSwipe}>
                    <Text>Back..</Text>
                </TouchableHighlight>
                <Image source={{ uri: this.props.allDetails.image }} style={styles.image} />
                <DuckDetailInfo data={this.props.allDetails} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    image: {
        width: '100%',
        backgroundColor: '#eee',
        height: 200,
    },
});