# ✨ App de Gerenciamento de Escolas e Turmas - Desafio Cadmus

Aplicação desenvolvida com React Native (Expo) para gerenciamento de escolas e turmas.

---

## ✨ Tecnologias utilizadas

* Node.js: >= 18.x
* React: 19.x
* React Native (via Expo)
* Expo Router
* TypeScript
* MirageJS
* Zustand
* Jest
* Gluestack UI

---

## ✨ Instalação

Clone o repositório:

```bash
git clone <url-do-repo>
cd <nome-do-projeto>
```

Instale as dependências:

```bash
npm install
```

---

## ▶️ Execução do projeto

Inicie o projeto com:

```bash
npx expo start
```

Depois:

* Pressione `w` para abrir no navegador
* Ou escaneie o QR Code com o app Expo Go

---

## ✨ Rodar testes

Execute:

```bash
npm test
```

Os testes estão localizados em:

```
src/tests
```

---

## ✨ Mock de Back-end

O projeto não utiliza backend real.


### Funcionamento:

* A store (Zustand) consome o repository
* O repository simula operações de API (CRUD)
* Os dados são mantidos apenas em memória
* Ao recarregar o app, os dados são resetados

---

## ✨ Funcionalidades

* Cadastro de escolas
* Edição e remoção de escolas
* Cadastro de turmas vinculadas a escolas
* Edição e remoção de turmas
* Busca de escolas e turmas
* Preenchimento automático de endereço via CEP
* Uso de enum para período (Manhã, Tarde, Noite)
