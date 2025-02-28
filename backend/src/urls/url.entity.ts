import { RedirectInfo } from "src/analytics/redirectInfo.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    originalUrl: string

    @Column({ type: "varchar", unique: true })
    shortUrl: string

    @Column({ type: "int" })
    clickCount: number

    @Column({ type: "timestamptz" })
    createdAt: Date

    @Column({ type: "timestamptz", nullable: true })
    expiresAt: Date | null

    @OneToMany(() => RedirectInfo, (redirectInfo) => redirectInfo.url)
    redirectInfos: RedirectInfo[]
}
