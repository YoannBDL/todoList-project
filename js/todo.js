var todoList = {

    taskList: [
        {text: "Ceci est ma première tache", done:false},
        {text: "Ceci est ma seconde tache", done:false},
        {text: "Ceci est ma troisième tache", done:false},
    ],

    addTodo: function(text) {
        let task = {text: text, done: false};
        this.taskList.unshift(task);
    },

    changeTodo: function(id, newText) {
        this.taskList[id].text = newText;
        view.showTodos();
    },

    delTodo: function(id) {
        this.taskList.splice(id, 1);
    },

    delAllTodos: function () {
        this.taskList = [];

    },

    toggleCompleted: function(id) {
        this.taskList[id].done = !this.taskList[id].done;
    },

    toggleAll: function() {
        let i = 0;
        this.taskList.forEach(todo => {
            if (todo.done === true){i++}
        });
        this.taskList.forEach(todo => {
            todo.done = i !== this.taskList.length ? true : false;
        });
        view.showTodos();
    }
}

var view = {

    showTodos: function () {
        var ul = document.querySelector('ul');
        ul.innerHTML = '';
        for (let i=0; i<todoList.taskList.length; i++){
            let task = document.createElement('li');
            let check = document.createElement('input');
            task.appendChild(check).setAttribute("type", "checkbox");
            check.className = 'check-task-button';
            check.checked = todoList.taskList[i].done;
            task.id = i;
            task.insertAdjacentText('beforeend', todoList.taskList[i].text);
            task.appendChild(this.createDeleteButton());
            ul.appendChild(task);
        };

    },

    createDeleteButton: function() {
        var deleteButton = document.createElement('i');
        deleteButton.className = 'far fa-times-circle';
        deleteButton.setAttribute('data-selector', 'delete-button');
        return deleteButton;

    },

    toggleDeleteAllButton: function() {
        var deleteAllButton = document.querySelector('.main .check-all i ');
        let isMultipleCheck = todoList.taskList.map(task => task.done).filter(value => value === true).length;
        deleteAllButton.style.visibility = (isMultipleCheck === todoList.taskList.length ? 'visible' : 'hidden');
    },

    toggleCheckAll: function() {
        var checkAllButton = document.querySelector('.check-all-tasks-button');
        let isAllChecked = todoList.taskList.map(task => task.done).includes(false);
        if (isAllChecked) {
            checkAllButton.checked = false;
        }
        else {
            checkAllButton.checked = true;
        }
    },

    setUpEventListeners: function() {
        var todosUl = document.querySelector('.main');
        todosUl.addEventListener('click', function(event) {
            // Get the element thas was clicked on
            var elementClicked = event.target;
    
            //Check on class names
            switch (elementClicked.className) {
                case 'check-task-button' :
                    handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
                    break;  
                case 'check-all-tasks-button' :
                    handlers.toggleAll();
                    break;       
            }
            // Check on data-selector values
            switch (elementClicked.dataset.selector) {
                case 'delete-button' :
                    handlers.delTodo(parseInt(elementClicked.parentNode.id));
                    break;
                case 'delete-all-button' :
                    handlers.delAllTodos();
                break;
                case 'add-task-button' :
                    handlers.addTodo();
                    break
            }

            

        });
    }

}

var handlers = {

    addTodo: function(){
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        if (addTodoTextInput.value) {
            todoList.addTodo(addTodoTextInput.value);
            addTodoTextInput.value = '';
            view.showTodos();
        }
    },

    delTodo: function(id){
        todoList.delTodo(id);
        view.showTodos();
    },

    delAllTodos: function(){
        todoList.delAllTodos();
        view.toggleCheckAll();
        view.showTodos();
    },

    toggleCompleted: function(id) {
        todoList.toggleCompleted(id);
        view.toggleCheckAll();
        view.toggleDeleteAllButton();
        view.showTodos();
    },

    toggleAll: function(){
        todoList.toggleAll();
        view.toggleDeleteAllButton();
    }

}

view.showTodos();
view.setUpEventListeners();
