import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, set, onValue } from "firebase/database"
import { db } from "../config/Config";

export default function UserScreen () {
  const [cedula, setcedula] = useState("")
  const [nombre, setnombre] = useState("")
  const [correo, setcorreo] = useState("")
  const [comentario, setcomentario] = useState("")

  const [usuarios, setusuarios] = useState([])

  //Guardar informacion
  function guardarUsuario(cedula: any, nombre: string, correo: string, comentario: any) {
    
    set(ref(db, 'usuarios/' + cedula), {
      username: nombre,
      email: correo,
      comentario: comentario
    });
    Alert.alert("Mensaje", "Informacion guardada")

    setcedula("")
    setnombre("")
    setcorreo("")
    setcomentario("")
  }

  //Leer datos
  useEffect(() => {
    const starCountRef = ref(db, 'usuarios/' );
  onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);

  const dataTemp: any = Object.keys(data).map ( (key) => ({
    key, ...data[key]
  }))

  console.log(dataTemp);
  setusuarios(dataTemp)
  
});
  }, [])
  
  type Usuario ={
    username: string,
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: '900', paddingBottom: 5 }}>USUARIOS</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingresar cédula:'
        onChangeText={(texto) => setcedula(texto)}
        value={cedula}
        keyboardType='numeric' />
      <TextInput
        style={styles.input}
        placeholder='Ingresar nombre:'
        onChangeText={(texto) => setnombre(texto)}
        value={nombre}
        />
      <TextInput
        style={styles.input}
        placeholder='Ingresar correo:'
        onChangeText={(texto) => setcorreo(texto)}
        value={correo}
        keyboardType='email-address' 
        />
      <TextInput
        style={styles.input}
        placeholder='Ingresar comentario: '
        onChangeText={(texto) => setcomentario(texto)} 
        value={comentario}
        />
      <Button title='Guardar' onPress={() => guardarUsuario(cedula, nombre, correo, comentario)} />
    
      <FlatList 
        data={usuarios}
        renderItem={({item}: {item: Usuario}) => 
        <View>
          <Text>{item.username}</Text>
        </View>}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeed9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    padding: 10,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 25,
    width: '50%',
    textAlign: 'center',
    borderBottomWidth: 5,
    backgroundColor: '#d1d1d1',
  }
})