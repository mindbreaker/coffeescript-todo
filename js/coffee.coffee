$(document).ready ->
  class AppView extends Backbone.View

    events:
      "keypress #new-todo": "createOnEnter"

    createOnEnter: (event) ->
      return if event.keyCode != 13
      Todos.create content: @input.val()
      $('#new-todo').val ''

    initialize: ->
      @input = @$('#new-todo')
      Todos.bind 'add', @addOne
      Todos.bind 'refresh', @addAll

      Todos.fetch()

    addOne: (todo) =>
      view = new TodoView(model: todo)
      @$('#todo-list').append(view.render())

    addAll: =>
      Todos.each @addOne

  class Todo extends Backbone.Model

  class TodoList extends Backbone.Collection
    model: Todo

    localStorage: new Store('Todos')

  window.Todos = new TodoList

  class TodoView extends Backbone.View
    tagName: 'li'

    render: ->
      content = @model.get('content')
      $(@el).html(content)
      @el

  App = new AppView(el: $('#content'))