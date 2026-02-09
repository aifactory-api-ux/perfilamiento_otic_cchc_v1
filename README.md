# Proyecto Perfilamiento OTIC CCHC v1

## Descripción del Proyecto
Un sistema de gestión de perfiles que integra backend en NestJS y frontend en React, utilizando microservicios.

## Stack Tecnológico
- Node.js 18.16.1
- NestJS
- React
- Single SPA
- Keycloak
- PostgreSQL
- Microsoft Azure
- Docker
- PM2

## Instalación y Configuración
1. Clona el repositorio.
2. Instala las dependencias del backend y frontend usando npm.
3. Crea un archivo `.env` a partir de `.env.example` con las variables necesarias.
4. Ejecuta `docker-compose up` para iniciar los contenedores.

## Ejemplos de Uso
- API para gestión de perfiles.
- Autenticación mediante Keycloak.

## Estructura del Proyecto
```
workspace/
  ├─ backend/
  └─ frontend/
```

## Guía de Configuración
1. Configura la base de datos en el archivo de configuración.
2. Verifica que todos los servicios estén corriendo utilizando Docker.
