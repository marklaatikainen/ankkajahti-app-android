import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Sightings } from './ducks/sightings';
import debounce from 'lodash.debounce';

class FilterComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        onReverse: PropTypes.func.isRequired,
    };

    state = {
        sort: 'desc',
        filterTerm: this.props.initialFilterTerm,
    }

    toggleDirection = () => {
        this.value = this.state.sort === 'asc' ? 'desc' : 'asc';
        this.setState({ sort: this.value });
        this.props.onReverse(this.value);
    }

    filterSpecies = (filterTerm) => {
        this.props.filterData(filterTerm);
        this.inputElement.blur();
    }

    debouncedFilterSpecies = debounce(this.filterSpecies, 300);
    
    handleChange = (filterTerm) => {
        this.setState({ filterTerm }, () => {
            this.debouncedFilterSpecies(this.state.filterTerm);
        });
    };

    render() {
        return (
            <View style={styles.view}>
                <TextInput
                    ref={(inputElement) => { this.inputElement = inputElement; }}
                    value={this.state.filterTerm}
                    onChangeText={this.handleChange}
                    style={styles.input}
                    placeholder="Filter Species..."
                />
                <TouchableOpacity onPress={this.toggleDirection}>
                    {
                        this.state.sort === 'asc'
                            ? <Icon style={styles.icon} name="arrow-circle-up" size={28} color="black" />
                            : <Icon style={styles.icon} name="arrow-circle-down" size={28} color="black" />
                    }

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
        width: '80%',
    },
    view: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: 4,
    }
});

export default FilterComponent;