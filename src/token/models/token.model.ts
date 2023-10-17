import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';

interface TokenCreationAttrs {
    userId: number;
    refresh_token: string;
}

@Table({ tableName: 'tokens' })
export class Token extends Model<Token, TokenCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    refresh_token: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User) 
    user: User; 
}