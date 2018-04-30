
// Create Object toDoList where functions live
var todoList = {

  // created todos property to store array
	todos: [],

  // create methods that passes through argument to add to [todos] array
	addToDos: function(todoText) {
		
    // pushes object to [todos] as todos[i].(propertiesName) and set object.completed to false.
    this.todos.push({
			todoText: todoText,
			completed: false
		});
	},


  // method that takes position of item in [todos] and replace it with newText
	changeToDos: function(position, newText) {

    //todo
		this.todos[position].todoText = newText;
	},

  // method to delete element from [todos] based on array
	deleteToDos: function(position) {

    //uses .splice method on [todos]; (positionOfElementToRemove, numberOfElementsFromPositionToRemove)
		this.todos.splice(position,1);
	},

  // method to toggle between (completed / !completed) for a particular element in [todos] with position
	toggleCompleted: function(position) {
    // create todo variable to store particular element position since it'll be typed out twice
		var todo = this.todos[position];

    //stores opposite of current completion status in currentElement.completed
		todo.completed = !todo.completed;
	},

  // method to toggle all to !completed if all is completed; else toggle all to completed
	toggleAll: function() {

    //stores # of items to var (used in for loop)
		var todosList = this.todos
    //store 0 to var (used to count completed items)
		var completedTodos = 0;

    // counts every element.completed == true in [todos]
    todosList.forEach(function(item) {
      if(item.completed){
        completedTodos++;
      }
    })

		todosList.forEach(function(item) {
      //all items in [todos] is completed, make everything false
      if(completedTodos === todosList.length) {
        item.completed = false;
      }else {
        item.completed = true;
      }  
    });
    //old way
    // if (completedTodos === todosList.length) {
    //     todosList.forEach(function(item){
    //       item.completed = false
    //     })
		// //Else, make all true (every item != completed)
		// }else {
    //     todosList.forEach(function(item){
    //       item.completed = true
    //     })
    //   }
	},

};

//Access to the display todos button
				// instead of tagging buttons with ID, use handler object
				// var displaybutton = document.getElementById("displayTodos");
				// var toggleAllButton = document.getElementById("toggleAll");	


				// displaybutton.addEventListener('click', function(){
				// 	todoList.displayToDos();
				// })

				// toggleAllButton.addEventListener('click', function() {
				// 	todoList.toggleAll();
				// })



//Handles the backend of the code. Takes user input from page and manipulate [todo] in the backend
var handler = {

  //when onclick: adds item entered in text box to item list, [todos];
	addToDos: function() {
    //takes addItemTextBox's ID and stores to var
		var addTodoTextInput = document.getElementById('addToDoTextInput')

    //calls todoList.addToDos() and passes the value in ID 'addToDoTextInput' into parameter
    //which adds whatever in textbox into [todos]
		todoList.addToDos(addTodoTextInput.value);


    //sets textbox to blank after item is added
		addTodoTextInput.value = '';

    //runs view.display
    view.displayToDos();
	},

  //when onclick: changes current item in [todos] with new item
	changeToDos: function(position) {

    var newValue = document.getElementById('textbox'+position)

		todoList.changeToDos(position, newValue.value);

    //runs view.display
    view.displayToDos();
	},

  //onlick: delete item
	deleteToDos: function(position) {
		todoList.deleteToDos(position);
    view.displayToDos();
	},

  //onclick: toggles item's completed status
	toggleCompleted: function(position) {

    //passes toggleTextBox.valueAsNumber as position of item to toggle
		todoList.toggleCompleted(position);

    //run view.display
    view.displayToDos();
	},

	toggleAll: function() {
    //runs toggleAll
		todoList.toggleAll();

    //runs view.display
    view.displayToDos();
	}


};


//Object created to handle display portion which runs after each onlick in handler{}
var view = {

  //displays every object in [todos]
  displayToDos: function() {

    //store <ul> in var
    var todosUL = document.querySelector("ul");

    //clear whatever is in <ul> 
    //(necessary if .displayToDo is ran again; otherwise it'll just keep adding on to what's already there)
    todosUL.innerHTML = ''
  
    //for each item, display as with completion and textName as a <li>, append with deleteButton, then append to <ul> 
    todoList.todos.forEach(function(todo,position) {

      //store <li> creation to var
      var todoLI = document.createElement('li');

      // set ID of <li> to i
      todoLI.id = position;

      todoLI.appendChild(this.createCheckBox(todo));
      todoLI.appendChild(this.createTextbox(todo, position));
      todoLI.appendChild(this.createChangeButton());
      todoLI.appendChild(this.createDeleteButton());
      todosUL.appendChild(todoLI)


      //append <li> to <ul>
      ;

    }, this); //forEach(callbackFunction(), thisArg) allows to pass through 'this'



    // for (var i = 0; i < todoList.todos.length; i++) {

    //   //store <li> creation to var
    //   var todoLI = document.createElement('li');

    //   //store [todo] element to var for naming convenience
    //   var todo = todoList.todos[i];

    //   //create var to store completion status + itemName
    //   var todoTextWithCompletion;

    //   // check if todo[i] is completed. then stores result of condition to var
    //   if (todo.completed) {
    //     todoTextWithCompletion = "(x) " + todo.todoText
    //   }else {
    //     todoTextWithCompletion = "( ) " + todo.todoText
    //   };


    //   // set ID of <li> to i
    //   todoLI.id = i;

    //   // set <li> textContent to competion status + itemName
    //   todoLI.textContent = todoTextWithCompletion;

    //   //append deletebutton to <li>
    //   todoLI.appendChild(this.createDeleteButton())

    //   //append <li> to <ul>
    //   todosUL.appendChild(todoLI);
    // }
  },

  createCheckBox: function(todo) {
    var todoCheckbox = document.createElement('input');
    
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = todo.completed;
    todoCheckbox.className = 'completedCheckbox';

    return todoCheckbox;
  },

  createTextbox: function(todo, position){
    var textBox = document.createElement('input');

    textBox.type = 'text'
    textBox.value = todo.todoText;
    textBox.id = 'textbox' + position;

    return textBox;
  },

  createChangeButton: function(){
    var changeButton = document.createElement('button');

    changeButton.textContent = 'Change';
    changeButton.className = 'changeButton';

    return changeButton;
  },

  //creates delete button for item
  createDeleteButton: function() {

    //create button element to var
    var deleteButton = document.createElement('button');

    //naming button
    deleteButton.textContent = 'Delete';

    //tag className to button. Using class so we can determine whether a button was clicked or not
    deleteButton.className = 'deleteButton';

    //returns button creation to view.displayToDos when item is created
    return deleteButton;
  },

  

  //sets up Event listener for buttons
  setUpEventListener: function() {

    //stores <ul> to todosUL
    var todosUl = document.querySelector('ul');

    //adds Event listerer to all of <ul> because we can determine which <li> button was clicked instead of creating listener to each <li>/button
    //using event as a parameter is called DOM event delegation
    todosUl.addEventListener('click', function(event) {
      
      //Stores event.target in var; button.deleteButton (buttonElement.className) if clicked on button
      var elementClicked = event.target;

      //check if elementClicked's class is .deleteButton
      if (elementClicked.className === 'deleteButton') {

        //takes the ID of the Parent of the buttonClicked (ex:li#0) and converts it to Int, then passes to handler.deleteToDos()
        handler.deleteToDos(parseInt(elementClicked.parentNode.id));
      } else if(elementClicked.className === 'completedCheckbox') {
        //takes ID of elementclicked's parentNode and passes it through toggleCompleted handler
        handler.toggleCompleted(parseInt(elementClicked.parentNode.id));
      } else if(elementClicked.className === 'changeButton') {
        //passes ParentNode ID to changeButton handler
        handler.changeToDos(parseInt(elementClicked.parentNode.id));
      }


    });
  }
}

view.setUpEventListener()
