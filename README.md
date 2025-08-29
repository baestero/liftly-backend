# Liftly

Uma API REST em desenvolvimento.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **bcrypt** - Hash de senhas
- **jsonwebtoken** - Autenticação JWT
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - Middleware para CORS

## 📁 Estrutura do Projeto

```
liftly/
├── app.js                 # Arquivo principal da aplicação
├── package.json           # Dependências e scripts
├── .env                   # Variáveis de ambiente (não versionado)
├── .gitignore            # Arquivos ignorados pelo Git
├── controllers/
│   └── UserController.js  # Lógica de negócio para usuários
├── models/
│   └── User.js           # Schema do modelo de usuário
└── routes/
    └── user.js           # Rotas relacionadas a usuários
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB instalado e rodando
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd liftly
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/liftly
JWT_SECRET=sua_chave_secreta_aqui
```

4. Execute a aplicação:

```bash
npm start
```

A aplicação estará rodando em `http://localhost:3000`

## 📡 Endpoints da API

### Usuários

#### POST `/user/register`

Registra um novo usuário no sistema.

**Body:**

```json
{
  "username": "usuario123",
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (201):**

```json
{
  "message": ["Usuario criado com sucesso"],
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "username": "usuario123",
    "email": "usuario@exemplo.com"
  }
}
```

**Validações:**

- Todos os campos são obrigatórios
- Senha deve ter no mínimo 4 caracteres
- Username deve ter 3-20 caracteres (letras, números e underline)
- Email deve ter formato válido
- Username e email devem ser únicos

#### POST `/user/auth`

Realiza o login do usuário no sistema.

**Body:**

```json
{
  "username": "usuario123",
  "password": "senha123"
}
```

**Resposta de Sucesso (200):**

```json
{
  "message": ["Login bem-sucedido"],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Resposta de Erro (401):**

```json
{
  "message": ["Usuário ou senha incorretos"]
}
```

**Validações:**

- Username e password são obrigatórios
- Username deve existir no sistema
- Password deve corresponder ao hash armazenado

## 🔐 Segurança

- **Hash de Senhas**: Utiliza bcrypt com salt rounds de 10
- **Validação de Dados**: Validação tanto no frontend quanto no backend
- **JWT**: Preparado para implementação de autenticação com JWT
- **CORS**: Configurado para permitir requisições cross-origin

## 📊 Modelo de Dados

### User Schema

```javascript
{
  username: String (único, 3-20 caracteres, lowercase)
  email: String (único, formato válido, lowercase)
  password: String (hash com bcrypt)
}
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia a aplicação
- `npm test` - Executa os testes (não implementado ainda

## 👨‍💻 Autor

[Leonardo Baestero]

## 📄 Licença

Este projeto está sob a licença ISC.

---

**Nota**: Este é um projeto em desenvolvimento. Algumas funcionalidades podem estar em implementação.
