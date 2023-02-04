import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class AccessToken {
    constructor(id?: string) {
        this.id = id;
    }

    @Column({
        type: 'varchar',
        length: 500,
        primary: true,
    })
    id: string

    @ManyToOne(
        () => Users,
        user => user.id,
        {
            onDelete: 'CASCADE'
        }
    )
    user: Users

    @Column({
        type: 'tinyint',
        default: 0
    })
    revoked: number

    @Column({ type: 'datetime' })
    createdAt: Date

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date

    @Column({ type: 'datetime', nullable: true })
    expiresAt: Date

}