/**
 * @author fuqiang
 * @date 20161020
 * @fileoverview todolist for gmp
 */
(function(win) {
    var GMP = win.GMP;
    var template = win.template;
    var $ = win.$;
    // localStorage persistence
    var STORAGE_KEY = 'todos-gmp-0.0.1';
    var todoStorage = {
        fetch: function() {
            var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            todos.forEach(function(todo, index) {
                todo.id = index;
            });
            todoStorage.uid = todos.length;
            return todos;
        },
        findTodoById: function(id, todos) {
            return todos.filter(function(todo) {
                return todo.id == id;
            })[0];
        },
        save: function(todos) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    };

    var filters = {
        all: function(todos) {
            return todos;
        },
        active: function(todos) {
            return todos.filter(function(todo) {
                return !todo.completed;
            });
        },
        completed: function(todos) {
            return todos.filter(function(todo) {
                return todo.completed;
            });
        }
    };

    new GMP({
        el: '.todoapp',
        data: {
            todos: todoStorage.fetch(),
            visibility: 'all'
        },
        template: {
            listTemplate: template('list')
        },
        addTodo: function(e) {
            if (e.keyCode === 13) {
                var value = $(e.target).val();
                if (!value) {
                    return;
                }
                this.data.todos.push({
                    id: todoStorage.uid++,
                    title: value,
                    completed: false
                });
                $(e.target).val('');
                this.render();
            }
        },
        clickTodo: function(e) {
            var id = $(e.target).attr('data-id');
            var todo = todoStorage.findTodoById(id, this.data.todos);
            todo.completed = !todo.completed;
            this.render();
        },
        removeTodo: function(e) {
            var id = $(e.target).attr('data-id');
            var todo = todoStorage.findTodoById(id, this.data.todos);
            this.data.todos.splice(this.data.todos.indexOf(todo), 1);
            this.render();
        },
        clearCompleted: function() {
            this.data.todos = filters.active(this.data.todos);
            this.render();
        },
        editTodo: function(e) {
            var view = $(e.target).closest('.view');
            view.find('label,button,input').hide();
            view.find('.edit').show();
        },
        cancelEditTodo: function(e) {
            var view = $(e.target).closest('.view');
            var id = $(e.target).attr('data-id');
            var todo = todoStorage.findTodoById(id, this.data.todos);
            view.find('label,button,input').show();
            view.find('.edit').val(todo.title).hide();
        },
        saveEditBykeyup: function(e) {
            if (e.keyCode === 13) {
                var value = $(e.target).val();
                if (!value) {
                    return;
                }
                var id = $(e.target).attr('data-id');
                var todo = todoStorage.findTodoById(id, this.data.todos);
                todo.title = value;
                this.cancelEditTodo.call(this, e);
                this.render();
            }
        },
        toggleAll: function() {
            var completed = filters.completed(this.data.todos).length === this.data.todos.length ? false : true;
            this.data.todos.forEach(function(todo) {
                todo.completed = completed;
            });
            this.render();
        },
        els: {
            main: '.main',
            footer: '.footer',
            list: '.todo-list',
            count: '.todo-count strong',
            filtersA: '.filters a',
            toggleAll: '.toggle-all'
        },
        events: {
            'keyup .new-todo': 'addTodo',
            'click .toggle-all': 'toggleAll',
            'click .toggle[type=checkbox]': 'clickTodo',
            'click .destroy': 'removeTodo',
            'click .clear-completed': 'clearCompleted',
            'dblclick .todo-list label': 'editTodo',
            'blur .todo-list input': 'cancelEditTodo',
            'keyup .todo-list input': 'saveEditBykeyup',
        },
        hashChange: function() {
            var visibility = win.location.hash.replace(/#\/?/, '');
            if (filters[visibility]) {
                this.data.visibility = visibility;
            } else {
                win.location.hash = '';
                this.data.visibility = 'all';
            }
            this.render();
        },
        toggleTodos: function() {
            if (this.data.todos.length) {
                this.els.main.show();
                this.els.footer.show();
            } else {
                this.els.main.hide();
                this.els.footer.hide();
            }
            if (filters.completed(this.data.todos).length === this.data.todos.length) {
                this.els.toggleAll.prop("checked",true);
            } else {
                this.els.toggleAll.prop("checked",false);
            }
        },
        renderFooter: function() {
            var todos = filters[this.data.visibility](this.data.todos);
            this.els.count.text(todos.length);
            this.els.filtersA.removeClass('selected');
            $('a[href="#/' + this.data.visibility + '"]').addClass('selected');
        },
        renderList: function() {
            var todos = filters[this.data.visibility](this.data.todos);
            var template = this.template.listTemplate(todos);
            this.els.list.html(template);
        },
        render: function() {
            this.toggleTodos();
            this.renderList();
            this.renderFooter();
            todoStorage.save(this.data.todos);
        },
        init: function() {
            $(window).on('hashchange', this.hashChange.bind(this));
            this.hashChange();
        }
    });

})(window);
