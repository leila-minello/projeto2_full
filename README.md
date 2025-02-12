# 🎵 PROJETO API (LAST.FM) 🎶

### <b>Bem vindo ao nosso projeto!!</b> 🤓

Nosso objetivo com essa aplicação é simular algo parecido com a plataforma <b>Last.fm</b>, que possui um vasto catálogo de artistas e músicas
que são adicionados com base em <i>scrobbling</i>, que é basicamente <b>ouvir a música</b>. 

![image](https://github.com/user-attachments/assets/74817e37-5a0a-4b2a-8cad-53374c42b82f)

Na nossa versão, os usuários podem adicionar <b>manualmente</b> as informações de artistas e faixas, assim como alguns atributos relacionados, 
formando assim um catálogo personalizado com o gosto de cada um!

# 🧑‍💻 FUNCIONALIDADES

- O usuário pode fazer login no site e caso ainda não tenha uma conta, pode se registrar.
  - É <b>necessário</b> que o usuário esteja logado para fazer busca e inserção de dados.
- Após o login, o usuário pode <b>adicionar artistas</b> no catálogo, assim como o <b>gênero</b> e <b>popularidade</b> do artista.
- Também pode adicionar uma <b>faixa</b>, associando-a com um artista já registrado e um <b>álbum</b>.
- Após inserção, o usuário pode <b>buscar</b> os artistas e/ou faixas adicionados para ver seus dados.

# 🔨 ARQUITETURA

### 🖥️ FRONT-END
Toda a parte de front-end foi feita utilizando a biblioteca de <b>React</b>, utilizando requisições <b>HTTP</b> em páginas .jsx, unindo as funções
e a interface para deixar o projeto mais prático. Também utilizou a autenticação via <b>JWT</b> para proteção de rotas.

### 🚪 BACK-END
Foi feita utilizando o <b>Express.js</b> para gerenciar as requisições HTTP, realizar autenticação e interagir com banco de dados,
e utilizou o padrão <b>RESTful</b> para a inserção e busca.

### 📊 BANCO DE DADOS
Escolhemos o banco de dados <b>MongoDB</b> para armazenar os dados que disponibilizamos para inserções dos usuários.

# CONCLUSÃO

Nosso projeto foi feito para a matéria de Web Fullstack, pelos alunos Gabriel Victor Tavares (gabvfla) e Leila (leilaminello).
Obrigada pela atenção!! 💌
