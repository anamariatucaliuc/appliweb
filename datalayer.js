
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://anamariatucaliuc11:Mongo@cluster0-zbehl.mongodb.net/Poly?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser:true });
var db;

var datalayer = {
    init : function(cb){
        //Initialize connection once
        client.connect(function(err) {
            if(err) throw err;
            db = client.db("Poly");
            cb();
        });
    },

    /* ================ TASKS ================ */

    getTaskSet : function(user, cb){
        db.collection("Taches").find({creator : user}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    getTaskGrouped : function(user, groupe, cb){
        db.collection("Taches").find({creator : user, group: groupe}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    getTask : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("getTask");
        db.collection("Taches").findOne(ident, function(err,result) {
            cb(result);
        });
    },
    
    insertTask : function(task, cb){
        db.collection("Taches").insertOne(task, function(err) {
            cb();
        });
    },

    updateTask : function(id, task, cb) {
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("updateTask");
        db.collection("Taches").updateOne(ident, {$set: task}, function(err, result) {
            cb();
        });
    },

    deleteTask : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("deleteTask");
        db.collection("Taches").deleteOne(ident, function(err) {
            cb();
        });
    },

    /* ================ GROUPS ================ */

    getGroup : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("getGroup");
        db.collection("Listes").findOne(ident, function(err,result) {
            cb(result);
        });
    },

    getAllGroup : function(user, cb){
        db.collection("Listes").find({creator : user}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    insertGroup : function(group, cb){
        db.collection("Listes").insertOne(group, function(err) {
            cb();
        });
    },

    deleteGroup : function(id, user, groupe, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("deleteGroup");
        db.collection("Listes").deleteOne(ident, function(err) {});
        db.collection("Taches").deleteMany({creator : user, group: groupe},function(err) {
            cb();
        });
    },

    /* ================ USERS ================ */

    getUserSet : function(cb){
        db.collection("Utilisateurs").find({}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    createUser : function(user, cb){
        db.collection("Utilisateurs").findOne({ pseudo: user.pseudo },function(err, docs) {
           if(docs==null){
                console.log("Inscription");
                db.collection("Utilisateurs").insertOne(user, function(err) {
                    cb();
                });
           }
           else {
               console.log("déjà utilisé");
               cb();
           }
        });
    },

    getUser : function(user, cb){
        db.collection("Utilisateurs").findOne(user, function(err,result) {
            cb(result);
        });
    }
};

module.exports=datalayer;
