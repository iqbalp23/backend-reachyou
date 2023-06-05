import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Article = db.define('article',{
    uuid:{
        type : DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    userid:{
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    title:{
        type : DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type : DataTypes.TEXT,
        allowNull: false,
    },
    image:{
        type : DataTypes.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true
});


Users.hasMany(Article, {
    foreignKey: 'userid',
    sourceKey: 'id'
});
Article.belongsTo(Users, {
    foreignKey: 'userid'
});

export default Article;