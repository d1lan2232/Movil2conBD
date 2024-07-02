import { Alert, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, set, onValue, update, remove } from "firebase/database"
import { db } from "../config/Config";
import Tarjeta from '../Components/Tarjeta';

export default function UserScreen() {
  const [cedula, setcedula] = useState("")
  const [nombre, setnombre] = useState("")
  const [correo, setcorreo] = useState("")
  const [comentario, setcomentario] = useState("")
  const [usuarios, setusuarios] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false) 

  // Guardar usuario o editar 
  function guardarUsuario() {
    if (modoEdicion) {
      editar();
    } else {
      set(ref(db, 'usuarios/' + cedula), {
        username: nombre,
        email: correo,
        comentario: comentario
      });
      Alert.alert("Mensaje", "Información guardada");
      setcedula("");
      setnombre("");
      setcorreo("");
      setcomentario("");
    }
  }

  // Leer datos al cargar el componente
  useEffect(() => {
    const starCountRef = ref(db, 'usuarios/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataTemp: any = Object.keys(data).map((key) => ({
          key,
          ...data[key]
        }));
        setusuarios(dataTemp);
      } else {
        setusuarios([]);
      }
    });
  }, []);

  // Editar usuario
  function editar() {
    update(ref(db, 'usuarios/' + cedula), {
      username: nombre,
      email: correo,
      comentario: comentario
    });
    Alert.alert("Mensaje", "Información actualizada");
    setModoEdicion(false); 
    setcedula("");
    setnombre("");
    setcorreo("");
    setcomentario("");
  }

  // Preparar campos para editar
  function editarUsuario(item : any) {
    setModoEdicion(true); // Activar modo de edición
    setcedula(item.key);
    setnombre(item.username);
    setcorreo(item.email);
    setcomentario(item.comentario);
  }

  // Eliminar usuario
  function eliminar(id : any) {
    remove(ref(db, 'usuarios/' + id));
    Alert.alert("Mensaje", "Información eliminada");
  }

  type Usuario = {
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
      <Button title={modoEdicion ? 'Editar' : 'Guardar'} onPress={guardarUsuario} />
      <FlatList
        data={usuarios}
        renderItem={({ item }: { item: Usuario }) =>
          <View style={styles.container2}>
            <Tarjeta usuario={item} />
            <View style={styles.botones}>
              <View style={{ paddingRight: 15 }}>
                <Button title='Editar' color={'green'} onPress={() => editarUsuario(item)} />
              </View>
              <Button title='Eliminar' color={'red'} onPress={() => eliminar(item.key)} />
            </View>
          </View>
        }
      />
      <StatusBar backgroundColor={'#0f2417'} />

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
  container2: {
    padding: 5
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15
  }
});
