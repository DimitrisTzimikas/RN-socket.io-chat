import React, { Component } from 'react';
import {
  YellowBox,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import io from 'socket.io-client';
import { container, button, scrollView, text, input } from './styles';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  'Each child in a list should',
]);

/* ==============================
 Global variables
 ================================ */
window.navigator.userAgent = 'react-native';
const url = 'https://3eed2986.ngrok.io';

/* ==============================
 Class
 ================================ */
class App extends Component {
  state = {
    textList: [{ text: '' }],
    input: '',
  };

  constructor() {
    super();

    this.socket = io(url, { json: false });
    this.socket.on('chat message', this.onReceiveMessage);
  }

  onReceiveMessage = data =>
    this.setState({
      textList: [...this.state.textList, { text: data }],
    });

  onTextInput = input => this.setState({ input });

  onButtonPress = () => {
    if (this.state.input !== '') {
      this.socket.emit('chat message', this.state.input);
      this.setState({ input: '' });
      Keyboard.dismiss();
    }
  };

  showMessage = message => <Text style={text.style}>{message.text}</Text>;

  render() {
    return (
      <View style={container.style}>
        <ScrollView style={scrollView.style}>
          {this.state.textList.map(this.showMessage)}
        </ScrollView>

        <TextInput
          style={input.style}
          onChangeText={this.onTextInput}
          value={this.state.input}
          onSubmitEditing={this.onButtonPress}
        />

        <TouchableOpacity
          style={button.container}
          onPress={this.onButtonPress}
          disabled={this.state.input === ''}
        >
          <Text style={button.text}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/* ==============================
 Export
 ================================ */
export default App;
