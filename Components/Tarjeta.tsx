import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Tarjeta = ( props : any ) => {
   
   console.log(props.usuario.email);
    
  return (
    <View style={styles.container}>
      <Text>{props.usuario.username}</Text>
      <Text>{props.usuario.correo}</Text>
      <Text>{props.usuario.comentario}</Text>
    </View>
  )
}

export default Tarjeta

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#73955c',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 7,
        borderWidth: 2, 
        borderRadius: 10,
    }
})