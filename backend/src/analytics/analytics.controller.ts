import { Controller, Get, Param } from "@nestjs/common"
import { AnalyticsService } from "./analytics.service"
import { IAnalytics } from "./interfaces/analytics.interface"

@Controller("analytics")
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) {}

    @Get(":shortUrl")
    async get(@Param("shortUrl") shortUrl: string): Promise<IAnalytics> {
        return await this.analyticsService.getAnalytics(shortUrl)
    }
}
