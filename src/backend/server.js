// NEED EXPRESS FOR SERVER REQUESTS
import express from 'express';
// NEED MONGODB FOR DATABASE REQUESTS
import mongodb from 'mongodb';
// NEED THIS TO PARSE 
import bodyParser from 'body-parser';

// INITIALIZE APPLICATION
const app = express();

//
app.use(bodyParser.json());

// THIS IS OUR db connection string /mailinglistdb is db name
const dbUrl = 'mongodb://localhost/mailinglistdb';

// DEFINE VALIDATE FUNCTION WHICH TAKES DATA
function validate(data){
	let errors ={};
    if(data.first ==='') errors.first ="First name can't be empty";
    if(data.last ==='') errors.last ="Last name can't be empty";
    if(data.email ==='') errors.email ="Please enter email - I mean this is a mailing list duh";
    const isValid = Object.keys(errors).length === 0
    // RETURN OBJECT WITH ERRORS AND ISVALID BOOL
    return {errors,isValid};
}

// CONNECT TO DATABASE - WE PROVIDE connection string and a callback function
mongodb.MongoClient.connect(dbUrl,(err, client) =>{	

	// HERE WE STORE OUR DATABASE IN A VARIABLE
	var db = client.db('mailinglistdb');
	// AFTER CONNECTING TO DATABASE WE RUN THE SERVER


	// DEFINING ROUTE AND ITS CALLBACK 
	app.get('/api/users', (req, res) => {
	// WE GET COLLECTION USERS - THEN WE FIND ALL RECORDS AND CONVERT THAT TO ARRAY
	// THE RESULT OF THIS CONVERSION IS PASSED AS CALLBACK FUNCTION THE FIRST ARGUMENT 
	// IS ERROR AND THE SECOND IS THE RESULT OF THE CONVERSION 	
    db.collection('users').find({}).toArray((err, users) => {

    // WE RESPOND WITH JSON CONTAINING THE USERS COLLECTION
      res.json({ users });
    });
  });

	//
	app.post('/api/users',(req,res)=>{
		// MUST VALIDATE DATA!!
		// CALL VALIDATE AND PASS REQ.BODY
		const {errors,isValid} = validate(req.body);
		
		if(isValid){
			//FIRST GET DATA 
			const{first,last,email} = req.body;
			// GET COLLECTION AND INSERT OBJECT WITH DATA --> callback
			db.collection('users').insert({first,last,email},(err,result)=>{
				// IF THERE IS ERROR WE RESPOND WITH STATUS 500 AND JSON OBJECT WITH ERRORS
				if(err){
					res.status(500).json({errors: {global:"Something went wrong with inserting into database"}});
				// IF NO ERROR RESPOND WITH JSON AND PASS FIRST OBJECT FROM RESULT	
				}else{
					res.json({user:result.ops[0]});
				}
			})

		// IF IT IS NOT VALID RESPOND WITH STATUS 400 AND JSON OBJECT CONTAINING ERRORS	
		}else{
			res.status(400).json({ errors });
		}
	});

	// ROUTE FOR UPDATING USERS callback req-res
	app.put('/api/users/:_id',(req,res)=>{
		// VALIDATE INPUT 
		const {errors,isValid} = validate(req.body);

		// IF IT IS VALID
		if(isValid){
			// GET INFO FROM REq.body
			const {first,last,email} = req.body;
			// FIND IN DATABASE
			db.collection('users').findOneAndUpdate(
				// QUERY OBJECT WE SEARCH BY ID
				{_id:new mongodb.ObjectId(req.params._id)},
				// OBJECT WITH FIELDS WE WANT TO UPDATE
				{$set:{first,last,email}},
				// OPTIONS - MONGO WILL RETURN UPDATED USER
				{returnOriginal:false},

				// CALLBACK
				(err,result)=>{
					// IF ERRORS
					if(err) {res.status(500).json({errors:{global:err}});return;}
					// IF SUCCESS 
					res.json({user:result.value});
				});
		// IF ERRORS RESPOND WITH JSON ERRORS
		}else{
			res.status(400).json({errors});
		}
	})


	app.get('/api/users/:_id',(req,res)=>{
		// FIND USER BY ID IN DATABASE - we need to create mongodb objectid
		db.collection('users').findOne({_id: new mongodb.ObjectId(req.params._id)},(err,user)=>{
			// IF OK WE RESPOND WITH JSON CONTAINTING USER
			res.json({user});
		})
	});

	// DELETE ROUTE
	app.delete('/api/users/:_id', (req, res) => {
    db.collection('users').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
      if (err) { res.status(500).json({ errors: { global: err }}); return; }

      res.json({});
    })
  });

	// NEW MIDDLEWARE THAT TAKES REQUEST RESPONSE ARGUMENTS 
	app.use((req,res)=>{
		// RESPOND WITH 404 STATUS AND json WITH global error
		res.status(404).json({
			errors:{
				global: "Something went wrong"
			}
		});
	})

	// WE RUN SERVER ON PORT 8080 AND JUST DO CALLBACK WITH console.log	
  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});

