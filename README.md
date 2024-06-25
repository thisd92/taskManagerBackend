# Task Manager Backend

Este é o backend para o Gerenciador de Projetos e Tarefas desenvolvido em Node.js com Express, MongoDB e Mongoose. O projeto segue o padrão MVC para organização e estruturação do código.

## Funcionalidades

O backend oferece as seguintes funcionalidades através de suas rotas:

- Autenticação de usuários
- CRUD de empresas
- CRUD de perfis de usuário
- CRUD de projetos
- CRUD de squads
- CRUD de tarefas

As rotas seguem o padrão `api/` seguido pelo endpoint específico para cada recurso. Por exemplo:

- `api/auth`: Rotas relacionadas à autenticação de usuários.
- `api/company`: Rotas para operações CRUD de empresas.
- `api/profile`: Rotas para operações CRUD de perfis de usuário.
- `api/project`: Rotas para operações CRUD de projetos.
- `api/squad`: Rotas para operações CRUD de squads.
- `api/task`: Rotas para operações CRUD de tarefas.
- `api/user`: Rotas para operações CRUD de usuários.

As rotas estão definidas nos seguintes arquivos:

- `routes/routes.js`
- `routes/authRoute.js`
- `routes/companyRoute.js`
- `routes/profileRoute.js`
- `routes/projectRoute.js`
- `routes/squadRoute.js`
- `routes/taskRoute.js`
- `routes/userRoute.js`

## Serviços (Services)

Além das rotas, o projeto utiliza serviços para encapsular a lógica de negócio e facilitar a reutilização de código. Os serviços são responsáveis por interagir diretamente com os modelos (Mongoose) e são organizados da seguinte maneira:

- `services/authService.js`: Serviços relacionados à autenticação de usuários.
- `services/companyService.js`: Serviços relacionados às operações CRUD de empresas.
- `services/profileService.js`: Serviços relacionados às operações CRUD de perfis de usuário.
- `services/projectService.js`: Serviços relacionados às operações CRUD de projetos.
- `services/squadService.js`: Serviços relacionados às operações CRUD de squads.
- `services/taskService.js`: Serviços relacionados às operações CRUD de tarefas.
- `services/userService.js`: Serviços relacionados às operações CRUD de usuários.

Os serviços ajudam a manter o código organizado e modular, facilitando também a escrita de testes unitários.

## Middleware de Autenticação

O backend inclui um middleware para autenticação, garantindo que apenas usuários autenticados possam acessar recursos protegidos. Além disso, há um mecanismo para verificar e entregar somente os projetos e tarefas da empresa do usuário autenticado.

## Configuração do Banco de Dados

O banco de dados MongoDB está configurado diretamente no arquivo `index.js` para conectar ao banco de dados local. Certifique-se de ter o MongoDB instalado e em execução localmente. Você pode ajustar as configurações de conexão no arquivo `index.js` conforme necessário.

## Arquitetura

O projeto utiliza o padrão MVC (Model-View-Controller) para separação de responsabilidades:

- **Model**: Define como os dados serão estruturados e manipulados (usando Mongoose para interação com MongoDB).
- **View**: Neste contexto, é representado pelo frontend em Next.js no repositório `gerenciadorTarefas`.
- **Controller**: Lógica de negócio que manipula as requisições HTTP e interage com os modelos.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose

## Como Usar

1. **Instalação das Dependências**
   ```bash
   npm install
   ```
2. Execução do Servidor
   ```bash
   npm start
   ```
   O servidor será executado por padrão na porta 8090 (configurável via variável de ambiente).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licensa

Licensa MIT.
