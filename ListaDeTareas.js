Tareas = new Meteor.Collection('tareas');

if (Meteor.isClient) {
  Template.body.helpers({
    "tareas": function() {
      return Tareas.find({}, {sort: {createdAt: -1}});      
    } 
  });
  Template.body.events({
    'submit #agregarTarea': function (e) {
      var texto = e.target.texto;
      Tareas.insert({
        texto: texto.value,
        createdAt: new Date(),
      });
      texto.value = "";
      //para evitar comportamiento por defecto.-
      return false;
    }
  });


  Template.tarea.events({
    "click .borrar": function () {
      Tareas.remove(this._id);
    },
    "change li input": function () {
      Tareas.update(this._id, {$set: {marcada: !this.marcada}});
    }
  });
}

