import { Module } from "@nestjs/common"
import { UrlsService } from "./urls.service"
import { UrlsController } from "./urls.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Url } from "./url.entity"
import { AnalyticsModule } from "src/analytics/analytics.module"

@Module({
    imports: [TypeOrmModule.forFeature([Url]), AnalyticsModule],
    providers: [UrlsService],
    controllers: [UrlsController],
    exports: [UrlsService],
})
export class UrlsModule {}
