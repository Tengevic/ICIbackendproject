'use strict'

const Hapi = require('@hapi/hapi');
const { handler } = require('@hapi/hapi/lib/cors');
const Connection = require('./dbconnection/mysql')

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




const init = async() => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) =>{
            return 'hello word'
        }
    })
    // get drugs
    server.route({
        method: 'GET',
        path: '/getdrugs',
        handler: async (request, h) =>{
           const drugs =   await Connection.getDrugs();
           return drugs;
        }
    })
    //add drugs
      server.route({
        method: 'POST',
        path: '/newdrugs',
        handler: async (request, h) =>{
            console.log(request.payload)
           drugs.create({drug_id: request.payload.id, name: request.payload.name,amount: request.payload.amount}).then((data) =>{
               console.log(data.toJSON())
               })
            
        }
    })
    //delete drug
    server.route({
       method: 'DELETE' ,
       path: '/delete/{id}',
       handler: async (request, h) =>{
        
        drugs.destroy({where: {id:request.payload.id}}).then((data) =>{
            console.log(data.toJSON())
           })
     }
    })
    //   updating drug 
    server.route({
        method: 'PUT' ,
        path: '/update/{id}',
        handler: async (request, h) =>{
         
         drugs.update(request.payload,{
             where :{ id: request.payload.id}
         })
      }
     })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) =>{
    console.log(err);
    process.exit(1);
});
init();