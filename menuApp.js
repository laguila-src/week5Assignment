// Menu App - Create Booklists. Add books by title.

class Book {
    constructor(titleValue){
        this.title = titleValue;
    }

    // Methods
    describe(){
        return `"${this.title}"\n`
    }
}


class BookList {
    constructor(nameValue){
        this.name = nameValue;
        this.books = [];
    }

    // Methods
    describe(){
        return `
        Booklist Name: ${this.name}

        Number of books in this booklist: ${this.books.length}\n`;
    }
}

class Menu {  // What drives this application and our choices
    constructor(){
        this.booklists = [];
        this.selectedBooklist = null; // Manage one booklist at a time
    }

    start(){  // Entry point to application

        let selection = this.showMainMenuOptions();

        while (selection != 0){
            switch (selection){
                case '1': 
                    this.createBooklist();
                    break;
                case '2': 
                    this.viewBooklist();
                    break;
                case '3':
                    this.deleteBooklist();
                    break;
                case '4':
                    this.displayBooklist();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions(){
        // Ask user what they want to do
        return (prompt(`
        BOOKLIST MENU APP

        Enter a # option: 
        1) CREATE  2) VIEW  3) DELETE  4) DISPLAY  0) EXIT`));   
    }

    showBookMenuOptions(bookInfo){
        // Ask user what they want to do
        return prompt(`
        0) BACK  1) ADD BOOK  2) REMOVE BOOK
        -----------------------------------------------
        ${bookInfo}
       `);
    }

    // Start a booklist. Get booklist name from user.
    createBooklist(){
        let name = prompt('Enter a name for this booklist:');
        this.booklists.push(new BookList(name));
        // console.log('Booklist method',  this.booklists[0].describe());
    }

    deleteBooklist(){
        let index = prompt('Enter the index of the booklist that you wish to delete: ');
        if (index > -1 && index < this.booklists.length) {
        this.booklists.splice(index,1); // splice removes 1 element at index
        } 
    }

    viewBooklist(){
        // Once we have an index, we'll be able to find the booklist
        let index = prompt('Enter index of booklist you wish to view:');

        // Always validate user input
        if (index > -1 && index < this.booklists.length){

            this.selectedBooklist = this.booklists[index]; // set selectedBooklist to booklist selected by user

            // Now we can go ahead and build a description using booklist method
            let description = `     
            ${this.selectedBooklist.describe()}`;

            // Now we want to add a description of all the books in this booklist
            for (let i = 0; i < this.selectedBooklist.books.length; i++){ // each booklist has a books array
                description += '        ' + i +') ' + '"'+this.selectedBooklist.books[i].title+'"' + '\n';
            }

            let selection = this.showBookMenuOptions(description);
            switch (selection){
                case '1':
                    this.addBook();
                    break;
                case '2':
                    this.removeBook();
                    break;
            }
        }
    }

    displayBooklist(){
        let booklistString = '';

        for (let i=0; i< this.booklists.length; i++){
            booklistString  += '\n' + i + ') ' + this.booklists[i].name ;
        }
        // console.log(booklistString);
        alert(`BOOKLISTS
        ${booklistString}
        `);
    }

    addBook(){
        let title = prompt("Enter title of book you wish to add to this list:");
        this.selectedBooklist.books.push(new Book(title));
    }
    
    removeBook() {
        let index = prompt("Enter index of the book you wish to remove from this list:");
        // Validate index
        if (index > -1 && index < this.selectedBooklist.books.length){
            this.selectedBooklist.books.splice(index,1); // splice removes 1 book at index
        }
    }
}

const booklistMenu = new Menu();
booklistMenu.start();