import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
// import IORedis from 'ioredis'
import cookieParser from 'cookie-parser';
// import * as session from 'express-session'
// import { ms, parseBoolean, type StringValue } from '@/libs'
// import RedisStore from 'connect-redis'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api');

	const config = app.get(ConfigService)

	// const redis = new IORedis(config.getOrThrow('REDIS_URI'))

	app.use(cookieParser());

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	)

	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN').split(','),
		credentials: true,
	})
	await app.listen(config.getOrThrow<number>('PORT') ?? 4000)
}
bootstrap()


