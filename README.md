# 2020.2 Eccoar Front End

Este serviço é referente ao Front End do Projeto Eccoar. Para poder utilizá-lo, certifique de que você possui o Docker e o Docker Compose em sua máquina. Caso contrário será necessário baixá-los. Para isso basta seguir os links:


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