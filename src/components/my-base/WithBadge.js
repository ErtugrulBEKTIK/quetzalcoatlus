import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, Badge} from "native-base";
import {res} from "~/helpers";

export default class WithBadge extends Component {
  render() {
    const { badgeProps, style, children, value } = this.props;
    return (
      <View {...this.props} style={[s.badgeContainer, style]} >
        { children }

        {
          !!value && <Badge {...badgeProps} style={s.badge}>
                      <Text numberOfLines={1} style={s.badgeText}>{value}</Text>
                    </Badge>
        }

      </View>
    );
  }
}


const s = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -res(9),
    top: 0,
    borderRadius: res(9),
    height: res(18),
    width: res(18),

  },
  badgeContainer: {

  },
  badgeText: {
    position:'absolute',
    fontSize: res(9),
    paddingHorizontal: 0,
    width: res(18),
  }
});
