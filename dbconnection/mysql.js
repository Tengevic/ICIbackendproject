const Sequalize  =  require('sequelize');

const sequalize = new Sequalize('pharmarcy','root','tengevic',{
    host: 'localhost',
    port : 3306,
    dialect: 'mysql'
})
module.exports.connect = sequalize;

module.exports.getDrugs = async function(){
     try {
        await sequalize.authenticate();
        
        const [result, metadata] = await sequalize.query('SELECT * FROM pharmarcy.Drugs;')
        return result;
        //const [result2, metadata2] = await sequalize.query('UPDATE pharmarcy.drugs SET name = "test", amount = 22 WHERE drug_id = 1;')
       // console.log(metadata2);
    } catch(err){
        console.log("can't connect to database");
    }
}
module.exports.deleteDrugs = async function (id){
    try {
        await sequalize.authenticate();
        
        const [result, metadata] = await sequalize.query(`DELETE FROM pharmarcy.Drugs WHERE id = ${id};`)
        return result;
    } catch(err){
        console.log(err);
    }
}
module.exports.updateDrugs = async function(drug_id,name,amount, id){
    try {
        await sequalize.authenticate();
        
        const [result2, metadata2] = await sequalize.query(`UPDATE pharmarcy.Drugs
        SET
        drug_id = ${drug_id},
        name = ${name},
        amount = ${amount}
        WHERE id = ${id};`)
       console.log(metadata2);
    } catch(err){
        console.log(err);
    }
}
