import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type Address = {
  logradouro: string,
  uf: string,
  bairro: string,
  localidade: string,
  regiao: string,
}

export function CepView() {
  const [cep, setCep] = useState('');

  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState('');

  const fetchAddress = async () => {
    setError('');
    setAddress(null);

    if (cep.length !== 8) {
      setError('CEP inválido. O CEP deve conter 8 dígitos.');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        setError('CEP não encontrado.');
      } else {
        setAddress(response.data);
      }
    } catch (error) {
      setError('Erro ao buscar CEP. Verifique sua conexão.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o seu CEP, ex: 01001000"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
      />

      <Button title="Buscar cep" color={'#16a34a'} onPress={fetchAddress} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {address && (
        <View style={styles.result}>
          <Text>Cidade: {address.localidade} - {address.uf}</Text>
          <Text>Região do Brasil: {address.regiao}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Logradouro: {address.logradouro}</Text>
        </View>
      )}

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '80%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  result: {
    marginTop: 20,
  },
});