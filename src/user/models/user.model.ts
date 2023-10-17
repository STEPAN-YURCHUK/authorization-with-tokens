import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { Token } from 'src/token/models/token.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: true })
    first_name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    last_name: string;

    @HasOne(() => Token)
    refresh_token: Token;
    
}