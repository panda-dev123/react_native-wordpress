import * as React from 'react';
import unescape from 'lodash/unescape';

import {StyleSheet, View} from 'react-native';
import {Text, Image, ThemeConsumer} from 'src/components';
import {Row, Col} from 'src/containers/Gird';
import Quantity from 'src/containers/Quantity';

import {grey4} from 'src/components/config/colors';
import {lineHeights, sizes} from 'src/components/config/fonts';
import {margin, padding} from 'src/components/config/spacing';

import currencyFormatter from 'src/utils/currency-formatter';

function CartItem(props) {
  const {item, currency, updateQuantity, goToProduct, style} = props;
  if (!item) {
    return null;
  }
  const {
    key,
    product_id,
    thumb,
    name,
    quantity,
    line_subtotal,
  } = item;

  return (
    <ThemeConsumer>
      {({theme}) => (
        <Row
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.bgColor,
              borderColor: theme.colors.border,
            },
            style && style,
          ]}>
          <Image
            source={thumb ? {uri: thumb} : require('src/assets/images/pDefault.png')}
            style={styles.image}
          />
          <Col style={styles.content}>
            <View>
              <Text
                medium
                onPress={() => goToProduct(product_id)}
                style={styles.title}>
                {unescape(name)}
              </Text>
              <Row style={styles.viewAttribute}>
                {/*{meta_data.map((data, index) =>*/}
                {/*  this.renderVariation(data, index),*/}
                {/*)}*/}
              </Row>
            </View>
            <Quantity value={quantity} onChange={(value) => updateQuantity(key, value)}/>
          </Col>
          <Text medium>{currencyFormatter(line_subtotal / quantity, currency)}</Text>
        </Row>
      )}
    </ThemeConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginRight: 0,
    padding: padding.large,
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 107,
  },
  content: {
    paddingLeft: padding.big,
    paddingRight: padding.big,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: margin.small - 1,
  },
  viewAttribute: {
    marginBottom: margin.small,
    marginLeft: 0,
    marginRight: 0,
    flexWrap: 'wrap',
  },
  textAttribute: {
    fontSize: sizes.h6 - 2,
    lineHeight: lineHeights.h6 - 2,
    color: grey4,
    marginRight: margin.small,
  },
});

export default CartItem;
