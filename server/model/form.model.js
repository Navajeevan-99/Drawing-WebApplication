const mongoose=require('mongoose');
const schema=mongoose.Schema;
const formschema=new schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        }
    },{
        timestamps: true
    }
)
const form=mongoose.model('formdata',formschema);
module.expots=form