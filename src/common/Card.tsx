import React, { ReactElement } from 'react'
import { Image, View, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native'
import { Text } from './Text'
import { IProduct } from '../../App'
import { Feather as FeatherIcon } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')
const CARD_CONTAINER_HEIGHT = height / 1.25
const CARD_CONTAINER_WIDTH = width
const CARD_WIDTH = CARD_CONTAINER_WIDTH - 80
const CARD_HEIGHT = CARD_CONTAINER_HEIGHT - 80
const CARD_HEADER_HEIGHT = 60
const CARD_FOOTER_HEIGHT = 100
const CARD_CONTENT_HEIGHT = CARD_HEIGHT - CARD_FOOTER_HEIGHT - CARD_HEADER_HEIGHT

type CardProps = {
  product: IProduct
  scale: Animated.AnimatedInterpolation
  // translateX: Animated.AnimatedInterpolation
}

export const Card = ({
  product: { title, category, recommended, foregroundColor, backgroundColor },
  scale,
}: // translateX,
CardProps): ReactElement => {
  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      <View style={[styles.card, { backgroundColor: foregroundColor }]}>
        <View style={styles.cardHeader}>
          <View style={styles.rightHeaderWrapper}>
            <Text>{''}</Text>
          </View>
          <View style={styles.contentHeaderWrapper}>
            <Text style={styles.menuTitle}>{recommended ? 'RECOMMENED' : ' '}</Text>
          </View>
          <View style={styles.rightHeaderWrapper}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <FeatherIcon name="edit" size={20} color="rgba(67, 42, 10, 1)" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
          <Animated.Image
            resizeMode="contain"
            source={require('../../assets/coffee-1.png')}
            style={[styles.image, { transform: [{ scale }] }]}
          />
        </View>

        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnLabel}>{recommended ? "I'LL TRY IT" : 'RE-ORDER'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_CONTAINER_WIDTH,
    height: CARD_CONTAINER_HEIGHT,
    alignItems: 'center',
    padding: 40,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 25,
  },

  cardHeader: {
    width: '100%',
    height: CARD_HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  leftHeaderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentHeaderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  rightHeaderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    width: CARD_WIDTH,
    height: CARD_CONTENT_HEIGHT,
    alignItems: 'center',
  },

  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 5,
  },

  category: {
    fontSize: 15,
    marginVertical: 5,
  },

  cardFooter: {
    width: '100%',
    height: CARD_FOOTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    width: 200,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(67, 42, 10, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  image: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    zIndex: 10,
    top: CARD_CONTENT_HEIGHT / 2.75,
  },
})
