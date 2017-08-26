// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native'

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };

    setInterval(() => {
      this.setState(old => {
        return { show: !old.show };
      })
    }, 1000);
  }

  render() {
    return (
      <Text style={this.state.show ? styles.blue : styles.red}>
        "Hello"
      </Text>
    )
  }
}

export class ExampleView extends Component {
  render() {
    return (
      <View>
        <Line text="Hello World!"></Line>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  red: {
    color: "#ff0000"
  },
  blue: {
    color: '#0000FF'
  }
})