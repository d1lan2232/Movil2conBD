import { Alert, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, set, onValue, update, remove } from "firebase/database"
import { db } from "../config/Config";
import Tarjeta from '../Components/Tarjeta';

export default function UserScreen () {
  const [cedula, setcedula] = useState("")
  const [nombre, setnombre] = useState("")
  const [correo, setcorreo] = useState("")
  const [comentario, setcomentario] = useState("")

  const [usuarios, setusuarios] = useState([])

  //---------------Guardar informacion---------------
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
//-----------------------------------------------------

  //-----------------Leer datos--------------
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
//-------------------------------------------

//---------------------Editar----------------
  function editar(id: string){
  update(ref(db, 'usuarios/' + id), {
    username: nombre,
    email: correo,
    comentario: comentario
  });
    setcedula("")
    setnombre("")
    setcorreo("")
    setcomentario("")
  }
//------------------------------------------------
//-------------------Eliminar---------------------
  function eliminar(id: string){
    remove(ref(db, 'usuarios/' + id));
    Alert.alert("Mensaje", "Informacion eliminada")
  }

  type Usuario ={
    username: string,
    key: string,
    email: string,
    comentario: string
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
        //<Tarjeta usuario = {item}/>
        <View style={styles.container2}>
          <Text>{item.key}</Text>
          <Text>{item.username}</Text>
          <Text>{item.comentario}</Text>
          <Text>{item.email}</Text>
          <View style={styles.botones}>
            <View style={{paddingRight: 15}}>
          <Button title='Editar' color={'green'} onPress={() => editar(item.key)}/>
            </View>
          <Button title='Eliminar' color={'red'} onPress={() => eliminar(item.key)}/>
          </View>
        </View>
        }
        />
        <StatusBar backgroundColor={'#0f2417'}/> 

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
  },
  container2:{
    padding: 5,
    
  },
  botones:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15
  }
})