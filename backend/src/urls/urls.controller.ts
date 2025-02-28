import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    Res,
} from "@nestjs/common"
import { CreateUrlDto } from "./dto/createUrl.dto"
import { UrlsService } from "./urls.service"
import { ConfigService } from "@nestjs/config"
import { Request, Response } from "express"
import { IUrlInfo } from "./interfaces/urlInfo.interface"
import { AnalyticsService } from "src/analytics/analytics.service"

@Controller()
export class UrlsController {
    constructor(
        private urlsService: UrlsService,
        private analyticsService: AnalyticsService,
        private configService: ConfigService,
    ) {}

    @Post("shorten")
    async create(@Body() createUrlDto: CreateUrlDto) {
        const shortUrl = await this.urlsService.create(createUrlDto)

        return {
            url: `${this.configService.get("BACKEND_BASE_URL")}/${shortUrl}`,
        }
    }

    @Get(":shortUrl")
    async get(
        @Param("shortUrl") shortUrl: string,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.analyticsService.addRedirect(
            shortUrl,
            request.ip || "Ip адрес скрыт",
        )
        const urlInfo = await this.urlsService.getInfo(shortUrl)

        response.redirect(urlInfo.originalUrl)
    }

    @Get("info/:shortUrl")
    async getInfo(@Param("shortUrl") shortUrl: string): Promise<IUrlInfo> {
        return await this.urlsService.getInfo(shortUrl)
    }

    @Delete("delete/:shortUrl")
    async delete(@Param("shortUrl") shortUrl: string) {
        await this.urlsService.delete(shortUrl)
    }
}
