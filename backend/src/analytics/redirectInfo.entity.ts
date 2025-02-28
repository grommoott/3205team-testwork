import { Url } from "src/urls/url.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class RedirectInfo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    ip: string

    @Column({ type: "timestamptz" })
    time: Date

    @ManyToOne(() => Url, (url) => url.redirectInfos, {
        onDelete: "CASCADE",
    })
    url: Url
}
