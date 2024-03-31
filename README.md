<h1 align="center">Blog</h1>
<p align="center">Esse é um projeto FullStack de uma rede social estilo Blog utilizando o NextJS, onde as pessoas podem postar o que pensam e interagir com o pensamento de outras pessoas.</p>
<div style={{display:inline }}>
  
![Screenshot_6](https://github.com/MatheusSCristo/Blog/assets/138341797/f1b2cd58-7c88-45b3-8d1c-7c2610ee421d)
![Screenshot_1](https://github.com/MatheusSCristo/Blog/assets/138341797/b07718c1-f946-46fc-bcd7-496ad40b36c7)
![Screenshot_2](https://github.com/MatheusSCristo/Blog/assets/138341797/19fd43a9-1eff-4ff9-a828-aa5ef27751e3)
![Screenshot_5](https://github.com/MatheusSCristo/Blog/assets/138341797/69c00a21-179c-4974-a097-3ede4ebabf0c)
![iPhone-13-PRO-localhost](https://github.com/MatheusSCristo/Blog/assets/138341797/57650fda-6cd7-4bdf-bb79-e3519207262a)
![iPhone-13-PRO-localhost (2)](https://github.com/MatheusSCristo/Blog/assets/138341797/f3c9e5af-3b84-4217-aa1a-fa11ed8f7cd8)
![iPhone-13-PRO-localhost (3)](https://github.com/MatheusSCristo/Blog/assets/138341797/518dcc7a-2e37-4559-9a41-7d51a2d15479)
</div>


<h1 align='center'> Funcionalidades do projeto</h1>
:construction: Projeto ainda em desenvolvimento :construction:

<h2>Autenticação</h2>
<p>O projeto possui um sistema de autenticação utilizando o NextAuth, o blog possibilita a criação de usuários utilizando tanto um email, quanto sua conta do GitHub e Google.</p>

<h2>Armazenamento de Dados</h2>
<p>Para modelagem do banco de dados foi utilizado a ferramenta Prisma ORM, facilitando a conexão do blog a um banco PostgreSQL hospedado na plataforma Heroku e armazenando as informações dos usuários.</p>

<h2>Chat</h2>
<p>O projeto possui um chat em tempo real para conversação entre usuários, é utilizado a conexão com o banco de dados para armazenar as mensagens.</p>

<h2>Posts</h2>
<p>A funcionalidade de criação de posts é realizada utilizando o banco de dados para armazenamento, os posts ainda possuem a funcionalidade de comentários e likes, além da inserção de categorias que servem para filtrar postagems.</p>

<h2>Personalização do Perfil</h2>
<p>A personalização do perfil do usuário conta com a alteração de foto de perfil,nome de usuário, nome de exibicão, bio e foto de fundo do perfil. As fotos do usuário são armazenadas no banco de dados Storage do firebase</p>

<h2>Proteção das Rotas</h2>
<p>Utilizando o token fornecido no login do usuário, o middleware da aplicação protege as rotas de navegação do Blog, deixando liberado apenas as rotas de login e registro de conta.</p>

<h1>Tecnologias</h1>
<ul>
<li>NextJs</li>
<li>Prisma</li>
<li>Tailwind</li>
<li>Typescript</li>
<li>PostgreSQL</li>
<li>Firebase</li>
<ul>
