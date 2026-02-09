import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";
import { AppModule } from "./app.module";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, { cors: false });
  const frontendUrl = process.env.FRONTEND_URL || "";

  app.enableCors({
    origin: frontendUrl ? [frontendUrl] : true,
    credentials: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const portValue = process.env.PORT || "3000";
  const port = Number(portValue);
  await app.listen(port);
}

bootstrap();
