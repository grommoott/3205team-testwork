import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
