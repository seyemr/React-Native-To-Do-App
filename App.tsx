import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5');
  const [itemColors, setItemColors] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Düzenlenen öğeyi takip eder
  const [editText, setEditText] = useState('');

  const handleSave = () => {
    if (text.trim()) {
      setData([...data, text.trim()]);
      setItemColors([...itemColors, '#fff']); // Yeni öğe için varsayılan renk
      setText('');
    } else {
      Alert.alert('Hata', 'Lütfen bir şey girin!');
    }
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    const newColors = itemColors.filter((_, i) => i !== index);
    setData(newData);
    setItemColors(newColors);
  };

  const changeBackgroundColor = () => {
    const colors = [
      '#f5f5f5',
      '#d1c4e9',
      '#b3e5fc',
      '#ffccbc',
      '#c8e6c9',
      '#90caf9',
      '#4527a0',
      '#ffeb3b',
      '#9e9e9e',
      '#673ab7',
      '#ff9800',
      '#009688',
      '#e7c43b',
      '#4d1c0d',
      '#003659',
      '#ff96f5',
      '#81c784',
      '#4caf50',
      '#33691e',
      'yellow',
      'orange',
      'purple',
      'green',
      'brown',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  };

  const changeItemColor = (index: number) => {
    const colors = [
      '#f5f5f5',
      '#d1c4e9',
      '#b3e5fc',
      '#ffccbc',
      '#c8e6c9',
      '#90caf9',
      '#4527a0',
      '#ffeb3b',
      '#9e9e9e',
      '#673ab7',
      '#ff9800',
      '#009688',
      '#e7c43b',
      '#4d1c0d',
      '#003659',
      '#ff96f5',
      '#81c784',
      '#4caf50',
      '#33691e',
      'yellow',
      'orange',
      'purple',
      'green',
      'brown',
      'blue',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newColors = [...itemColors];
    newColors[index] = randomColor;
    setItemColors(newColors);
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(data[index]);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      const newData = [...data];
      newData[editIndex!] = editText.trim();
      setData(newData);
      setEditIndex(null); // Düzenleme modundan çık
      setEditText('');
    } else {
      Alert.alert('Hata', 'Lütfen bir şey girin!');
    }
  };

  return (
    <SafeAreaView style={[styles.sectionContainer, {backgroundColor}]}>
      <View style={styles.title}>
        <Text style={styles.text_title}>To-Do Application</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          placeholder="Bir şey ekle"
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSave} style={styles.addButton}>
          <Text style={styles.addText}>Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeBackgroundColor} style={styles.colorButton}>
          <Text style={styles.colorText}>Renk</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={[styles.listItem, {backgroundColor: itemColors[index]}]}>
            {editIndex === index ? (
              <TextInput
                style={styles.textInput}
                value={editText}
                onChangeText={setEditText}
                onSubmitEditing={saveEdit} // Klavyede "Done" basıldığında kaydet
              />
            ) : (
              <Text style={styles.listText}>{item}</Text>
            )}
            {editIndex === index ? (
              <TouchableOpacity onPress={saveEdit} style={styles.editButton}>
                <Text style={styles.editText}>Kaydet</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => startEdit(index)} style={styles.editButton}>
                <Text style={styles.editText}>Düzenle</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Sil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeItemColor(index)} style={styles.colorsButton}>
              <Text style={styles.editText}>Renk</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text_title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  textInputContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  colorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',

  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  colorsButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  editText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
