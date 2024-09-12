# SUSP

Uma plataforma para auxiliar na busca por atendimento na rede pública de saúde

## Ambiente de Desenvolvimento

Nosso ambiente de desenvolvimento possui:

- Node.js: 22
- Yarn: 1.22

Instale ambos e execute `yarn install` na raíz do projeto para instalar todas dependências e use `yarn dev` para iniciar o servidor de desenvolvimento.

## Padrões de Projeto

### Desenvolvimento

Usamos duas _branches_ principais: `main` e `dev`. Na `main` teremos apenas versões estáveis da plataforma, na `dev` teremos sempre a versão mais atualizada do projeto com os PR mais recentes.

Novas contribuições devem ser feitas sempre criando novas _branches_ a partir da `dev` e finalizadas com um PR para a `dev`. 

### Branches e Commits

Vamos usar os padrões dos [_conventional commits_](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).

Para nome de _branches_ vamos usar `kebab-case` iniciando com um tipo dos _conventional commits_.

Para _commits_, _branches_ e código em geral vamos dar preferência pela língua inglesa.