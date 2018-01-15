import * as React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Species from './species/species';
import Sightings from './ducks/sightings';
import AddSighting from './ducks/addSighting';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const FirstRoute = () =>
    <View style={styles.container}>
        <Text style={styles.titleText}>Species</Text>
        <Species />
    </View>;
const SecondRoute = () =>
    <View style={styles.container}>
        <StatusBar
            backgroundColor="#EE7600"
            barStyle="light-content"
        />
        <Text style={styles.titleText}>Duck sightings</Text>
        <Sightings reloadData={"rld"} />
    </View>;
const ThirdRoute = () =>
    <View style={styles.container}>
        <Text style={styles.titleText}>Add Sighting</Text>
        <AddSighting />
    </View>;

export default class TabView extends React.Component {
    state = {
        index: 1,
        reload: 0,
        routes: [
            { key: 'first', title: 'Species' },
            { key: 'second', title: 'Sightings' },
            { key: 'third', title: 'Add Sighting' },
        ]
    };

    _handleIndexChange = index => {
        this.setState({ index, reload: this.state.reload++ })
    };

    _renderHeader = props => <TabBar {...props} />;

    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        elevation: 7,
    },
    titleText: {
        width: Dimensions.get('window').width,
        height: 40,
        backgroundColor: 'orange',
        paddingTop: 5,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    }
});