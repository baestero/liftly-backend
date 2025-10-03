# Liftly Backend

## 📋 Descrição

O **Liftly** é uma API REST para gerenciamento de exercícios físicos, desenvolvida em Node.js com Express e MongoDB. O sistema permite que usuários registrem e acompanhem seus treinos, organizando exercícios por categorias e subcategorias.

## 🚀 Funcionalidades

### Autenticação
- ✅ Registro de usuários
- ✅ Login com JWT
- ✅ Middleware de autenticação
- ✅ Validação de token

### Gerenciamento de Exercícios
- ✅ Criação de categorias de exercícios
- ✅ Criação de subcategorias
- ✅ CRUD completo de exercícios
- ✅ Controle de peso máximo, repetições e séries
- ✅ Histórico de exercícios por usuário

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via tokens
- **bcrypt** - Criptografia de senhas
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
liftly-backend/
├── app.js                 # Arquivo principal da aplicação
├── package.json           # Dependências e scripts
├── controllers/           # Controladores da aplicação
│   ├── UserController.js
│   ├── CategoryController.js
│   ├── SubCategoryController.js
│   └── ExcerciseController.js
├── models/                # Modelos do banco de dados
│   ├── User.js
│   ├── Category.js
│   ├── SubCategory.js
│   └── Exercise.js
├── routes/                # Rotas da API
│   ├── user.js
│   └── category.js
└── middlewares/           # Middlewares
    └── auth.js
```

## 🗄️ Modelos de Dados

### User (Usuário)
- `username` - Nome de usuário único
- `email` - Email único
- `password` - Senha criptografada

### Category (Categoria)
- `name` - Nome da categoria

### SubCategory (Subcategoria)
- `name` - Nome da subcategoria
- `categoryId` - Referência à categoria pai

### Exercise (Exercício)
- `name` - Nome do exercício
- `maxWeight` - Peso máximo
- `reps` - Número de repetições
- `sets` - Número de séries
- `userId` - Referência ao usuário
- `subCategoryId` - Referência à subcategoria
- `date` - Data do exercício

## 🔗 Endpoints da API

### Autenticação (`/users`)
- `POST /users` - Registro de usuário
- `POST /users/auth` - Login
- `GET /users/me` - Dados do usuário logado
- `GET /users/validate` - Validar token

### Categorias e Exercícios (`/categories`)
- `GET /categories` - Listar categorias
- `GET /categories/:categoryId/subcategories` - Listar subcategorias
- `GET /categories/:categoryId/subcategories/:subCategoryId/exercises` - Listar exercícios
- `GET /categories/:categoryId/subcategories/:subCategoryId/exercises/:exerciseId` - Buscar exercício específico
- `POST /categories/:categoryId/subcategories/:subCategoryId/exercises` - Criar exercício
- `PUT /categories/:categoryId/subcategories/:subCategoryId/exercises/:exerciseId` - Atualizar exercício
- `DELETE /categories/:categoryId/subcategories/:subCategoryId/exercises/:exerciseId` - Deletar exercício

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB Atlas ou MongoDB local
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd liftly-backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=seu_jwt_secret_aqui
PORT=3000
```

4. **Execute a aplicação**
```bash
npm start
```

A aplicação estará rodando em `http://localhost:3000`

## 🔐 Autenticação

Para acessar endpoints protegidos, inclua o token JWT no header:
```
Authorization: Bearer <seu_token_jwt>
```

## 📝 Exemplos de Uso

### Registro de Usuário
```bash
POST /users
Content-Type: application/json

{
  "username": "usuario123",
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### Login
```bash
POST /users/auth
Content-Type: application/json

{
  "username": "usuario123",
  "password": "senha123"
}
```

### Criar Exercício
```bash
POST /categories/:categoryId/subcategories/:subCategoryId/exercises
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "supino reto",
  "maxWeight": 80,
  "reps": 10,
  "sets": 3
}
```

## 🚦 Status Codes

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `401` - Não autenticado
- `403` - Token expirado
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## 🔒 Segurança

- Senhas são criptografadas com bcrypt
- Autenticação via JWT
- Validação de dados de entrada
- Middleware de autenticação em rotas protegidas
- Validação de IDs do MongoDB

## 📊 Validações

### Usuário
- Username: 3-20 caracteres, apenas letras, números e underscore
- Email: formato válido de email
- Senha: mínimo 4 caracteres

### Categoria/Subcategoria
- Nome: 3-20 caracteres, letras (com acentos), números e underscore

### Exercício
- Nome: 3-20 caracteres, letras (com acentos), números, underscore e espaços
- Peso, repetições e séries: obrigatórios e numéricos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido por Leonardo Baestero

---

**Liftly** - Organize seus treinos de forma inteligente! 💪