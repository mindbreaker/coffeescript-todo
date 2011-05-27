(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  $(document).ready(function() {
    var App, AppView, Todo, TodoList, TodoView;
    AppView = (function() {
      __extends(AppView, Backbone.View);
      function AppView() {
        this.addAll = __bind(this.addAll, this);
        this.addOne = __bind(this.addOne, this);
        AppView.__super__.constructor.apply(this, arguments);
      }
      AppView.prototype.events = {
        "keypress #new-todo": "createOnEnter"
      };
      AppView.prototype.createOnEnter = function(event) {
        if (event.keyCode !== 13) {
          return;
        }
        Todos.create({
          content: this.input.val()
        });
        return $('#new-todo').val('');
      };
      AppView.prototype.initialize = function() {
        this.input = this.$('#new-todo');
        Todos.bind('add', this.addOne);
        Todos.bind('refresh', this.addAll);
        return Todos.fetch();
      };
      AppView.prototype.addOne = function(todo) {
        var view;
        view = new TodoView({
          model: todo
        });
        return this.$('#todo-list').append(view.render());
      };
      AppView.prototype.addAll = function() {
        return Todos.each(this.addOne);
      };
      return AppView;
    })();
    Todo = (function() {
      __extends(Todo, Backbone.Model);
      function Todo() {
        Todo.__super__.constructor.apply(this, arguments);
      }
      return Todo;
    })();
    TodoList = (function() {
      __extends(TodoList, Backbone.Collection);
      function TodoList() {
        TodoList.__super__.constructor.apply(this, arguments);
      }
      TodoList.prototype.model = Todo;
      TodoList.prototype.localStorage = new Store('Todos');
      return TodoList;
    })();
    window.Todos = new TodoList;
    TodoView = (function() {
      __extends(TodoView, Backbone.View);
      function TodoView() {
        TodoView.__super__.constructor.apply(this, arguments);
      }
      TodoView.prototype.tagName = 'li';
      TodoView.prototype.render = function() {
        var content;
        content = this.model.get('content');
        $(this.el).html(content);
        return this.el;
      };
      return TodoView;
    })();
    return App = new AppView({
      el: $('#content')
    });
  });
}).call(this);
