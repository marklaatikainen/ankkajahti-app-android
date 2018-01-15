var React = require("react");
var { View, Text, Picker, StyleSheet } = require("react-native");


function select(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var selectStyle = Object.assign(
    {},
    stylesheet.select.normal,
    stylesheet.pickerContainer.normal
  );
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  var options = locals.options.map(({ value, text }) => (
    <Picker.Item key={value} value={value} label={text} />
  ));

  return (
    <View style={styles.formGroup}>
      {label}
      <Picker
        accessibilityLabel={locals.label}
        ref="input"
        style={selectStyle}
        selectedValue={locals.value}
        onValueChange={locals.onChange}
        help={locals.help}
        enabled={locals.enabled}
        mode={locals.mode}
        prompt={locals.prompt}
        itemStyle={styles.itemStyle}
      >
        {options}
      </Picker>
      {help}
      {error}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginTop: 5,
    paddingTop: 10,
    borderBottomColor: 'orange',
    borderBottomWidth: 2,
    height: 35,
    justifyContent: 'center',
    marginBottom: 14,
  },
  itemStyle: {
    fontSize: 10,
  },
});

module.exports = select;
