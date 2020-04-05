const myForm = document.getElementById('myform');

// listen for submit
myForm.addEventListener('submit', saveBookmarker);

// save bookmarker
function saveBookmarker(e) {

    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

   if(!validateForm(siteName, siteUrl)) {
       return false;
   }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // // local storage test
    // localStorage.setItem('test', 'hello world')
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test')
    // console.log(localStorage.getItem('test'));

    //check if local strorage is null
    if(localStorage.getItem('bookmarks') === null) {
        // initialize array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get Bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Reset back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('myForm').reset;
    
    // Re-fetch bookmarks
    fetchBookmarks();

    // prevent default
    e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
    // get Bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url += url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
    // get Bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
// Get output id
var bookmarksResult = document.getElementById('bookmarksResult');

// Build output
bookmarksResult.innerHTML = '';
for(var i =0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResult.innerHTML += '<div class="well">' +
        '<h3>' + name +
        ' <a class="btn btn-default" target="_blank" href="' +url+ '">Visit</a> ' +
        ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
        '</h3>' +
        '</div>';
}
}


// Validate form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid url');
        return false;
    }

    return true;
}