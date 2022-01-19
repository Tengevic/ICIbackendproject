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


drugs.update({ drug_id: '05', name: 'Victor', amount: '6'}, {
    where: { id: 10 }
  })
  .then((data) =>{
    console.log(data.toJSON())
   })
