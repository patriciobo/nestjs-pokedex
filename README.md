<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el Repositorio
2. Ejecutar

```
yarn install
```

3. Tener NestJs instalado

```
npm i -g @nest/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

5. Correr proyecto

```
yarn start:dev
```

5. Reconstruir BD

```
http://slocalhost:3000/api/v2/seed
```

6. Clonar el archivo `.env.template` y renombrar la copia a `.env`

7. Llenar las variables de entorno definidas en el `.env`

### Stack Utilizado

- MongoDB
- Nest
