import { Controller, Delete, Get, Param, Post, Res } from "@nestjs/common"
import { CreateUrlDto } from "./dto/createUrl.dto"
import { UrlsService } from "./urls.service"
import { ConfigService } from "@nestjs/config"
import { Response } from "express"
import { IUrlInfo } from "./interfaces/urlInfo.interface"

@Controller()
export class UrlsController {
    constructor(
        private urlsService: UrlsService,
        private configService: ConfigService,
    ) {}

    @Post("shorten")
    async create(createUrlDto: CreateUrlDto) {
        const shortUrl = this.urlsService.create(createUrlDto)

        return {
            url: `${this.configService.get("BACKEND_BASE_URL")}/${shortUrl}`,
        }
    }

    @Get(":shortUrl")
    async get(
        @Param("shortUrl") shortUrl: string,
        @Res({ passthrough: true }) response: Response,
    ) {
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
