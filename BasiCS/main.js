// Contains all javascript logic for the BasiCS SPA

// "Constants" for options
var LINKEDLIST_OPTION = "linkedlist-option";
var ARRAY_OPTION = "array-option";
var STACK_OPTION = "stack-option";
var QUEUE_OPTION = "queue-option";
var BINARY_TREE_OPTION = "binary-tree-option";
var BUBBLESORT_OPTION = "bubblesort-option";
var QUICKSORT_OPTION = "quicksort-option";
var SELECTION_SORT_OPTION = "selection-sort-option";
var MERGESORT_OPTION = "mergesort-option";
var ABOUT_OPTION = "about-option";

// Creds to http://www.ckode.dk/programming/avoiding-caching-with-jquery-load/
// Load a resource but noncached for change of content
function nonCachedResource(resPath) {
	return resPath + '?f' + (Math.random()*1000000);
}

$(document).ready(function(){

	var maincontent = $('#main-content-container');

	// =======================================
    // Load Content X functions for each topic
    // =======================================

	function loadLinkedListContent() {
		maincontent.load(nonCachedResource("linkedlist.html"))
	};

	function loadArrayContent() {
		maincontent.html("Array Content here");
	};

	function loadStackContent() {
		maincontent.html("Stack Content here");
	};

	function loadQueueContent() {
		maincontent.html("Queue Content here");
	};

	function loadBinaryTreeContent() {
		maincontent.html("Array Content here");
	};
	
	function loadBubbleSortContent() {
		maincontent.html("Bubblesort Content here");
	};

	function loadSelectionSortContent() {
		maincontent.html("Selection sort content here");
	};

	function loadQuickSortContent() {
		maincontent.html("QuickSort Content here");
	};

	function loadMergeSortContent() {
		maincontent.html("Mergesort content here");
	};

	function loadAboutContent () {
		maincontent.load(nonCachedResource("about.html"));
	};

	// =======================================

	function loadContent(option) {

		if (option == LINKEDLIST_OPTION) {
			loadLinkedListContent();
		} else if (option == ARRAY_OPTION) {
			loadArrayContent();
		} else if (option == STACK_OPTION) {
			loadStackContent();
		} else if (option == QUEUE_OPTION) {
			loadQueueContent();
		} else if (option == BINARY_TREE_OPTION) {
			loadBinaryTreeContent();
		} else if (option == BUBBLESORT_OPTION) {
			loadBubbleSortContent();
		} else if (option == SELECTION_SORT_OPTION) {
			loadSelectionSortContent();
		} else if (option == QUICKSORT_OPTION) {
			loadQuickSortContent();
		} else if (option == MERGESORT_OPTION) {
			loadMergeSortContent();
		} else if (option == ABOUT_OPTION) {
			loadAboutContent();
		} else {
			window.alert("Failed to load");
		}
	};

	$('#data-structures').click(function() {
		$('#data-structures-list').toggle();
	});

	$('#algorithms').click(function() {
		$('#algorithms-list').toggle();
	});

	$('.menu-option').click(function() {
		var topic = this.id;

		loadContent(this.id);
	});

});
