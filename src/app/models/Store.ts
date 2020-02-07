/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */

import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  timestamps: true,
  tableName: 'store'
})
export default class Store extends Model<Store> {
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
  public address!: string;

  @Column
  public longitude!: string;

  @Column
  public latitude!: string;

  @CreatedAt
  @Column
  public created_at!: Date;

  @UpdatedAt
  @Column
  public updated_at!: Date;
}
