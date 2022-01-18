const Connection = require("./mysql")
const {DataTypes} = require("sequelize")

const dbconnect = Connection.connect;

const drugs = dbconnect.define('Drugs',{
    drug_id:{
        type: DataTypes.STRING,
    },
    name:{
        type: DataTypes.STRING,
    },
    amount:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false

})



