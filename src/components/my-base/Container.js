import React, { Component } from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Spinner} from "native-base";
import {res} from "~/helpers";

export default class Container extends Component {

  render() {
    const { noPadding, style, loading, scrolViewRef} = this.props;

    const containerStyle = [{paddingHorizontal: noPadding ? 0 : res(15)}, s.container];

    return (
      <SafeAreaView {...this.props} style={[{flex: 1}, style]} >

        {
          loading
            ? <Spinner style={s.spinner}/>
            : (

            this.props.scroll ?
              <ScrollView
                style={containerStyle}
                ref={ scrolViewRef ? (ref) => { scrolViewRef(ref) } : null }
                refreshControl={this.props.refreshControl}
                scrollEnabled={!!this.props.scroll}>
                { this.props.children }
              </ScrollView>

              : this.props.children
            )
        }
      </SafeAreaView>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    height: res(50)
  },
  spinner: {
    flex: 1
  }
});