import { Module } from "@nestjs/common"
import { UrlsModule } from "./urls/urls.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { Url } from "./urls/url.entity"
import { AnalyticsModule } from "./analytics/analytics.module"
import { RedirectInfo } from "./analytics/redirectInfo.entity"

@Module({
    imports: [
        UrlsModule,
        AnalyticsModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_DATABASE"),
                entities: [Url, RedirectInfo],
                synchronize: true,
            }),
        }),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {}
