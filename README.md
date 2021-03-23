[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Eccoar_2020.2-eccoar_front-end&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=Eccoar_2020.2-eccoar_front-end)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Eccoar_2020.2-eccoar_front-end&metric=coverage)](https://sonarcloud.io/dashboard?id=Eccoar_2020.2-eccoar_front-end)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Eccoar_2020.2-eccoar_front-end&metric=alert_status)](https://sonarcloud.io/dashboard?id=Eccoar_2020.2-eccoar_front-end)
# 2020.2 Eccoar Front End

Este serviço é referente ao Front End do Projeto Eccoar. Para poder utilizá-lo, certifique de que você possui o Docker e o Docker Compose em sua máquina. Caso contrário será necessário baixá-los. Para isso basta seguir os links:
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Eccoar_2020.2-eccoar_front-end&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=Eccoar_2020.2-eccoar_front-end)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Eccoar_2020.2-eccoar_front-end&metric=coverage)](https://sonarcloud.io/dashboard?id=Eccoar_2020.2-eccoar_front-end)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Eccoar_2020.2-eccoar_front-end&metric=alert_status)](https://sonarcloud.io/dashboard?id=Eccoar_2020.2-eccoar_front-end)

# Getting Started with Create React App

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).


* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

Para rodar o projeto, basta executar o seguinte comando na raíz:

```
docker-compose up --build
```

Para executar os testes basta rodar:
```
docker run 20202-eccoar_gateway_backend_reports npm run test
```

Para executar o lint rode:
```
docker run 20202-eccoar_gateway_backend_reports npm run lint
```

Caso você queira gerar um PWA do nosso projeto e rodar em desenvolvimento, será necessário realizar um build do projeto. Rode o seguinte comando:

```
npm run build
```

Para servir esse build, utilize o comando:

```
npm run start-sw
```

Por fim, o service worker só irá funcionar em seu celular se você rodar o projeto utilizando protocolo https. Para isso, baixe o [ngrok](https://ngrok.com/) e utilize-o para cria uma porta TCP na sua máquina. Pegue o link gerado pelo ngrok e rode no seu celular.
See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
