import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) {
    return fallback;
  }
  return value.toLowerCase() === "true";
}

function parseNumber(value: string | undefined, fallback: number) {
  if (value === undefined) {
    return fallback;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fallback;
  }
  return parsed;
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST || "localhost",
      port: parseNumber(process.env.DATABASE_PORT, 5432),
      username: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "postgres",
      database: process.env.DATABASE_NAME || "perfilamiento",
      synchronize: parseBoolean(process.env.DATABASE_SYNCHRONIZE, false),
      ssl: parseBoolean(process.env.DATABASE_SSL, false),
      autoLoadEntities: true,
      logging: ["error", "warn"]
    })
  ]
})
export class DatabaseModule {}
