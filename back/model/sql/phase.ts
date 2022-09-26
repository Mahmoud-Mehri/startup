import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { Task } from "./task";

class Phase extends Model<
  InferAttributes<Phase>,
  InferCreationAttributes<Phase>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare isCompleted: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Phase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: dbconnection, // dbConnection should be declared before using here
    modelName: "phase",
  }
);

// We're not setting any attribute for tasks here,
// tasks will be retrieved by querying at runtime

Phase.hasMany(Task, {
  sourceKey: "id",
  foreignKey: "phaseId",
  as: "tasks",
});

export { Phase };
