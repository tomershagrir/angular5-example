var db={suppliers: [
  {sname:"amazon",sid:1},
  {sname:"ebay",sid:2},
  {sname:"delaextreme",sid:3}
],
items:[
    {name:"bike",sid:1,price:60,currency:"USD",pic:"http://www.pitt.edu/~gmd37/teamwebpage/bluebike.jpg"},
    {name:"mountain bike",sid:2,price:69,currency:"USD",pic:"http://konaworld.com/images/bike/full/stinky_26.jpg"},
    {name:"plate",sid:2,price:30,currency:"USD",pic:"http://images.crateandbarrel.com/is/image/Crate/EssentialDinner10p5inSHF15/$web_product_hero$&/160203170134/essential-dinner-plate.jpg"},
    {name:"bike",sid:3,price:65,currency:"USD",pic:"http://www.pitt.edu/~gmd37/teamwebpage/bluebike.jpg"}
]
};

function get_supplier_name(id){
    for (j=0; j<db.suppliers.length; j++){
        if (db.suppliers[j].sid==id) return db.suppliers[j].sname;
    }
}

function select_db(query){
    console.log(query);
    var ret=[];
    for (i=0;i<db.items.length;i++){
        if (db.items[i].name.includes(query)){
            var dis=[db.items[i].name, get_supplier_name(db.items[i].sid),db.items[i].price,
                  //  db.items[i].currency,'<image style="width:50px;height:50px" src='+db.items[i].pic+' />'];
                       db.items[i].currency,db.items[i].pic];
            ret.push(dis);
        }
    }
    return ret;
}

var express = require('express');
var app = express();
var path = require('path');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    console.log("%s", __dirname);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/form.html', function(req, res) {
    console.log("%s", __dirname);
    res.sendFile(path.join(__dirname + '/form.html'));
});

/// This responds a GET request for the /list_user page.
app.get('/api/list_commands', function (req, res) {
  var response ={
    "valid" : true,
    "options" : ["mayergoldberg","request","reque234st","reques123t","request3","request4","invite","any"]
    };
   setTimeout(function(){res.send(JSON.stringify(response));}, 300);
});

app.get('/api/calc', function (req, res) {
    
   
    
    
    var num=req.query.num;
    var sel=select_db(num);
     console.log(sel);
    var response ={
    "valid" : true,
    "options" : sel
    };
   setTimeout(function(){res.send(JSON.stringify(response));}, 300);
});

app.get('/api/list_commands_by_query/:query', function (request, res) {
   var query = request.params.query.toLowerCase();
    console.log(query);
   var response = {};
   response.options =[];

   var data =  ["request.testA", "request1.testB", "request2.testC", "request3.testD", "request4.testE", "invite.testA", "any.testC", "any.testD"];
   response.valid = false;

   for(var i=0; i<data.length; i++){
     var dataLowerCase = data[i].toLowerCase();
     if(dataLowerCase.indexOf(query)>-1){
          if(dataLowerCase == query){
            response.valid = true;
          }
        response.options.push(data[i]);
     }
   }
   setTimeout(function(){res.send(response);}, 300);
});

var server = app.listen(8081, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s...", host, port)
})

