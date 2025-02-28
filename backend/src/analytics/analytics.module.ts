import { Module } from "@nestjs/common"
import { AnalyticsService } from "./analytics.service"
import { AnalyticsController } from "./analytics.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Url } from "src/urls/url.entity"
import { RedirectInfo } from "./redirectInfo.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Url, RedirectInfo])],
    providers: [AnalyticsService],
    controllers: [AnalyticsController],
    exports: [AnalyticsService],
})
export class AnalyticsModule {}
