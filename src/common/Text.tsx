import React, { ReactElement, ReactNode } from 'react'
import { Text as DefaultText, TextProps, StyleSheet } from 'react-native'

type CustomTextProps = {
  children: ReactNode
}

export const Text = (props: CustomTextProps & TextProps): ReactElement => {
  return (
    <DefaultText {...props} style={[styles.text, props.style]}>
      {props.children}
    </DefaultText>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'rgba(69, 38, 4, 1)',
  },
})
