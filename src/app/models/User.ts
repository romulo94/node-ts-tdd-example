/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { BeforeCreate, BeforeUpdate, Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript'
import authConfig from '../../config/auth'
@Table({
  timestamps: true,
  tableName: 'user'
})
export default class User extends Model<User> {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  @BeforeUpdate
  @BeforeCreate
  static async encryptPassword (instance: User): Promise<void> {
    if (instance.password) {
      instance.password_hash = await bcrypt.hash(instance.password, 8)
    }
  }

  @Column({
    primaryKey: true,
    type: DataType.UUIDV1,
    allowNull: false,
    defaultValue: DataType.UUIDV1
  })
  public id!: string;

  @Column
  public name!: string;

  @Column
  public email!: string;

  @Column
  public password_hash!: string;

  @Column({
    type: DataType.VIRTUAL
  })
  public password!: string;

  @CreatedAt
  @Column
  public created_at!: Date;

  @UpdatedAt
  @Column
  public updated_at!: Date;

  public async checkPassword (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash)
  }

  public generateToken (): string {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    })
  }
}
