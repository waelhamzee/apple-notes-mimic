import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/db';

interface NoteAttributes {
  id: number;
  title: string;
  content: string;
  folderId?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public folderId?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    folderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
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
    modelName: 'Note',
    tableName: 'notes',
  }
);

export default Note; 