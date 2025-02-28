import { Injectable, NotFoundException } from "@nestjs/common"
import { IAnalytics } from "./interfaces/analytics.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { RedirectInfo } from "./redirectInfo.entity"
import { Repository } from "typeorm"
import { Url } from "src/urls/url.entity"

@Injectable()
export class AnalyticsService {
    private readonly analyticsRedirectsLimit = 5

    constructor(
        @InjectRepository(RedirectInfo)
        private redirectInfoRepository: Repository<RedirectInfo>,
        @InjectRepository(Url) private urlsRepository: Repository<Url>,
    ) {}

    public async addRedirect(shortUrl: string, ip: string) {
        const url = await this.urlsRepository.findOne({ where: { shortUrl } })

        if (!url) {
            throw new NotFoundException()
        }

        url.clickCount += 1
        await this.urlsRepository.save(url)

        const redirectInfo = new RedirectInfo()
        redirectInfo.time = new Date()
        redirectInfo.url = url
        redirectInfo.ip = ip

        await this.redirectInfoRepository.save(redirectInfo)
    }

    async getAnalytics(shortUrl: string): Promise<IAnalytics> {
        const url = await this.urlsRepository.findOne({
            where: { shortUrl },
        })

        if (!url) {
            throw new NotFoundException()
        }

        const redirects = (
            await this.redirectInfoRepository.find({
                where: { url },
                order: { time: "DESC" },
            })
        ).splice(0, this.analyticsRedirectsLimit)

        return {
            lastIps: redirects.map((redirect) => redirect.ip),
            clickCount: url.clickCount,
        }
    }
}
