import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    Animated,
    Easing,
    PanResponder,
    Dimensions
} from 'react-native';
import DuckDetail from './duckDetail';
import getData from '../getData'

export default class DuckDetailPage extends React.Component {
    animation = new Animated.Value(610);

    handleSwipe = () => {
        Animated.timing(this.animation, {
            toValue: 610,
            duration: 250,
        }).start(() => this.props.goBack());
    }

    componentWillMount() {
        this.fetchData();
        this.toggle();
    }

    state = {
        duckDetails: []
    }

    fetchData = () => {
        this.setState({ duckDetails: this.props.duck });
    }

    screenPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            console.log(gs.dy)
            if (gs < this.animation) {
                this.animation.setValue(gs.dy);
                return true;
            }
        },
        onPanResponderEnd: (evt, gs) => {
            return true;
        },
        onPanResponderRelease: (evt, gs) => {
            const height = Dimensions.get('window').height;
            if (gs.dy > height * 0.4) {
                this.handleSwipe();
            } else {
                Animated.timing(this.animation, {
                    toValue: 0,
                    duration: 250,
                }).start();
            }
        },
    });

    toggle() {
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

    render() {

        return (
            <Animated.View
                {...this.screenPanResponder.panHandlers}
                style={[styles.container, { marginTop: this.animation }]}>
                {
                    this.state.duckDetails !== []
                        ? (<DuckDetail onSwipe={this.handleSwipe} allDetails={this.state.duckDetails} />)
                        : (<ActivityIndicator style={styles.loading} size="large" color="orange" />)
                }
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
    },
    loading: {
        marginTop: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
});