import React, { ReactElement, useEffect } from 'react'
import { Animated, StyleSheet, View, Dimensions } from 'react-native'
import { Card } from './src/common/Card'

export type IProduct = {
  id: number
  title: string
  category: string
  backgroundColor: string
  foregroundColor: string
  recommended: boolean
}
const DATA: IProduct[] = [
  {
    id: 1,
    title: 'Cool of with a Mission Cold Brew ',
    category: 'Silky, Caramel, Malt',
    foregroundColor: 'rgba(235, 171, 41, 0.9)',
    backgroundColor: 'rgba(235, 171, 41, 0.5)',
    recommended: true,
  },
  {
    id: 2,
    title: 'Mint Mojito',
    category: 'Order includes: Mint Mojito',
    foregroundColor: 'rgba(137, 213, 169, 0.9)',
    backgroundColor: 'rgba(137, 213, 169, 0.5)',
    recommended: true,
  },
  {
    id: 3,
    title: 'More Cold Brew To Love',
    category: '32oz, bottle now avaliable',
    foregroundColor: 'rgba(235, 171, 41, 0.9)',
    backgroundColor: 'rgba(235, 171, 41, 0.5)',
    recommended: true,
  },
  {
    id: 4,
    title: "Enjoy a Jacob's Wonderbar",
    category: 'Large, No Cream, No Sugar',
    foregroundColor: 'rgba(99, 60, 32, 0.9)',
    backgroundColor: 'rgba(99, 60, 32, 0.5)',
    recommended: false,
  },
  {
    id: 5,
    title: 'Craving a Philharmonic',
    category: 'Large, Medium Cream, Medium Sugar',
    foregroundColor: 'rgba(137, 213, 169, 0.9)',
    backgroundColor: 'rgba(137, 213, 169, 0.5)',
    recommended: false,
  },
]

const SCREEN_WIDTH = Dimensions.get('window').width

export default function App() {
  const scale = new Animated.Value(1)
  const offsetX = new Animated.Value(0)
  const velocityX = new Animated.Value(0)
  let offsetValue = 0

  useEffect(() => {
    offsetX.addListener(({ value }) => {
      console.log('OFFSET X: ', value, ' => ', value % SCREEN_WIDTH)
      offsetValue = value
    })
  }, [])

  const renderItem = ({ item, index }: { item: IProduct; index: number }): ReactElement => {
    const screenArea = Animated.modulo(offsetX, SCREEN_WIDTH)
    const s = screenArea.interpolate({
      inputRange: [0, SCREEN_WIDTH / 2, SCREEN_WIDTH],
      outputRange: [1, 0.7, 1],
      extrapolate: 'clamp',
    })

    // const translateX = Animated.divide(offsetX, 2)

    return <Card key={item.id} product={item} scale={s} />
  }

  const _onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: offsetX,
          },
          velocity: {
            x: velocityX,
          },
        },
      },
    ],
    { useNativeDriver: true }
  )

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        onScroll={_onScroll}
        renderItem={renderItem}
        keyExtractor={(item: IProduct, _index: any) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
