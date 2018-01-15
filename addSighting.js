import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Text,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import t from 'tcomb-form-native';
import Moment from 'moment';
import getData from './getData';

const Form = t.form.Form;

const Species = t.enums({
    'mallard': 'mallard',
    'redhead': 'redhead',
    'gadwall': 'gadwall',
    'canvasback': 'canvasback',
    'lesser scaup': 'lesser scaup'
});

var greaterThanZero = t.refinement(t.Number, function (n) {
    return n > 0;
});

const Sighting = t.struct({
    specie: Species,
    description: t.String,
    //    dateSeen: t.Date,
    count: greaterThanZero
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10,
            borderColor: 'red',
        },
    },
    controlLabel: {
        normal: {
            color: 'black',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

const options = {
    fields: {
        specie: {
            error: 'Choose duck species',
            nullOption: { value: '', text: 'Choose duck specie' },
            template: require('./template/select')
        },
        description: {
            error: 'Please enter description',
            template: require('./template/textbox')
        },
        // dateSeen: {
        //     mode: 'date',
        //     template: require('./template/datepicker'),
        //     maximumDate: new Date(),
        //     blurOnSubmit: true,
        //     config: {
        //         format: date => {
        //             const formatedDate = Moment(date).format('DD.MM.YYYY');
        //             return formatedDate;
        //         },
        //         dialogMode: 'spinner',
        //     },
        // },
        count: {
            error: 'How many ducks were there?',
            template: require('./template/textbox')
        },
    },
    auto: 'placeholders',
};


export default class AddSighting extends Component {

    json = {};

    state = {
        posted: false,
        response: []
    }

    handleSubmit = () => {
        this.json = [];
        const value = this._form.getValue();
        if (value) {
            this.json = {
                id: '',
                species: value.specie,
                description: value.description,
                dateTime: new Date(),
                count: value.count
            };
            this.postNewSighting(this.json);
        }
    }

    clearForm() {
        this.setState({ value: null, posted: true });
    }

    postNewSighting = async (data) => {
        const res = await getData.postSighting(data);
        this.clearForm();
        setTimeout(() => this.setResponse(JSON.parse(res._bodyText)), 100);
    }

    setResponse(res) {
        res.species = res.species.capitalize();
        this.setState({
            response: res,
        });
    }

    goBack() {
        this.setState({ posted: false });
    }

    render() {

        String.prototype.capitalize = function () {
            return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
        };

        if (!this.state.posted) {
            return (
                <View style={styles.form}>
                    <Form
                        ref={c => this._form = c}
                        type={Sighting}
                        options={options}
                    />
                    <Button
                        title="Save"
                        color="orange"
                        onPress={this.handleSubmit}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    {
                        this.state.response !== []
                            ? (<View style={styles.responseView}>
                                <Text style={styles.postedTitle}>Posted Succesfully!</Text>

                                <Text style={styles.title}>Species:</Text>
                                <Text style={styles.info}> {this.state.response.species} </Text>
                                <Text style={styles.title}>Description:</Text>
                                <Text style={styles.info}> {this.state.response.description} </Text>
                                <Text style={styles.title}>Date and time:</Text>
                                <Text style={styles.info}> {Moment(this.state.response.dateTime).format('MMM Do YYYY, HH:mm')} </Text>
                                <Text style={styles.title}>Count:</Text>
                                <Text style={styles.info}> {this.state.response.count} </Text>
                                <TouchableHighlight onPress={() => this.goBack()}>
                                    <Text style={styles.goBack}>Go back</Text>
                                </TouchableHighlight>
                            </View>)
                            : (<ActivityIndicator style={styles.loading} size="large" color="orange" />)
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    field: {
        borderColor: 'black',
        borderWidth: 1,
    },
    loading: {
        marginTop: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    responseView: {
        margin: 30,
        alignItems: 'center',
    },
    postedTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
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
    goBack: {
        marginTop: 30,
        color: 'orange',
        fontWeight: 'bold',
        margin: 4,
        padding: 10,
        fontSize: 20,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#eee',
    },
});
