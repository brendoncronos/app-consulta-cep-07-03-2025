# Aplicativo de Busca de CEP

Este é um aplicativo mobile simples desenvolvido em **React Native** com **Expo** que permite buscar informações de um endereço a partir do CEP informado pelo usuário.

![Projeto](./assets/atividade.png)

## 📌 Tecnologias Utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [VIACEP API Web Service](https://viacep.com.br/)

## 📦 Instalação e Execução

### 1️⃣ Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 2️⃣ Clonar o Repositório

```bash
  git clone https://github.com/brendoncronos/app-consulta-cep-07-03-2025
  cd app-consulta-cep-07-03-2025
```

### 3️⃣ Instalar Dependências

```bash
  npm install
```

### 4️⃣ Executar o Projeto

O projeto está configurado para rodar com o modo **tunnel** do Expo no `package.json`. Isso permite acessar o app em qualquer dispositivo sem precisar estar na mesma rede Wi-Fi. Para iniciar o projeto, utilize:

```bash
  expo start --tunnel
```

Caso prefira, você pode rodar sem o `--tunnel` para conectar dispositivos na mesma rede.

## 📲 Funcionalidades

✅ Busca informações do endereço a partir do CEP informado
✅ Exibe dados como rua, bairro, logradouro e estado
✅ Interface simples e intuitiva

## 📡 Consumo da API

O aplicativo utiliza a API [ViaCEP](https://viacep.com.br/) para obter as informações do endereço. A requisição é feita via **Axios**:

```tsx
import axios from 'axios';

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
```

---

🚀 Desenvolvido com ❤️ por [Brendon Gomes](https://github.com/brendoncronos)