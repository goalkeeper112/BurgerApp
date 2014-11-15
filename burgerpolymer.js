Pedidos = new Mongo.Collection("pedidos");
Pruebas = new Mongo.Collection("pruebas");

Router.configure({
  layoutTemplate: "layout"
});

Router.route('/', function(){
  if(! Meteor.user()){
    this.render("LoginPanel");
  } else {
    if(Meteor.user().username === "Admin"){
      this.render("AdminPanel");
    } else{
      this.render("Main");
    }
  }
});

if(Meteor.isClient){

  var extra = $("#pedido").val();

  Template.body.helpers({
    pedidos: function () {
      return Pedidos.find({}, {sort: -1});
    }
  });



    Template.body.events({
    "submit .carne": function(event){
      var userName = Meteor.user().username;

      Session.set("user", userName);
      

      Pedidos.insert({
        Usuario: Session.get("user"),
        Pedido: {
          hamburgesa: "Hamburgesa Desubikda",
          extras: extra,
          precio: 100
        },
        fecha: new Date(),
        realizada: false
      }, function(err){
        if(err){
          console.log(err);
        }
        console.log("enviada");
      });

      $(".extraCarne").val("");

      return false;
    }/*,

    "submit .dobleCarne": function(event){
      var extra = event.target.extraDoble.value;

      Pedidos.insert({

      });

      event.target.extraDoble.value = "";

      return false;
    },

    "submit .pollo": function(event){
      var extra = event.target.extraPollo.value;

      Pedidos.insert({

      });

      event.target.extraPollo.value = "";

      return false;
    }*/
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}