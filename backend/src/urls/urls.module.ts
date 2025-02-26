import { Module } from "@nestjs/common"
import { UrlsService } from "./urls.service"
import { UrlsController } from "./urls.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Url } from "./url.entity"

@Module({
    imports: [TypeOrmModule.forFeature([Url])],
    providers: [UrlsService],
    controllers: [UrlsController],
    exports: [UrlsService],
})
export class UrlsModule {}
