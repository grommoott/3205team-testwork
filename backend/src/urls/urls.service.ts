import {
    BadRequestException,
    HttpException,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Url } from "./url.entity"
import { Repository } from "typeorm"
import { IUrlInfo } from "./interfaces/urlInfo.interface"
import { CreateUrlDto } from "./dto/createUrl.dto"
import { UrlIsAlreadyExists } from "src/helpers/errors"

@Injectable()
export class UrlsService {
    private readonly randomUrlAlphabet: string =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    private readonly randomUrlLength: number = 12

    constructor(
        @InjectRepository(Url) private urlsRepository: Repository<Url>,
    ) {}

    private async getShortUrl(): Promise<string> {
        const getRandomString = (): string => {
            let buffer = ""

            for (let i = 0; i < this.randomUrlLength; i++) {
                buffer +=
                    this.randomUrlAlphabet[
                        Math.floor(
                            this.randomUrlAlphabet.length * Math.random(),
                        )
                    ]
            }

            return buffer
        }

        let url: Url | null
        let shortUrl = ""

        do {
            shortUrl = getRandomString()
            url = await this.urlsRepository.findOne({ where: { shortUrl } })
        } while (url)

        return shortUrl
    }

    async getInfo(shortUrl: string): Promise<IUrlInfo> {
        const url = await this.urlsRepository.findOne({ where: { shortUrl } })

        if (!url) {
            throw new NotFoundException()
        }

        if (url.expiresAt && url.expiresAt.getTime() < new Date().getTime()) {
            await this.delete(url.shortUrl)
            throw new NotFoundException()
        }

        return {
            clickCount: url.clickCount,
            createdAt: url.createdAt,
            originalUrl: url.originalUrl,
        }
    }

    async delete(shortUrl: string) {
        const url = await this.urlsRepository.findOne({ where: { shortUrl } })

        if (!url) {
            throw new NotFoundException()
        }

        await this.urlsRepository.remove(url)
    }

    async create(createUrlDto: CreateUrlDto): Promise<string> {
        if (createUrlDto.shortUrl) {
            const existingUrl = await this.urlsRepository.findOne({
                where: { shortUrl: createUrlDto.shortUrl },
            })

            if (existingUrl) {
                throw new BadRequestException(UrlIsAlreadyExists)
            }
        }

        const url = new Url()
        url.originalUrl = createUrlDto.originalUrl
        url.shortUrl = createUrlDto.shortUrl || (await this.getShortUrl())
        url.expiresAt = createUrlDto.expiresAt || null
        url.clickCount = 0
        url.createdAt = new Date()

        await this.urlsRepository.save(url)

        return url.shortUrl
    }
}
