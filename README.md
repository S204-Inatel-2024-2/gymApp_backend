<h1 align="center"> 
	Backend Gym ++
</h1>
<h4 align="center"> 
	🚧  Backend Gym ++ ♻️ Em progresso 🚀 🚧
</h4>


## 💻 Sobre o Aplicativo

♻️ Um app na qual o usuário consiga selecionar e realizar treinos e dar feedback sobre a execução dos exercícios. Além disso participarão de um processo de gameficação, onde ele acumulará Halteres por calorias perdidas no dia que realizar uma atividade.

---

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco MYSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

---

## 🚀 Como executar o projeto

1. Backend
   
   ```bash
   # Clone este repositório
   $ git clone https://github.com/S204-Inatel-2024-2/gymApp_backend.git
   $ cd gymApp_backend
   # Baixar dependências
   $ npm i /pnpm i / yarn i
   # Rodar Banco de dados no Docker
   $ docker-compose up -d
   # Rodar Migrations do Prisma
   $ npx prisma migrate dev
   # Rodar o projeto
   $ npm run start:dev
   # Rodar Testes
   $ npm run test
   ```d

