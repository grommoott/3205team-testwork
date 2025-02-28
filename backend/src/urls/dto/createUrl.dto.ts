import { Type } from "class-transformer"
import { IsDate, IsOptional, IsString, IsUrl, Length } from "class-validator"

export class CreateUrlDto {
    @IsUrl()
    originalUrl: string

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    expiresAt?: Date

    @IsOptional()
    @IsString()
    @Length(1, 20)
    shortUrl?: string
}
