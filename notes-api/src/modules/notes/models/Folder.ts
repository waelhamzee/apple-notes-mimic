import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/db';

interface FolderAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FolderCreationAttributes extends Optional<FolderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Folder extends Model<FolderAttributes, FolderCreationAttributes> implements FolderAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Folder.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Folder',
    tableName: 'folders',
  }
);

export default Folder; 