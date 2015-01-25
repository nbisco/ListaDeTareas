Tareas = new Meteor.Collection('tareas');

if (Meteor.isClient) {
  Template.body.helpers({
    "tareas": function() {
      if (Session.get('ocultarRealizadas'))
        return Tareas.find({realizada: {$ne:true}}, {sort: {createdAt:-1}});
      else
        return Tareas.find({}, {sort: {createdAt: -1}});      
    },
    "tareasIncompletas": function () {
      return Tareas.find({realizada: {$ne: true}}).count();
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
    },
    'change .ocultarRealizadas input': function (e) {
      Session.set('ocultarRealizadas', e.target.checked);
    }
  });

  Template.tarea.helpers({
    "enEdicion": function(id) {
      return Session.get('editando') == id;
    }
  });

  Template.tarea.events({
    "click .borrar": function () {
      Tareas.remove(this._id);
    },
    "click #tachar": function () {
      Tareas.update(this._id, {$set: {realizada: !this.realizada}});
    },
    "click .editar": function (e) {
      Session.set('editando', this._id);
      Session.set('campo', e.target.getAttribute('campo'));
    },
    "submit #actualizar": function(e) {
      Tareas.update(this._id, {$set: {texto: e.target.textoActual.value}});
      Session.set('editando', false);
      return false;
    }
  });
}

